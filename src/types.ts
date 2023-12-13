export interface NewUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ExistingUser {
  email: string;
  password: string;
}

export type Token = string;
