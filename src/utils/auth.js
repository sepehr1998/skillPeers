import Cookies from "js-cookie";

const TokenKey = "proslink-Token";
// let tempToken = "";

export function getToken() {
  // if (tempToken && tempToken.length > 0) return tempToken;
  return Cookies.get(TokenKey);
}

export function setToken(token, remember) {
  if (remember) {
    return Cookies.set(TokenKey, token, { expires: 7 });
  } else {
    return Cookies.set(TokenKey, token);
    // removeToken();
    // tempToken = token;
    // return tempToken;
  }
}

export function removeToken() {
  // tempToken = "";
  return Cookies.remove(TokenKey);
}
