import { push } from 'connected-react-router';

import { getCurrentUser } from '../reducers/app';
import { AppThunk, AppDispatch } from '../store';
import { SignupFormValues, UserResponse } from '../types/auth.d';
import { User } from '../types/user';
import { AUTH_API } from './api';
import { goToHome, showResponseError } from './app';
import { actionWithLoader } from './utils';


// --------------------------------------------------------//
// ---------------------- Routing -------------------------//
// --------------------------------------------------------//

export const goToLogin = () => push('/login');
export const goToSignup = () => push('/signup');


/**
 * get the token from LocalStorage
 * @param {UserResponse} user 
 * @returns {string}
 */
export const getTokenName = (user: User | string) => {
  let id;

  if (typeof user === 'string') {
    id = user;
  } else {
    id = user.id;
  }
  return 'token-' + id;
}


/**
 * get the token from LocalStorage
 * @param {UserResponse} user 
 * @returns {string}
 */
 export const retrieveTokenFromLocalStorage = (user: User) => {
  const token = localStorage.getItem(getTokenName(user));
  
  return token;
}


/**
 * clear user into localStorage
 * @param {string} user 
 */
export const clearUserIntoLocalStorage = (id: string) => {
  localStorage.removeItem(getTokenName(id));
}


/**
 * update the token from localStorage
 * @param {UserResponse} user 
 * @returns 
 */
export const updateUserIntoLocalStorage = (user: UserResponse) => {
  if (!user || !user.token) return null;

  localStorage.setItem(getTokenName(user), user.token);
}


/**
 * remove the token from the object
 * @param {UserResponse} user 
 */
const deleteTokenFromUser = (user: UserResponse) => {
  delete user.token; 
}


/**
 * save the user to store
 * @param {UserResponse} user 
 * @returns 
 */
export const loginSuccess = (user: UserResponse): any => actionWithLoader(async (dispatch: AppDispatch, getState: any) => {
  let currentUser = user || getCurrentUser(getState());
  
  if (currentUser) {
    // remove the token from store
    deleteTokenFromUser(user);

    dispatch({
      type: 'LOGIN_SUCCESS',
      user: currentUser,
    });

    // update user into localStorage
    updateUserIntoLocalStorage(currentUser);
  } 
});


/**
 * login the user after form validation
 * @param {string} email 
 * @param {string} password 
 * @returns 
 */
export const login = (email: string, password: string): AppThunk => 
  actionWithLoader(async (dispatch: AppDispatch, getState: any): Promise<void> => {
    const result = await AUTH_API.login({ email, password });

    // if there are errors
    showResponseError(result)(dispatch);

		await loginSuccess(result.user)(dispatch, getState());
    dispatch(goToHome());
	});


/**
 * signup after form validation
 * @param {SignupFormValues} values 
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

  clearUserIntoLocalStorage(result.id);
  dispatch(goToLogin());
});
