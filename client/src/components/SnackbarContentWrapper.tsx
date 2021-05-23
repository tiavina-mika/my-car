import { ElementType, ReactNode } from 'react';

import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import clsx from 'clsx';

const useStyles = makeStyles({
	success: {
		backgroundColor: '#1FA086',
	},
	error: {
		backgroundColor: '#fd6664',
	},
	info: {
		backgroundColor: '#00bcd4',
	},
	warning: {
		backgroundColor: '#d17d1d',
	},
	icon: {
		fontSize: 20,
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: 20,
	},
	message: {
		display: 'flex',
		alignItems: 'center',
	},
});

const variantIcon = {
	success: CheckCircleIcon,
	warning: WarningIcon,
	error: ErrorIcon,
	info: InfoIcon,
};

type Props = {
	className?: string;
	onClose?: () => void;
	variant?: any;
	message?: string | ReactNode;
	[x: string]: any;
};

const SnackbarContentWrapper = ({ 
	className, 
	onClose, 
	variant, 
	message, 
	...other 
}: Props) => {
	// styles
	const classes = useStyles();

	const Icon: ElementType = (variantIcon as any)[variant];

	return (
		<SnackbarContent
			className={clsx((classes as any)[variant], className)}
			aria-describedby='client-snackbar'
			message={(
				<span id='client-snackbar' className={classes.message}>
					<Icon className={clsx(classes.icon, classes.iconVariant)} />
					{message}
				</span>
			)}
			action={onClose ? 
				[
					<IconButton key='close' aria-label='Close' color='inherit' onClick={onClose}>
						<CloseIcon className={classes.icon} />
					</IconButton>,
				] : undefined}
			{...other}
		/>
	);
};

export default SnackbarContentWrapper;