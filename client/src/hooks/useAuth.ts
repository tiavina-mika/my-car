import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { loginSuccess, retrieveUserFromLocalStorage } from '../actions/auth';
import { getCurrentUser } from '../reducers/app';
import { UserResponse } from '../types/auth';

export const useAuth = () => {
  const dispatch = useDispatch();
  const currrentUser = useSelector(getCurrentUser);

  // retrieve the userFrom local storage
  const data: UserResponse | null = retrieveUserFromLocalStorage();

  useEffect(() => {
    // save the user to store
    if (!currrentUser && data) {
      dispatch(loginSuccess(data));
    }
  }, [dispatch, data])
}