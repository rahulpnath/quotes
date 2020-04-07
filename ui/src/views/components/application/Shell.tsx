import { AppBar, Container, IconButton, Toolbar } from '@material-ui/core';
import { UserProfileDto } from 'api/api-models';
import * as UserApi from 'api/user.api';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Shell.module.scss';

export const Shell: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserProfileDto | undefined>(undefined);

  const loadUser = async () => {
    setUser(await UserApi.getUser());
  };
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <div className={styles.shell}>
      <AppBar position="static" color="secondary" role="banner">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Link to="/" className={styles.logo}></Link>
            <span className={styles.title}>Quotes</span>
            <IconButton>
              {user && (
                <img src={user.userPictureUrl} alt={user.name} className={styles['menu-img']} />
              )}
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <main data-testid="shell-main" className={styles.main}>
        <Container maxWidth="lg">{children}</Container>
      </main>
    </div>
  );
};
