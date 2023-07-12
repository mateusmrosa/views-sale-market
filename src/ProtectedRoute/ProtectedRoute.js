
export const isAuthenticated = () => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  if (!isAuthenticated)
      return window.location.href = "http://localhost:3000";
}