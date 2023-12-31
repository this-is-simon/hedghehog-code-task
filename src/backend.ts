import { UserCredentials, UserRegistration, Token, User } from "./types";

export interface ResponseError {
  statusCode?: number;
  data?: {
    message?: string;
  };
}
export interface DeleteUserResponse extends ResponseError {}
export interface LoginResponse extends Token, ResponseError {}

export interface FetchPageResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export const registerUser = (data: UserRegistration): Promise<Response> => {
  return fetch("http://localhost:3002/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response);
};

export const login = (data: UserCredentials): Promise<Response> => {
  return fetch("http://localhost:3002/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response);
};

interface QueryParams {
  per_page?: number; // default 10
  page?: number; // default: 1
}

export const fetchUserPage = (
  token: string,
  queryParams?: QueryParams
): Promise<FetchPageResponse> => {
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  });
  let rawUrl = `http://localhost:3002/api/users`;
  let url = handleParams(rawUrl, queryParams);

  return fetch(url, {
    method: "GET",
    headers,
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });
};

export const addNewUser = (newUser: {
  first_name: string;
  last_name: string;
  email: string;
}): Promise<Response> => {
  let token = localStorage.getItem("token");
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  });
  return fetch("http://localhost:3002/api/users", {
    method: "POST",
    headers,
    body: JSON.stringify(newUser),
  })
    .then((response) => response)
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });
};

export const deleteUser = (id: number): Promise<DeleteUserResponse> => {
  console.log("delete user", id);
  let token = localStorage.getItem("token");
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });
  return fetch(`http://localhost:3002/api/users/${id}`, {
    method: "DELETE",
    headers,
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });
};

const handleParams = (url: string, queryParams?: QueryParams) => {
  const params = new URLSearchParams();
  if (queryParams?.per_page) {
    params.append("per_page", String(queryParams.per_page));
  }
  if (queryParams?.page) {
    params.append("page", String(queryParams.page));
  }
  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  return url;
};
