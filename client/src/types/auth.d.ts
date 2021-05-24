import { ApiResponseSuccess } from './app.d';
import { User } from './user';

export interface LoginFormValues {
	email: string;
	password: string;
}

export interface SignupFormValues extends LoginFormValues {
	confirmPassword: string;
}

export interface EditProfileFormValues extends Partial<Pick<LoginFormValues, 'email'>> {
	name: string;
};

interface UserResponse extends User {
	token?: string;
}

export interface LoginApiResponse {
	success: boolean;
	user: UserResponse;
}

export interface SignupApiResponse extends ApiResponseSuccess {}

export interface LogoutApiResponse extends ApiResponseSuccess {}

