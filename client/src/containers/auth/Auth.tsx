import { ReactNode, useEffect, useMemo } from 'react';

import { Box, FormHelperText, Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import { goToHome } from '../../actions/app';
import { retrieveUserFromLocalStorage } from '../../actions/auth';
import BrowserPageDetails from '../../components/BrowserPageDetails';
import Link from '../../components/Link';
import { useIsActualPage } from '../../hooks/useIsActualPage';
import { getError } from '../../reducers/app';
import { LOGIN_PATHNAME, SIGNUP_PATHNAME } from '../../utils/constants';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
		backgroundColor: theme.palette.secondary.main,
		height: '100vh'
  },
	card: {
		minWidth: 300,
		maxWidth: '35vw',
		boxShadow: '0 0 15px 0 rgba(6,48,62,0.05)',
		borderRadius: 8,
		padding: `${theme.spacing(3)}px ${theme.spacing(9)}px`,
	},
	button: {
		width: '100%',
	},
	secondaryButton: {
		marginTop: theme.spacing(1),
	},
	actions: {
		composes: 'flexRow',
	},
}));

interface AuthPage { 
	browserTitle: string;
	pageTitle: string;
	form: ReactNode;
	labelLink: string;
	link: string;
};

const Auth = () => {
  const classes = useStyles();

	// dispatch
	const dispatch = useDispatch();

	const location = useLocation();

	// check the route (url) path if it contain login
	const isLoginPage = useIsActualPage(LOGIN_PATHNAME);

	const error = useSelector(getError);

	// if the user is logged in, redirect to the home page
	useEffect(() => {
		const user = retrieveUserFromLocalStorage();
		if (!user) return;
		dispatch(goToHome());
	}, [dispatch])


	// it may be login or signup page
	const auth: AuthPage = useMemo(() => {
		
		const signupTitle: string = 'Créer un compte';
		let browserTitle: string = signupTitle;
		let pageTitle: string = signupTitle;
		let link: string = LOGIN_PATHNAME;
		let labelLink: string = 'Déjà un compte ?';
		let form: ReactNode = <SignupForm />;

		if (isLoginPage) {
			browserTitle = 'Se connecter';
			pageTitle = 'Connexion';
			link = SIGNUP_PATHNAME;
			labelLink = 'Pas encore de compte ?';
			form = <LoginForm />;
		}

		return {
			browserTitle,
			pageTitle,
			form,
			link,
			labelLink,
		}
	}, [location, isLoginPage])

  return (
		<>
			{/* ---------- the browser title ---------- */}
			<BrowserPageDetails title={auth.browserTitle} />
			
			{/* ---------- card form container ---------- */}
			<Box display="flex" justifyContent="center" alignItems="center" className={classes.root}>
				<Card className={classes.card}>
						<CardContent>
							<Box display="flex" justifyContent="center">
								<Typography gutterBottom variant="h5" component="h2">
									{auth.pageTitle}
								</Typography>							
							</Box>
							{/* ----- Form ---- */}
							<Box>
								{error && (
									<FormHelperText error>
										{ error }
									</FormHelperText>
								)} 
								{auth.form}
							</Box>

							{/* ----- Link ----- */}
							<Box mt={5}>
								<Link
									label={auth.labelLink}
									href={auth.link}
								/>
							</Box>
						</CardContent>
				</Card>
			</Box>
		</>
  );
};

export default Auth;
