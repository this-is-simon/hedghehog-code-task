import { UserCredentials, NewUser, Token, User, AllUsersResponse } from "./types";

export const registerUser = (data: NewUser): Promise<User | Error> => {
  return fetch("http://localhost:3002/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    })
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });
};

export const login = (data: UserCredentials): Promise<Token | Error> => {
  return fetch("http://localhost:3002/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    })
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });
};

export const fetchAllUsers = (
  token: string,
  queryParams?: {
    per_page: number; // default 10
    page: number;
  }
): Promise<AllUsersResponse | Error> => {
  console.log("fetch all users", token);
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  });
  return fetch("http://localhost:3002/api/users", {
    method: "GET",
    headers,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    })
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });
};
