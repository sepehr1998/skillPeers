import axios from "axios";
import store from "@/store";
import { getToken } from "@/utils/auth";

let parseServerError = function(error) {
  // if (!error || !error.data || !error.data.errorCode) return undefined;
  if (!error || !error.errorCode) return undefined;
  let errorObj = {
    errorCode: error.errorCode,
    errorMessage: "",
  };
  switch (error.errorCode) {
    case 2101:
    case 2089:
      errorObj.errorMessage = "Invalid request token.";
      break;
    case 3001:
      errorObj.errorMessage = "User not exist";
      break;
    case 3003:
      errorObj.errorMessage = "Wrong password";
      break;
    case 3011:
      errorObj.errorMessage = "Username already exist";
      break;
    case 3014:
      errorObj.errorMessage = "Email already exist in system";
      break;
    case 3020:
      errorObj.errorMessage = "Invalid registration code.";
      break;
    case 3021:
      errorObj.errorMessage = "Email not exist in system";
      break;
    case 3022:
      errorObj.errorMessage = "Wrong password";
      break;
    case 3032:
      errorObj.errorMessage = "Email already exist in system";
      break;
    case 3025:
      errorObj.errorMessage = "Email not exist in system";
      break;
    case 3026:
      errorObj.errorMessage = "Invalid registration code.";
      break;
    case 2414:
      errorObj.errorMessage = "Email already exist in system";
      break;
    case 1201:
      errorObj.errorMessage = "Requested data not exist.";
      break;
    case 495:
      errorObj.errorMessage = "You can't rate this user again";
      break;
    case 496:
      errorObj.errorMessage = "You can't rate this user";
      break;
    default:
      errorObj.errorMessage = "Some parmeters are invalid";
  }
  return errorObj;
};

let parseHttpError = function(error) {
  let errorObj = {
    errorCode: -1,
    errorMessage: "",
  };
  switch (error.status) {
    case 504:
      errorObj.errorCode = 504;
      errorObj.errorMessage = "Time out.";
      break;
    case 503:
      errorObj.errorCode = 503;
      errorObj.errorMessage = "Service Unavailable";
      break;
    case 500:
      errorObj.errorCode = 500;
      errorObj.errorMessage = "Some Problem while connecting server.";
      break;
    default:
      errorObj.errorCode = -1;
      errorObj.mainError = error;
      errorObj.errorMessage = "Unkown error while sending request.";
  }
  return errorObj;
};

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // request timeout
});
// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    if (store.getters.token) {
      config.headers["Authorization"] = getToken();
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    let errorObj = {
      errorCode: error.errorCode,
      errorMessage: "Error while sending request",
      data: error,
    };
    return Promise.reject(errorObj);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status == 204) return response;
    let errorObj = parseServerError(response.data[0]);
    if (errorObj) return Promise.reject(errorObj);
    else {
      return Promise.reject(parseHttpError(response));
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    if (error && error.response && error.response.data) {
      let errorObj = parseServerError(error.response.data[0]);
      if (errorObj) return Promise.reject(errorObj);
      else {
        return Promise.reject(parseHttpError(error.response));
      }
    } else{
      return Promise.reject(parseHttpError(error));
    }
  }
);

export default service;
