import React from 'react';

export const AppLoadFailed: React.FC = function() {
  return (
    <div style={{ margin: '5em' }}>
      <h1>:(</h1>
      <p>
        Unfortunately something went wrong. Please refresh the browser to try again or contact your
        system administrator.
      </p>
    </div>
  );
};
