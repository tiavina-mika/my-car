import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { loadCars } from '../actions/cars';
import { getCars } from '../reducers/cars';

export const useLoadCars = () => {
  const dispatch = useDispatch();
  const cars = useSelector(getCars);

  useEffect(() => {
    dispatch(loadCars());
  }, [dispatch])

  return cars;
}