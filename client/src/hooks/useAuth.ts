import { useEffect } from 'react';

import { useSelector, useStore } from 'react-redux';

import { loginSuccess, retrieveUserFromLocalStorage } from '../actions/auth';
import { getCurrentUser } from '../reducers/app';
import { UserResponse } from '../types/auth';

export const useAuth = () => {
  const store = useStore();
  const currentUser = useSelector(getCurrentUser);

  // retrieve the userFrom local storage

  useEffect(() => {
    const data: UserResponse | null = retrieveUserFromLocalStorage();

    // save the user to store
    if (!currentUser && data) {
      loginSuccess()(store.dispatch, store.getState);
    }
  }, [store])
}