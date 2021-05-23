import axios, { AxiosResponse } from 'axios';

import { ApiResponseError } from '../types/app';
import { SignupFormValues, LoginFormValues, SignupApiResponse, LogoutApiResponse, UserResponse } from '../types/auth';
import { Car, CarApiResponse, PartialCarFormValues } from '../types/car';
import { CommentFormValues } from '../types/comment';
import { retrieveUserFromLocalStorage } from './auth';
import { getUrl } from './utils';


const instance = axios.create({
  baseURL: getUrl(true),
});

/**
 * set api bearer token header
 * @param {string} token 
 * @returns 
 */
const authorized = () => {
	const user = retrieveUserFromLocalStorage();

	if (!user) return {};
	return {
		headers: {
			'Authorization': `Basic ${user.token}`,
		},
	}
}

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
	get: (url: string, config?: any) => instance.get(url, config).then(responseBody),
	post: (url: string, body: {}, config?: any) => instance.post(url, body, config).then(responseBody),
	put: (url: string, body: {}, config?: any) => instance.put(url, body, config).then(responseBody),
	delete: (url: string, config?: any) => instance.delete(url, config).then(responseBody),
};

export const CAR_API = {
	getCars: async (): Promise<Car[]> => requests.get('api/cars'),
	getCar: async (id: string): Promise<CarApiResponse> => requests.get(`api/cars/${id}`),
	createCar: async (body: PartialCarFormValues): Promise<CarApiResponse> => requests.post('api/cars', body),
	updateCar: async (id: string, body: PartialCarFormValues): Promise<CarApiResponse> => requests.put(`api/cars/${id}`, body),
	deleteCar: async (id: string): Promise<CarApiResponse> => requests.delete(`api/cars/${id}`),
};

export const COMMENT_API = {
	createComment: (carId: string, body: CommentFormValues): Promise<CarApiResponse> => requests.post(`api/cars/${carId}/comment`, body, authorized),
	updateComment: (carId: string, id: string, body: CommentFormValues): Promise<CarApiResponse> => requests.put(`api/cars/${carId}/comment/${id}`, body, authorized),
	deleteComment: (carId: string, id: string): Promise<CarApiResponse> => requests.delete(`api/cars/${carId}/comment/${id}`, authorized),
};

export const AUTH_API = {
	signup: (body: SignupFormValues): Promise<SignupApiResponse & ApiResponseError> => requests.post('users/signup', body),
	login: (body: LoginFormValues): Promise<UserResponse & ApiResponseError> => requests.post('users/login', body),
	logout: (): Promise<LogoutApiResponse & ApiResponseError> => requests.get('users/logout', authorized),
};