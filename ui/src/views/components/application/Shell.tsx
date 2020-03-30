import { AppBar, Container, Toolbar } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Shell.module.scss';

export const Shell: React.FC = ({ children }) => {
  return (
    <div className={styles.shell}>
      <AppBar position="static" color="secondary" role="banner">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Link to="/" className={styles.logo}></Link>
            <span className={styles.title}>Quotes</span>
          </Toolbar>
        </Container>
      </AppBar>
      <main data-testid="shell-main" className={styles.main}>
        <Container maxWidth="lg">{children}</Container>
      </main>
    </div>
  );
};
