import { ReactNode } from 'react';

import { Box, FormHelperText, Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
		backgroundColor: theme.palette.primary.main,
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

type Props = { 
	children: ReactNode;
	title?: string;
	error?: string;
};
const Auth = ({ 
	children,
	title,
	error,
}: Props) => {
  const classes = useStyles();

  return (
		<Box display="flex" justifyContent="center" alignItems="center" className={classes.root}>
			<Card className={classes.card}>
					<CardContent>
						<Box display="flex" justifyContent="center">
							<Typography gutterBottom variant="h5" component="h2">
								{title}
							</Typography>							
						</Box>
							<Box>
								{error && (
									<FormHelperText error>
										{ error }
									</FormHelperText>
								)} 
								{children}
							</Box>
					</CardContent>
			</Card>
		</Box>
  );
};

export default Auth;
