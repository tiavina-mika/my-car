export enum ROLES {
  admin = 'ADMINISTRATOR',
  user = 'ROLE',
}
export interface User {
  email: string;
  name: string;
  active: boolean;
  id: string;
  createdAt: string;
  updatedAt: string;
  roles: ROLES[];
  token?: string;
}

export interface UserState {
  user?: User | null;
  users: User[];
}

export interface UserAction {
  type: string;
  user: User;
  users: User[];
}

export type UserTypes = UserAction;