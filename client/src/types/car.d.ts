import { ApiResponseError } from './app';
import { Comment } from './comment';


export interface Car {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  comments: Comment[];
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

export interface CarFormValues {
  name: string;
}

export type PartialCarFormValues = Partial<CarFormValues>;

export type CarApiResponse = Car & ApiResponseError;
// export interface CarFormInitialValues extends Omit<PartialCarFormValues, 'descLong'> {
//   descLong?: any;
// }

export type CarTypes = CarAction;