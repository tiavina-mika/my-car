import { RootState } from '../store';
import { UserAction, UserState } from '../types/user';

import { getData } from './index';

const INITIAL_STATE: UserState = {
  user: null,
  users: [],
};

const userReducer = (state = INITIAL_STATE, action: UserAction): UserState => {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        user: action.user,
      };
    case 'REMOVE_USER':
      return {
        ...state,
        user: null,
      };
    case 'USER_UPDATED':
      return {
        ...state,
        user: action.user,
      };
    case 'USERS_LOADED':
      return {
        ...state,
        users: action.users,
      };
    case 'USERS_UPDATED':
      return {
        ...state,
        users: action.users,
      };
    default:
      return state;
  }
};

// ------------------------------------------------------------------//
// --------------------------- Selectors ----------------------------//
// ------------------------------------------------------------------//
export const getUser = (state: RootState, errorIfNotFound = false) => getData(state, 'users.user', errorIfNotFound && 'No user data found');
export const getUsers = (state: RootState, errorIfNotFound = false) => getData(state, 'users.users', errorIfNotFound && 'No users data found');

export default userReducer;