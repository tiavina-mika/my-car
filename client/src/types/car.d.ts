import { ApiResponseError } from './app';
import { Comment } from './comment';


export interface Car {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  comments?: Comment[];
  shortDesc: string;
  year: string;
  distance: string;
  fuel: 'Essence' | 'Diesel' | 'Electrique' | 'Hybride';
  gearbox: 'Manuelle' | 'Automatique';
  price: string;
  image?: string;
}
export interface CarState {
  car?: Car | null;
  cars: Car[];
  count?: number | null;
}

export interface CarAction {
  type: string;
  car: Car;
  cars: Car[];
  count?: number;
}

export interface CarFormValues extends Omit<Car, 'createdAt' | 'updatedAt' | 'id'>{};

export type PartialCarFormValues = Partial<CarFormValues>;

export type CarApiResponse = Car & ApiResponseError;
export interface CarFormInitialValues extends Omit<PartialCarFormValues, 'descLong'> {
  descLong?: any;
}

export type CarTypes = CarAction;