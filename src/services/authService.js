import http from "./httpService";
import jwtDecode from "jwt-decode";

const authEndpoint = "/auth";
const tokenKey = "token";
http.setJwt(getJwt());

export async function login(username, password) {
  const { data: jwt } = await http.post(authEndpoint, { username, password });
  http.setJwt(jwt);
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  http.removeJwt();
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    return jwtDecode(getJwt());
  } catch (ex) {
    return null;
  }
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser
};
