import { ReactNode } from 'react';

import { makeStyles, Theme } from '@material-ui/core';
import MUIButton from '@material-ui/core/Button';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
    button: {
      textTransform: 'inherit',
      fontWeight: 'normal',
      borderRadius: 4,
    },
    outlined: {
      borderColor: '#e4e5e6',
    },
    outlinedError: {
      borderColor: theme.palette.error.main,
      color: theme.palette.error.main,
      opacity: 0.8,
      '&:hover': {
        opacity: 1,
      },
    },
  }));

type ButtonProps = {
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'default';
  disabled?: boolean;
  text?: string;
  className?: string;
  onClick?: () => void;
  error?: boolean;
  classes?: any;
  startIcon?: ReactNode;
  type?: any;
  fullWidth?: boolean;
};

const Button = ({
  variant,
  color,
  disabled,
  text,
  className,
  onClick,
  error,
  classes,
  startIcon,
  type,
  fullWidth,
}: ButtonProps) => {
  const muiClasses = useStyles();

  return (
    <MUIButton
      type={type}
      variant={variant}
      color={color}
      disabled={disabled}
      fullWidth={fullWidth}
      className={clsx(className, muiClasses.button)}
      classes={{
        ...classes, 
        outlined: clsx(muiClasses.outlined, error && muiClasses.outlinedError),
      }}
      onClick={onClick}
      startIcon={startIcon}
    >
       {text}
    </MUIButton>
  );
};

export default Button;