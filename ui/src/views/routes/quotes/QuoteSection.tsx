import {
  Button,
  ExpansionPanel,
  ExpansionPanelActions,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { FormContextValues } from 'react-hook-form';
import styles from './QuoteSection.module.scss';

export interface IQuoteSectionProps<T> {
  sectionTitle: string;
  sectionSummary?: string;
  onSubmit: (data: T) => void | Promise<void>;
  formMethods: FormContextValues<T>;
  children: (editable: boolean) => React.ReactNode;
}

export function QuoteSection<T>({
  sectionTitle,
  sectionSummary,
  onSubmit,
  formMethods,
  children,
}: IQuoteSectionProps<T>) {
  const { register, handleSubmit, reset, errors } = formMethods;
  const formSubmit = async (data: T) => {
    await onSubmit(data);
    // TODO: toggle button status
  };
  const sectionData = true;

  const [expanded, setExpanded] = React.useState<boolean>(true);
  const [editable, setEditable] = React.useState<boolean>(true);
  const IconComponent = sectionData ? ExpandMoreIcon : expanded ? CloseIcon : AddIcon;
  const icon = <IconComponent className={styles.expand} />;

  return (
    <form onSubmit={handleSubmit(formSubmit)} noValidate autoComplete="off">
      <ExpansionPanel
        expanded={expanded}
        onChange={(_, e) => {
          setExpanded(e);
          if (editable) {
            //resetForm();
            setEditable(false);
          }
        }}>
        <ExpansionPanelSummary expandIcon={icon}>
          <Typography>
            <span className={styles.title}>{sectionTitle}</span>
          </Typography>
          {sectionSummary && (
            <>
              <span className={styles.spacer} aria-hidden="true" />
              <Typography>
                <span className={styles.summary}>{sectionSummary}</span>
              </Typography>
            </>
          )}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>{children(editable)}</ExpansionPanelDetails>
        {editable && (
          <ExpansionPanelActions className={styles.actions} {...{ disableSpacing: true }}>
            {editable ? (
              <>
                <Button type="submit" color="primary" variant="contained">
                  Save
                </Button>
                <div className={styles.spacer} aria-hidden="true" />
                {!!sectionData && <Button variant="contained">Clear</Button>}
                <Button variant="contained">Cancel</Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  setEditable(true);
                }}>
                Edit
              </Button>
            )}
          </ExpansionPanelActions>
        )}
      </ExpansionPanel>
    </form>
  );
}
