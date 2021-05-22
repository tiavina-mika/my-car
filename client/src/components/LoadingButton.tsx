import React, { ReactNode } from 'react';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    marginLeft: 5,
  },
  spinner: {
    marginLeft: 10,
    color: 'white',
  },
});

type Props = {
  children: ReactNode;
  loading: boolean;
  [x: string]: any | null;
};

const LoadingButton = ({
  children,
  loading,
  ...rest
}: Props) => {

  const classes = useStyles();
  return (
    <Button {...rest}>
      {children}
      {loading && (
        <CircularProgress
          className={classes.spinner}
          size={25}
        />
      )}
    </Button>
  );
};

export default LoadingButton;