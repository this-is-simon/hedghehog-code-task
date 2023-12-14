import {
  UserCredentials,
  NewUser,
  Token,
  User,
  AllUsersResponse,
  CreateUserResponse,
} from "./types";

export const registerUser = (data: NewUser): Promise<Response> => {
  return fetch("http://localhost:3002/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response)
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });
};

export const login = (data: UserCredentials): Promise<Token> => {
  return fetch("http://localhost:3002/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });
};

interface QueryParams {
  per_page?: number; // default 10
  page?: number; // default: 1
}

export const fetchAllUsers = (queryParams?: QueryParams): Promise<AllUsersResponse> => {
  let token = localStorage.getItem("token");
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  });
  let rawUrl = `http://localhost:3002/api/users`;
  let url = handleParams(rawUrl, queryParams);

  console.log("url", url);
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

export const createUser = (newUser: {
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

export const deleteUser = (id: number): Promise<Response> => {
  console.log("delete user", id);
  let token = localStorage.getItem("token");
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });
  return fetch(`http://localhost:3002/api/users/${id}`, {
    method: "DELETE",
    headers,
  })
    .then((response) => response)
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
