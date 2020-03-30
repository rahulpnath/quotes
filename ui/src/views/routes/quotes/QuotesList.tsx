import React from 'react';
import { PageLayout } from 'views/components/application/PageLayout';

export const QuotesList: React.FC = () => {
  return (
    <PageLayout title="All Quotes" parent="none">
      <p>A list of quotes.</p>
    </PageLayout>
  );
};
