function isTokenExpired(token) {
  const payload = JSON.parse(atob(token.split(".")[1]));
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
}
const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  return token && !isTokenExpired(token);
};

export { isAuthenticated };
