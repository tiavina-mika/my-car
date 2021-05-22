import axios, { AxiosResponse } from 'axios';

import { ApiResponseError } from '../types/app';
import { SignupFormValues, LoginFormValues, SignupApiResponse, LoginApiResponse, LogoutApiResponse } from '../types/auth';
import { Car, CarApiResponse, PartialCarFormValues } from '../types/car';
import { CommentFormValues } from '../types/comment';
import { getUrl } from './utils';


const instance = axios.create({
  baseURL: getUrl(true),
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
	get: (url: string) => instance.get(url).then(responseBody),
	post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
	put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
	delete: (url: string) => instance.delete(url).then(responseBody),
};

export const CAR_API = {
	getCars: async (): Promise<Car[]> => requests.get('api/cars'),
	getCar: async (id: string): Promise<CarApiResponse> => requests.get(`api/cars/${id}`),
	createCar: async (body: PartialCarFormValues): Promise<CarApiResponse> => requests.post('api/cars', body),
	updateCar: async (id: string, body: PartialCarFormValues): Promise<CarApiResponse> => requests.put(`api/cars/${id}`, body),
	deleteCar: async (id: string): Promise<CarApiResponse> => requests.delete(`api/cars/${id}`),
};

export const COMMENT_API = {
	createComment: (carId: string, body: CommentFormValues): Promise<CarApiResponse> => requests.post(`api/cars/${carId}/comment`, body),
	updateComment: (carId: string, id: string, body: CommentFormValues): Promise<CarApiResponse> => requests.put(`api/cars/${carId}/comment/${id}`, body),
	deleteComment: (carId: string, id: string): Promise<CarApiResponse> => requests.delete(`api/cars/${carId}/comment/${id}`),
};

export const AUTH_API = {
	signup: (body: SignupFormValues): Promise<SignupApiResponse & ApiResponseError> => requests.post('users/signup', body),
	login: (body: LoginFormValues): Promise<LoginApiResponse & ApiResponseError> => requests.post('users/login', body),
	logout: (): Promise<LogoutApiResponse & ApiResponseError> => requests.get('users/logout'),
};