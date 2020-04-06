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
  isEmpty: boolean;
  expandedDefault: boolean;
  editableDefault: boolean;
  onSubmit: (data: T) => void | Promise<void>;
  formMethods: FormContextValues<T>;
  children: (editable: boolean) => React.ReactNode;
}

export function QuoteSection<T>({
  sectionTitle,
  sectionSummary,
  isEmpty,
  expandedDefault,
  editableDefault,
  onSubmit,
  formMethods,
  children,
}: IQuoteSectionProps<T>) {
  const { handleSubmit, reset } = formMethods;
  const formSubmit = async (data: T) => {
    await onSubmit(data);
    setEditable(false);
  };

  const [expanded, setExpanded] = React.useState<boolean>(expandedDefault);
  const [editable, setEditable] = React.useState<boolean>(editableDefault);

  const IconComponent = !isEmpty ? ExpandMoreIcon : expanded ? CloseIcon : AddIcon;
  const icon = <IconComponent className={styles.expand} />;

  return (
    <form onSubmit={handleSubmit(formSubmit)} noValidate autoComplete="off">
      <ExpansionPanel
        expanded={expanded}
        onChange={(_, e) => {
          setExpanded(e);
          if (editable) {
            reset();
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
        <ExpansionPanelActions className={styles.actions} {...{ disableSpacing: true }}>
          {editable ? (
            <>
              <Button type="submit" color="primary" variant="contained">
                Save
              </Button>
              <div className={styles.spacer} aria-hidden="true" />
              <Button
                variant="contained"
                color="secondary"
                type="button"
                onClick={(e) => {
                  reset();
                  setEditable(false);
                  e.preventDefault();
                }}>
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={(e) => {
                setEditable(true);
                e.preventDefault();
              }}>
              Edit
            </Button>
          )}
        </ExpansionPanelActions>
      </ExpansionPanel>
    </form>
  );
}
