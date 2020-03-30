import React from 'react';
import styles from './LoadingPane.module.scss';
import { CircularProgress } from '@material-ui/core';

interface ILoadingPaneProps {
  isLoading: boolean;
}

export const LoadingPane: React.FC<ILoadingPaneProps> = function({ isLoading, children }) {
  return isLoading ? (
    <div className={styles.root}>
      <CircularProgress size={48} thickness={4} color="primary" />
    </div>
  ) : (
    <>{children || null} </>
  );
};
