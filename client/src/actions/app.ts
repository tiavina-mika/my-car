import { push } from 'connected-react-router';

import {  AppThunk, AppDispatch } from '../store';
import {  ApiResponseError, Variant } from '../types/app.d';

/* eslint-disable @typescript-eslint/no-use-before-define */
const CONNECTION_FAILED = 'Votre connexion semble dégradée, vérifiez-là puis actualisez la page.';
/**
 *
 * @param {object} error
 */
export const handleErrorMessage = (error: any): string => {
  switch (error.code) {
  case 100:
    return CONNECTION_FAILED;
  default:
    return error.message;
  }
};

export const showError = (errorOrMessage: any): AppDispatch => (dispatch: any): void => {
  console.error(errorOrMessage);
  dispatch({
    type: 'ERROR',
    message: typeof errorOrMessage === 'string' ? errorOrMessage : handleErrorMessage(errorOrMessage),
  });
};

interface Close {
  type: 'CLOSE_ERROR' | 'CLOSE_MESSAGE';
}
export const closeError = (): Close => ({ type: 'CLOSE_ERROR' });

/**
 * load coupon feedback
 * @param {string} message
 */
export const showMessage = (message: string, variant: Variant): AppThunk => dispatch => {
  dispatch({
    type: 'MESSAGE',
    message,
    variant,
  });
};

export const closeMessage = (): Close => ({ type: 'CLOSE_MESSAGE' });

/**
 * show error returned by apis
 * @param {string} message
 */
export const showResponseError = (result: ApiResponseError): AppDispatch => (dispatch: any) => {
  if (!result.error) return;
  showError(result.message)(dispatch);
  return;
};

// --------------------------------------------------------//
// ---------------------- Routing -------------------------//
// --------------------------------------------------------//

export const goToHome = () => push('/');
