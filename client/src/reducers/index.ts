import { Reducer } from 'react';

import { connectRouter, LocationChangeAction, RouterState } from 'connected-react-router';
import { History, LocationState, createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { RootState } from '../store';
import appReducer from './app';
import carReducer from './cars';
import userReducer from './users';

export const history = createBrowserHistory();

const appReducers = {
  app: appReducer, 
  cars: carReducer,
  users: userReducer,
};

const createRootReducer = (history: History) => combineReducers({
  ...appReducers,
  form: formReducer,
  // router: connectRouter(history),
  router: (connectRouter(history) as any) as Reducer<
    RouterState<LocationState>,
    LocationChangeAction<LocationState>
  >,
});

const rootReducer = createRootReducer(history);

export default rootReducer;

/**
 * used by selectors
 * @param state
 * @param path
 * @param [errorMessageIfNotFound]
 * @returns {*}
 */
export const getData = (
  state: RootState, 
  path: string, 
  errorMessageIfNotFound?: any,
) => {
  let data;
  try {
    if (typeof state === 'function') {
      throw new Error('The state parameter must not be a function. The error is usually the usage of getState instead of getState(). Path is');
    }
    data = path.split('.').reduce((res: any, prop) => res[prop], state);
    if (errorMessageIfNotFound && data == null) {
      throw new Error(errorMessageIfNotFound);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
  return data;
};