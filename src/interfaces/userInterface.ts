export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface IUserUpdate {
  name?: string;
  password?: string;
}
