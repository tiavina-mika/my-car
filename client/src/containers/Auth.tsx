// import { ReactNode } from 'react';

// import { makeStyles } from '@material-ui/core/styles';

// import { Box, Button, Theme } from '@material-ui/core';
// import CustomCard from '../components/CustomCard';

// const useStyles = makeStyles((theme: Theme) => ({
// 	root: {
// 		backgroundColor: theme.palette.primary.main,
// 		height: '100vh',
// 	},
// 	card: {
// 		minWidth: 300,
// 		maxWidth: '40vw',
// 	},
// 	content: {
// 		composes: 'flexColumn center',
// 		padding: 30,
// 	},
// 	action: {
// 		backgroundColor: 'transparent',
// 	},
// 	okBtn: {
// 		width: '100%',
// 		marginLeft: 0,
// 	},
// 	otherActionsuButton: {
// 		width: '100%',
// 		marginTop: 10,
// 	},
// }));




import { ReactNode } from 'react';

import { Box, FormHelperText, Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
		backgroundColor: theme.palette.primary.main,
		height: '100vh',
  },
	card: {
		minWidth: 300,
		maxWidth: '30vw',
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
				<CardActionArea>
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
				</CardActionArea>
			</Card>
		</Box>
  );
};

export default Auth;
