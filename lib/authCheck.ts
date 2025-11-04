export function isLoggedIn() {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("currentUser");
  return !!(token && user);
}

export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("currentUser");
}
