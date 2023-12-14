export interface BaseUser {
  first_name: string;
  last_name: string;
  email: string;
}

export interface User extends BaseUser {
  id: 14;
  display_picture: string;
}

export interface UserRegistration extends BaseUser {
  password: string;
  password_confirmation: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export type Token = { token: string };
