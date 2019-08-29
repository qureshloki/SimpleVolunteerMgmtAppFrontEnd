import axios from "axios";
import logger from "./loggerService";
import { toast } from "react-toastify";

const authHeader = "x-auth-token";

//set the base url
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

//add response interceptor to log unexpected error
axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occured !");
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common[authHeader] = jwt;
}

function removeJwt() {
  delete axios.defaults.headers.common[authHeader];
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
  removeJwt
};
