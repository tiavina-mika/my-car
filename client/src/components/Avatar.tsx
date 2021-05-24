import { ReactNode } from 'react';

import { Box } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

type Props = { 
  content: string | ReactNode; 
  className?: string; 
  size?: number;
  fontSize?: number; 
};

type StyleProps = Pick<Props, 'size' | 'fontSize'>;

const useStyles = makeStyles(
  createStyles({
    root: {
      backgroundColor: '#BDBDBD',
      borderRadius: '50%',
      color: '#fff',
      width: ({ size }: StyleProps) => size,
      height: ({ size }: StyleProps) => size,
      textTransform: 'uppercase',
      fontFamily: 'sans-serif',
      fontSize: ({ fontSize }: StyleProps) => fontSize,
    },
  }),
);

const Avatar = ({ content, className, size = 40, fontSize= 18 }: Props) => {
  const classes = useStyles({ size, fontSize });

  return (
     <Box 
      className={clsx(classes.root, className)} 
      display="flex" 
      justifyContent="center" 
      alignItems="center"
    >
       {content}
     </Box>
  );
}

export default Avatar;