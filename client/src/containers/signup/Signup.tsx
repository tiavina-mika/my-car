import { useDispatch, useSelector } from 'react-redux';

import { goToHome } from '../../actions/app';
import BrowserPageDetails from '../../components/BrowserPageDetails';
import { getCurrentUser, getError } from '../../reducers/app';
import Auth from '../Auth';
import SignupForm from './SignupForm';

const Signup = () => {
	// dispatch
	const dispatch = useDispatch();

	// selectors
	const user = useSelector(getCurrentUser);
	
	const error = useSelector(getError);

	// redirection
	if (user) {
		dispatch(goToHome());
		return null;
	}

	return (
		<>
			{/* browser page detail */}
			<BrowserPageDetails title="Authentification" />
			
			<Auth
				title='Création de compte'
				error={error}
			>
					<SignupForm />
			</Auth>
		</>
	);
};

export default Signup;
