import { loadCars } from '../actions/cars';
import { getCars } from '../reducers/cars';
import { Car } from '../types/car';
import { useLoadData } from './useLoadData';

export const useLoadCars = (): Car[] => {

  // get car list
  const cars: Car[] = useLoadData({
    getData: getCars,
    loadData: loadCars,
  });

  return cars;
}