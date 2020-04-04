import { TextField } from '@material-ui/core';
import { CustomerDto } from 'api/api-models';
import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './CustomerSection.module.scss';
import { QuoteSection } from './QuoteSection';

export const CustomerSection: React.FC = () => {
  const readOnly = false;

  // TODO
  const sectionTitle = 'Customer';
  const sectionSummary = null;

  const formMethods = useForm<CustomerDto>();
  const { register, handleSubmit, reset, errors } = formMethods;
  const onSubmit = (data: CustomerDto) => {
    console.log({ data });
  };

  return (
    <QuoteSection<CustomerDto>
      sectionTitle="Customer"
      sectionSummary="cutomer summary"
      formMethods={formMethods}
      onSubmit={onSubmit}>
      <div className={styles.fields}>
        <TextField
          className={styles.name}
          name="name"
          label="Full Name"
          inputRef={register({ required: { value: true, message: 'Name is required' } })}
          inputProps={{ readOnly }}
          error={!!errors.name}
          helperText={errors?.name?.message}
        />
        <TextField
          className={styles.phone}
          name="phone"
          label="Phone"
          inputRef={register}
          inputProps={{ readOnly }}
        />
        <TextField
          className={styles.address}
          name="address"
          label="Home Address"
          inputRef={register}
          inputProps={{ readOnly }}
        />
        <TextField
          className={styles.email}
          name="email"
          label="Email"
          inputRef={register}
          inputProps={{ readOnly }}
        />
      </div>
    </QuoteSection>
  );
};
