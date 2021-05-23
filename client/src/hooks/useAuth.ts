import {  useMemo } from 'react';

import { useSelector } from 'react-redux';

import { parseToken } from '../actions/auth';
import { getCurrentUser } from '../reducers/app';

export const useAuth = () => {
  const currrentUser = useSelector(getCurrentUser);

  const { userId }: any = parseToken();

  const isAuthenticated: boolean = useMemo((): boolean => {
    if (currrentUser && currrentUser.id === userId) {
      return true;
    }

    return false;
  }, [userId])

  return isAuthenticated;
}