import { Box } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(
  createStyles({
    root: {
      backgroundColor: '#BDBDBD',
      borderRadius: '50%',
      color: '#fff',
      width: 40,
      height: 40,
      textTransform: 'uppercase',
      fontFamily: 'sans-serif',
      fontSize: 18,
    },
  }),
);

type Props = { text: string; className?: string };
const Avatar = ({ text, className }: Props) => {
  const classes = useStyles();

  return (
     <Box 
      className={clsx(classes.root, className)} 
      display="flex" 
      justifyContent="center" 
      alignItems="center"
    >
       {text}
     </Box>
  );
}

export default Avatar;