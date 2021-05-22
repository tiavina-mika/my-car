import { push } from 'connected-react-router';

import { getCar, getCars } from '../reducers/cars';
import { AppThunk, AppDispatch, RootState } from '../store';
import { Car, PartialCarFormValues } from '../types/car';
import { CAR_API } from './api';
import { showMessage, showResponseError } from './app';
import {  actionWithLoader  } from './utils';

// --------------------------------------------------------//
// --------------------- CRUD actions ---------------------//
// --------------------------------------------------------//
/**
 * create new Car
 * @param values
 * @returns {*}
 */
export const createCar = (values: PartialCarFormValues): AppThunk => {

  return actionWithLoader(async (dispatch: AppDispatch, getState: () => RootState) => {
    const cars: Car[] = getCars(getState());
    const car = await CAR_API.createCar(values);

		// -------------- dispatch -------------- //
    dispatch({
      type: 'CAR_LOADED',
      car,
    });

    dispatch({
      type: 'CARS_UPDATED',
      cars: [car, ...cars],
    });

    dispatch(showMessage(`${car.name} ajouté avec succès`, 'success'));
  });
};

/**
 * delete current car
 * @param {Car} car
 * @returns {Promise<*>}
 */
export const deleteCar = (car: Car): AppThunk => {
  return actionWithLoader(async (dispatch: AppDispatch, getState: () => RootState) => {
    const cars: Car[] = getCars(getState());
    const newCars: Car[] = cars.filter((p: Car): boolean => p !== car);

    await CAR_API.deleteCar(car.id);

    dispatch({
      type: 'CARS_UPDATED', // used in cars list
      cars: newCars,
    });

    dispatch(showMessage(`${car.name})} supprimé avec succès`, 'success'));
  });
};


// ------------------------------------------------------------------- //
// ------------------------------ THUNK ------------------------------ //
// ------------------------------------------------------------------- //

/**
 * save and update car
 * @param {Car} car
 * @param {PartialCarFormValues} values
 * @returns {Promise<*>}
 */
export const updateCarThunk = (car: Car, values: PartialCarFormValues): (dispatch: AppDispatch) => Promise<void> => {
  return async (dispatch: AppDispatch): Promise<void> => {
    const updatedCar = await CAR_API.updateCar(car.id, values);

    // if there are errors
    showResponseError(updatedCar)(dispatch);

    dispatch({
      type: 'CAR_UPDATED',
      car,
    });

    dispatch(showMessage(`${car.name} modifié avec succès`, 'success'));
  };
};


/**
 * load all cars
 * @returns {Function}
 */
export const loadCarsThunk = (): (dispatch: AppDispatch) => Promise<Car[]> => {
  return async (dispatch: AppDispatch): Promise<Car[]> => {
    const cars = await CAR_API.getCars();

    if (cars && Array.isArray(cars)) {
      dispatch({
        type: 'CARS_LOADED',
        cars,
      });
    }
    return cars;
  };
};

/**
 * load car into redux
 * @param id
 * @returns {function(*, *): Promise<*>}
 */
export const loadCarThunk = (id: string): (dispatch: AppDispatch, getState: () => RootState) => Promise<Car | undefined> => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<Car | undefined> => {
    const currentCar: Car = getCar(getState());

    if (!currentCar || currentCar.id !== id) {
      // loading car
      const car = await CAR_API.getCar(id);

      // if there are errors
      showResponseError(car)(dispatch);

      dispatch({
        type: 'CAR_LOADED',
        car,
      });

      return car;
    }

    return currentCar;
  };
};

// --------------------------------------------------------//
// --------------------- WITH LOADER ----------------------//
// --------------------------------------------------------//

/**
 * update current car
 * @param {Car} car
 * @param {PartialCarFormValues} values
 * @returns {*}
 */
export const updateCar = (car: Car, values: PartialCarFormValues): AppThunk => {
  return actionWithLoader(async (dispatch: AppDispatch) => {
    await updateCarThunk(car, values)(dispatch);
  });
};

/**
 * load all cars
 * @returns {Function}
 */
export const loadCars = (): (dispatch: AppDispatch) => Promise<void> => {
  return actionWithLoader(async (dispatch: AppDispatch): Promise<void> => {

    await loadCarsThunk()(dispatch);
  });
};


/**
 * load a car
 * @param {string} id 
 * @returns 
 */
export const loadCar = (id: string): AppThunk => {
 return actionWithLoader(async (dispatch: AppDispatch, getState: () => RootState) => {
   await loadCarThunk(id)(dispatch, getState);
 });
};



// --------------------------------------------------------//
// ---------------------- Routing -------------------------//
// --------------------------------------------------------//

export const goToCars = () => push('/voitures');
export const goToCarCreation = () => push('/voiture/ajouter');
export const goToCarEdition = (id: string) => push('/voiture/modifier/' + id);
export const goToCarPreview = (id: string) => push('/voiture/' + id);