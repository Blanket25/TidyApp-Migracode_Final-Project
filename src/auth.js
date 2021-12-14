export const isAuthenticated = () =>
  window.localStorage.getItem("token") !== null;

export const logOut = () => window.localStorage.clear();
export const logIn = (token) => window.localStorage.setItem("token", token);

export const getUserToken = () => window.localStorage.getItem("token");
