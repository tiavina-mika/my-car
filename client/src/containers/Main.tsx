import { useState, useEffect, ReactNode } from 'react';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

import { closeMessage } from '../actions/app';
import BrowserPageDetails from '../components/BrowserPageDetails';
import Menu from '../components/Menu';
import SnackbarContentWrapper from '../components/SnackbarContentWrapper';
import {
	getLoading,
	getMessage, getMessageVariant, getTitle,
} from '../reducers/app';
import { projectNameUpper } from '../utils/constants';

export const drawerWidthOpen: number = 240;
export const drawerWidthClosed: number = 70;

const useStyles = makeStyles((theme: Theme) => ({
	main: {
		composes: 'flexColumn',
	},
	children: {
		composes: 'flexCenter flex1',
		padding: 12,
	},
	backdrop: {
		zIndex: theme.zIndex.drawer * 10,
		color: '#fff',
	},
	menuButton: {
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
	content: {
		composes: 'flexRow center flexCenter flex1 stretchSelf',
		backgroundColor: theme.palette.secondary.main,
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
}));

/* eslint-disable react/jsx-closing-tag-location */
type Props = { children: ReactNode };
const Main = ({ children }: Props) => {
	// state
	const [backdropOpened, setBackdropOpened] = useState<boolean>(false);

	// styles
	const classes = useStyles();

	// dispatch
	const dispatch = useDispatch();

	// -------- Dispatch the current user when entering the dashboard ----------- //
	// useIsAuth();
	// selectors
	const title = useSelector(getTitle);
	const message = useSelector(getMessage);
	const variant = useSelector(getMessageVariant);
	const loading = useSelector(getLoading);
	// const user = useSelector(getCurrentUser);

	// -------------------------------------//
	// ------------ backdrop ---------------//
	// -------------------------------------//
	
	const _handleCloseBackdrop = () => {
		setBackdropOpened(false);
	};

	useEffect(() => {
		setTimeout(() => {
			setBackdropOpened(loading);
		}, 200);

		return () => {
			setBackdropOpened(false);
		};
	}, [loading]);

	return (
		<>
			{/* browser page detail */}
			<BrowserPageDetails title={title || projectNameUpper} />

			<main className={classes.main}>
				<Menu />

				{/* ------------ Main Content ------------ */}
				<div className={classes.content}>
					{ children }
				</div>
			</main>

			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				open={message != null}
				autoHideDuration={4000}
				onClose={() => dispatch(closeMessage())}
			>
				<SnackbarContentWrapper
					variant={variant}
					message={message || ''}
				/>
			</Snackbar>

			<Backdrop
				className={classes.backdrop}
				open={backdropOpened}
				onClick={_handleCloseBackdrop}
			>
				<CircularProgress color='inherit' />
			</Backdrop>
		</>
	);
};

export default Main;