export const isUserLoggedIn = () => {
  const status = localStorage.getItem("authToken");
  return status && status != "";
};
