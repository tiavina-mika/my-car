export const SERVER_PORT: number = 4200;

export const projectName: string = 'my-car';
export const projectNameUpper: string = projectName.toUpperCase();

export const PROD_HOSTNAME: string = 'my-app-web.heroku.app';
export const LOCAL_HOSTNAME: string = 'localhost';
export const LOCAL_ENDPOINT_HOSTNAME: string = '127.0.0.1';

export const PROD_URL: string = 'https://' + PROD_HOSTNAME;
export const LOCAL_URL: string = 'http://' + LOCAL_HOSTNAME;
export const LOCAL_ENDPOINT: string = 'http://' + LOCAL_ENDPOINT_HOSTNAME + ':' + SERVER_PORT;