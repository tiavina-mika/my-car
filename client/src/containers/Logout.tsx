import { useEffect } from 'react';

import { useStore } from 'react-redux';

import { logout } from '../actions/auth';

const Logout = () => {

  const store = useStore();

  useEffect(() => {
    const deconnect = async () => {
      logout()(store.dispatch, store.getState);
    };

    deconnect();
  }, [store]);

  return null;
};

export default Logout;
