import { Slide, useScrollTrigger } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch, useSelector } from 'react-redux';

import { goToLogin } from '../actions/auth';
import { getCurrentUser } from '../reducers/app';
import Button from './Button';
import Link from './Link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      composes: 'stretchSelf',
    },
    appBar: {
      backgroundColor: '#fff',
      color: '#000',
      paddingTop: theme.spacing(0.8),
      paddingBottom: theme.spacing(0.8),
      boxShadow: '0 12px 24px 0 rgb(0 0 0 / 8%)',
    },
    logoContainer: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    logo: {
      textDecoration: 'none',
    },
    search: {
      position: 'relative',
      padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.secondary.main, 1),
      '&:hover': {
        backgroundColor: fade(theme.palette.secondary.main, 0.75),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      top: -1.6,
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '18ch',
        '&:focus': {
          width: '24ch',
        },
      },
    },
    loginButton: {
      color: '#fff',
      textDecoration: 'none',
      backgroundColor: theme.palette.primary.main,
      fontSize: 16,
      padding: `${theme.spacing(1.2)}px ${theme.spacing(2.5)}px`,
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(2),
      borderRadius: 8,
      '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: '#fff'
      }
    },
  }),
);

const Menu = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const trigger = useScrollTrigger();
  const currentUser = useSelector(getCurrentUser);

  const _goToLogin = () => {
    dispatch(goToLogin());
  };

  return (
    <div className={classes.root}>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            
            {/* ----------- logo ----------- */}
            <Link 
              label="My Car" 
              href="/" 
              className={classes.logo} 
              rootClassName={classes.logoContainer}
            />

            {/* ----------- Search input ----------- */}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>

            {/* ----------- Auth buttons ----------- */}
            {!currentUser && (
              <Button
                onClick={_goToLogin}
                text="Connexion" 
                className={classes.loginButton}
                startIcon={<PersonIcon />}
              />
            )}
          </Toolbar>
        </AppBar>
      </Slide>  
    </div>
  );
}

export default Menu;