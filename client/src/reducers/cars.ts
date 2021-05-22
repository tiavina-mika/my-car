import { RootState } from '../store';
import { CarAction, CarState } from '../types/car';

import { getData } from './index';

const INITIAL_STATE: CarState = {
  car: null,
  cars: [],
  count: null,
};

const carReducer = (state = INITIAL_STATE, action: CarAction): CarState => {
  switch (action.type) {
  case 'CAR_LOADED':
    return {
      ...state,
      car: action.car,
    };
  case 'REMOVE_CAR':
    return {
      ...state,
      car: null,
    };
  case 'CAR_UPDATED':
    return {
      ...state,
      car: action.car,
    };
  case 'CARS_LOADED':
    return {
      ...state,
      cars: action.cars,
      count: action.count,
    };
  case 'CARS_UPDATED':
    return {
      ...state,
      cars: action.cars,
    };
  default:
    return state;
  }
};

// ------------------------------------------------------------------//
// --------------------------- Selectors ----------------------------//
// ------------------------------------------------------------------//
export const getCar = (state: RootState, errorIfNotFound = false) => getData(state, 'cars.car', errorIfNotFound && 'No car data found');
export const getCars = (state: RootState, errorIfNotFound = false) => getData(state, 'cars.cars', errorIfNotFound && 'No cars data found');
export const getCarsCount = (state: RootState, errorIfNotFound = false) => getData(state, 'cars.count', errorIfNotFound && 'No cars count data found');

export default carReducer;