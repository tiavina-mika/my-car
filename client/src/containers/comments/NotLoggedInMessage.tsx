import { Box, Button, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      paddingBottom: 0,
      paddingTop: theme.spacing(1),
      borderTop: '1px solid ' + grey[300],
    },
    button: {
      textTransform: 'initial',
      fontWeight: 400,
      color: theme.palette.primary.main,
      padding: 0,
      '&:hover': {
        backgroundColor: 'transparent',
        opacity: 0.9,
      },
    },
    firstButton: {
      marginRight: theme.spacing(1),
    }
  }),
);


const NotConnectedMessage = () => {
  const classes = useStyles();


  return (
    <Box>
      <Typography>
        
      </Typography>
      <Button>
        Veuillez-vous connecter pour pouvoir connecter
      </Button>
    </Box>
  );
}

export default NotConnectedMessage;