import { TextField } from '@material-ui/core';
import { CustomerDto } from 'api/api-models';
import * as QuotesApi from 'api/quotes.api';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styles from './CustomerSection.module.scss';
import { QuoteContext } from './Quote';
import { QuoteSection } from './QuoteSection';

export const CustomerSection: React.FC = () => {
  const history = useHistory();
  const { quote } = useContext(QuoteContext);
  const formMethods = useForm<CustomerDto>();
  const { register, errors } = formMethods;

  const onSubmit = async (data: CustomerDto) => {
    if (quote) {
      await QuotesApi.updateQuoteCustomer({
        quoteId: quote.id,
        customerName: data.name,
        customerAddress: data.address,
        customerEmail: data.email,
        customerPhone: data.phone,
      });
    } else {
      const newQuoteId = await QuotesApi.createQuote({
        customerName: data.name,
        customerAddress: data.address,
        customerEmail: data.email,
        customerPhone: data.phone,
      });
      if (newQuoteId) {
        history.replace(`/quotes/${newQuoteId}`);
      }
    }
  };

  /*
    Caveat: https://github.com/mui-org/material-ui/issues/11150
    defaultValue in TextField won't update when the component reloads
    use a LoadingPane to prevent the component from rendering until the data is fetched
 */
  return (
    <QuoteSection<CustomerDto>
      sectionTitle={quote ? quote.customer.name : ''}
      sectionSummary=""
      expandedDefault={!quote}
      editableDefault={!quote}
      formMethods={formMethods}
      onSubmit={onSubmit}>
      {(editable) => (
        <div className={styles.fields}>
          <TextField
            className={styles.name}
            name="name"
            label="Full Name"
            defaultValue={quote?.customer.name}
            inputRef={register({ required: { value: true, message: 'Name is required' } })}
            inputProps={{ readOnly: !editable }}
            error={!!errors.name}
            helperText={errors?.name?.message}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            className={styles.phone}
            name="phone"
            label="Phone"
            defaultValue={quote?.customer.phone}
            inputRef={register}
            inputProps={{ readOnly: !editable }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            className={styles.address}
            name="address"
            label="Home Address"
            defaultValue={quote?.customer.address}
            inputRef={register({ required: { value: true, message: 'Address is required' } })}
            inputProps={{ readOnly: !editable }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            className={styles.email}
            name="email"
            label="Email"
            defaultValue={quote?.customer.email}
            inputRef={register({
              pattern: {
                value: /^(([^<>()[]\\.,;:\s@"]+(\.[^<>()[]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please provide a valid email address',
              },
              required: { value: true, message: 'Email is required' },
            })}
            inputProps={{ readOnly: !editable }}
            error={!!errors.email}
            helperText={errors?.email?.message}
            InputLabelProps={{ shrink: true }}
          />
        </div>
      )}
    </QuoteSection>
  );
};
