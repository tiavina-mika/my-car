import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

import Button from '../Button';

const useStyles = makeStyles((theme: Theme) =>({
  submitButton: {
    marginTop: theme.spacing(2),
    fontSize: 18,
  },
}));

type Props = { 
  text: string; 
  color?: 'default' | 'primary'| 'secondary'; 
  variant?: 'contained' | 'outlined' | 'text';
  fullWidth?: boolean;
  className?: string;
};

const SubmitButton = ({ 
  text, 
  color = 'primary', 
  className, 
  variant = 'contained',
  fullWidth = true 
}: Props) => {
  const classes = useStyles();

  return (
    <Button
      type="submit"
      className={clsx(className, classes.submitButton)}
      color={color}
      text={text}
      variant={variant}
      fullWidth={fullWidth}
    />
  );
};

export default SubmitButton;