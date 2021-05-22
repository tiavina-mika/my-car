import { RootState, AppDispatch } from '../store';
import { LOCAL_ENDPOINT, LOCAL_HOSTNAME, PROD_URL } from '../utils/constants';
import { showError } from './app';


/**
 * returns a thunk
 * @param thunkOrPromise (signature if thunk: (dispatch : func, getState : func) : Promise)
 * @returns {function(*=, *=): Promise<void>}
 */
export const actionWithLoader = (thunkOrPromise: any): any => async (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch({
    type: 'LOADING_START',
  });
  try {
    if (typeof thunkOrPromise === 'function') {
      await thunkOrPromise(dispatch, getState);
    } else {
      await thunkOrPromise;
    }
  } catch (error) {
    showError(error)(dispatch);
  } finally {
    dispatch({
      type: 'LOADING_END',
    });
  }
};

/**
 * get url
 * @param {Boolean} isEndPoint
 * @returns {String}
 */
 export const getUrl = (isEndPoint = false) => {
  // ---- LOCAL ---- //
  if ((window as any).LOCAL) {
    return isEndPoint ? LOCAL_ENDPOINT : `http://${LOCAL_HOSTNAME}:${(window as any).location.port}`;
  }

  // ---- PROD ---- //
  return PROD_URL;
}