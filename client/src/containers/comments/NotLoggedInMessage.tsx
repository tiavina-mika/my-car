import { SyntheticEvent } from 'react';

import { Box, Link, Typography } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
    },
  }),
);


const NotConnectedMessage = () => {
  const classes = useStyles();

  const preventDefault = (event: SyntheticEvent) => event.preventDefault();

  return (
    <Box pl={1}>
      <Typography >
        <Link href="/" onClick={preventDefault} className={classes.link}>
          Connectez-vous
        </Link>
        pour pouvoir commenter cet article
      </Typography>
    </Box>
  );
}

export default NotConnectedMessage;