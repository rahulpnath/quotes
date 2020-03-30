import { Chip } from '@material-ui/core';
import { QuoteStatusCode } from 'api/api-models';
import React from 'react';

export interface IQuoteStatusProps {
  statusCode: QuoteStatusCode;
  className?: string;
}

const getStatusColor = (statusCode: QuoteStatusCode) => {
  switch (statusCode) {
    case QuoteStatusCode.Open:
      return 'orange';
    case QuoteStatusCode.Accepted:
      return 'seagreen';
    case QuoteStatusCode.Expired:
      return 'red';
    case QuoteStatusCode.Draft:
      return 'grey';
    default:
      return 'grey';
  }
};

export const QuoteStatus: React.FC<IQuoteStatusProps> = ({ statusCode, className }) => {
  const statusColor = getStatusColor(statusCode);
  return (
    <Chip
      className={className}
      label={statusCode}
      component="span"
      color="primary"
      style={{ backgroundColor: statusColor, width: '6rem' }}
      variant="default"
    />
  );
};
