import { push } from 'connected-react-router';

import { getCurrentUser } from '../reducers/app';
import { AppThunk, AppDispatch } from '../store';
import { EditProfileFormValues, LoginFormValues, SignupFormValues, UserResponse } from '../types/auth.d';
import { LOGIN_PATHNAME, SIGNUP_PATHNAME } from '../utils/constants';
import { getTokenName } from '../utils/utils';
import { AUTH_API } from './api';
import { goToHome, showMessage, showResponseError } from './app';
import { actionWithLoader } from './utils';


// --------------------------------------------------------//
// ---------------------- Routing -------------------------//
// --------------------------------------------------------//

export const goToLogin = () => push(LOGIN_PATHNAME);
export const goToSignup = () => push(SIGNUP_PATHNAME);


// --------------------------------------------------------//
// ----------------- Token / LocalStorag ----------------- //
// --------------------------------------------------------//

/**
 * get the token from LocalStorage
 * @returns {Object}
 */
 export const retrieveUserFromLocalStorage = (): UserResponse | null => {
   const storedUser: string | null = localStorage.getItem(getTokenName());

   if (!storedUser) return null;

  const user = JSON.parse(storedUser);
  
  return user;
}


/**
 * clear user into localStorage
 * @param {string} user 
 */
export const clearUserIntoLocalStorage = () => {
  localStorage.removeItem(getTokenName());
}


/**
 * update the token from localStorage
 * @param {UserResponse} user 
 * @returns 
 */
export const updateUserIntoLocalStorage = (user: UserResponse) => {
  localStorage.setItem(getTokenName(), JSON.stringify(user));
}


/**
 * remove the token from the object
 * @param {UserResponse} user 
 */
const deleteTokenFromUser = (user: UserResponse) => {
  delete user.token; 
}


// --------------------------------------------------------//
// ----------------------- Actions ----------------------- //
// --------------------------------------------------------//

/**
 * save the user to store
 * @param {UserResponse} user 
 * @returns 
 */
export const loginSuccess = (): any => actionWithLoader(async (dispatch: AppDispatch, getState: any) => {
  const currentUser = retrieveUserFromLocalStorage() || getCurrentUser(getState());

  // remove the token from store
  deleteTokenFromUser(currentUser);

  dispatch({
    type: 'LOGIN_SUCCESS',
    user: currentUser,
  });

});


/**
 * login the user after form validation
 * @param {LoginFormValues} values { email, password } 
 * @param {string} password 
 * @returns 
 */
export const login = (values: LoginFormValues): AppThunk => 
  actionWithLoader(async (dispatch: AppDispatch, getState: any): Promise<void> => {
    const result = await AUTH_API.login(values);

    // if there are errors
    showResponseError(result)(dispatch);

    updateUserIntoLocalStorage(result);

		await loginSuccess()(dispatch, getState());
    dispatch(goToHome());
	});


/**
 * signup after form validation
 * @param {SignupFormValues} values { email, password, confirmPassord } 
 * @returns 
 */
export const signup = (values: SignupFormValues): AppThunk => actionWithLoader(async (dispatch: AppDispatch) => {
  const result = await AUTH_API.signup(values);

  // if there are errors
  showResponseError(result)(dispatch);

  dispatch({
    type: 'LOGOUT_SUCCESS',
  });
  
  dispatch(goToHome());
  dispatch(showMessage('Votre compte a été enregisrté avec succès', 'success'));
});


/**
 * logout the current user
 * @returns 
 */
export const logout = () => actionWithLoader(async (dispatch: AppDispatch) => {

  const result = await AUTH_API.logout();

  // if there are errors
  showResponseError(result)(dispatch);

  // showLogin();
  dispatch({
    type: 'LOGOUT_SUCCESS',
  });

  clearUserIntoLocalStorage();
  dispatch(goToLogin());
});

/**
 * signup after form validation
 * @param {EditProfileFormValues} values { email, name } 
 * @returns 
 */
 export const editProfile = (values: EditProfileFormValues): AppThunk => actionWithLoader(async (dispatch: AppDispatch) => {
  const result = await AUTH_API.editProfile(values);

  // if there are errors
  showResponseError(result)(dispatch);

  dispatch({
    type: 'LOGIN_SUCCESS',
    user: result,
  });
  
  dispatch(goToHome());
  dispatch(showMessage('Votre profile a été mis à jour avec succès', 'success'));
});