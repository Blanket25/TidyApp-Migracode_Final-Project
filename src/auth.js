export const isAuthenticated = () =>
  window.localStorage.getItem("groupId") !== null;

export const logOut = () => window.localStorage.clear();
export const logIn = (groupId) =>
  window.localStorage.setItem("groupId", groupId);

export const getGroupId = () => window.localStorage.getItem("groupId");
