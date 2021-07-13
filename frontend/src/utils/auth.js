function isUserLoggedIn() {
  const status = localStorage.getItem("authToken");
  return status && status != "";
}

export { isUserLoggedIn };
