import { getCars } from '../reducers/cars';
import { AppThunk, AppDispatch, RootState } from '../store';
import { Car } from '../types/car';
import { CommentFormValues } from '../types/comment';
import { COMMENT_API } from './api';
import { showResponseError } from './app';
import {  actionWithLoader  } from './utils';


// --------------------------------------------------------//
// --------------------- CRUD actions ---------------------//
// --------------------------------------------------------//
/**
 * create new Comment
 * @param {string} carId
 * @param {CommentFormValues} values
 * @returns {*}
 */
export const createComment = (carId: string, values: CommentFormValues): AppThunk => {

  return actionWithLoader(async (dispatch: AppDispatch, getState: () => RootState) => {
    const cars: Car[] = getCars(getState());
    const car = await COMMENT_API.createComment(carId, values);

		// -------------- dispatch -------------- //
    dispatch({
      type: 'CAR_LOADED',
      car,
    });

    dispatch({
      type: 'CARS_UPDATED',
      cars: [car, ...cars],
    });

  });
};


// ------------------------------------------------------------------- //
// ------------------------------ THUNK ------------------------------ //
// ------------------------------------------------------------------- //

/**
 * update a car's comment
 * @param {Car} car
 * @param {string} id
 * @param {CommentFormValues} body
 * @returns {Promise<*>}
 */
export const updateCommentThunk = (car: Car, id: string, body: CommentFormValues): (dispatch: AppDispatch) => Promise<void> => {
  return async (dispatch: AppDispatch): Promise<void> => {
    const updatedCar = await COMMENT_API.updateComment(car.id, id, body);

    // if there are errors
    showResponseError(updatedCar)(dispatch);

    dispatch({
      type: 'CAR_UPDATED',
      car,
    });

  };
};


/**
 * update a car's comment
 * @param {Car} car
 * @param {string} id
 * @param {CommentFormValues} body
 * @returns {Promise<*>}
 */
 export const deleteCommentThunk = (car: Car, id: string): (dispatch: AppDispatch, getState: () => RootState) => Promise<void> => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    const cars: Car[] = getCars(getState());
    const newCars: Car[] = cars.filter((p: Car): boolean => p !== car);

    await COMMENT_API.deleteComment(car.id, id);

    dispatch({
      type: 'CARS_UPDATED', // used in cars list
      cars: newCars,
    });
  };
};



// --------------------------------------------------------//
// --------------------- WITH LOADER ----------------------//
// --------------------------------------------------------//

/**
 * update a car's comment
 * @param {Car} car
 * @param {string} id
 * @param {CommentFormValues} values
 * @returns {Promise<*>}
 */
export const updateComment = (car: Car, id: string, values: CommentFormValues): AppThunk => {
  return actionWithLoader(async (dispatch: AppDispatch) => {
    await updateCommentThunk(car, id, values)(dispatch);
  });
};

/**
 * delete a comment
 * @param {Car} car
 * @param {string} id
 * @returns {Promise<*>}
 */
 export const deleteComment = (car: Car, id: string): AppThunk => {
  return actionWithLoader(async (dispatch: AppDispatch, getState: () => RootState) => {
    await deleteCommentThunk(car, id)(dispatch, getState);
  });
};