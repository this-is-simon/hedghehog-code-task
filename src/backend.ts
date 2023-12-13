import { ExistingUser, NewUser, Token } from "./types";

export const registerUser = (data: NewUser) => {
  fetch("http://localhost:3002/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

export const login = (data: ExistingUser): Promise<Token | Error> => {
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
