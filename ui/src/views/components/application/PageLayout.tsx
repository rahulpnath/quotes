import { Breadcrumbs, Container, Link, Typography } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styles from './PageLayout.module.scss';

interface IPageLayoutProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  audit?: React.ReactNode;
  parent: [string, string] | 'none';
}

export const PageLayout: React.FC<IPageLayoutProps> = function({
  title,
  subtitle,
  audit,
  parent,
  children,
}) {
  return (
    <div className={styles.root}>
      <Typography variant="h1" className={styles.title}>
        {title}
      </Typography>
      <Typography variant="h2" className={styles.subtitle}>
        {subtitle}
      </Typography>
      <Typography className={styles.audit}>{audit}</Typography>
      <Container component="section" className={styles.content} maxWidth="lg">
        {children}
      </Container>
      {parent !== 'none' && (
        <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumb}>
          <Link color="inherit" component={RouterLink} to="/">
            <ChevronLeftIcon /> {parent[0]}
          </Link>
          <Typography color="textPrimary">{title}</Typography>
        </Breadcrumbs>
      )}
    </div>
  );
};
