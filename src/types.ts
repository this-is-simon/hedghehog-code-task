export interface NewUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface User {
  id: 14;
  first_name: string;
  last_name: string;
  email: string;
  display_picture: string;
}

export type Token = { token: string };

export interface AllUsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: [
    {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      display_picture: string;
    }
  ];
}
