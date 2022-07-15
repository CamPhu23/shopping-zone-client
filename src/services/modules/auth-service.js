import { store } from "../store";
import { BASE_URL } from "../../constants/http";
import axiosRequest from "../../config/http-request";
import { refreshTokenRequest } from "../../services/actions/auth-action";
import { systemService } from "../../services/modules";
import { CLIENT_PERMISSION } from "../../constants/authentication";

const handleLogin = (formInput) => {
  return axiosRequest
    .post(`${BASE_URL}/auth/login`, formInput)
    .then((token) => token)
    .catch((err) => {
      throw new Error(err);
    });
};

const handleGoogleLogin = (formInput) => {
  return axiosRequest
    .post(`${BASE_URL}/auth/google-login`, formInput)
    .then((token) => token)
    .catch((err) => {
      throw new Error(err);
    });
};

const getAcessToken = () => {
  const state = store.getState();
  const { accessToken, expiredTime, user } = state.auth;
  const isClient = user.permission === CLIENT_PERMISSION;

  if (Date.parse(expiredTime) < Date.now()) {
    const refreshToken = systemService.getRefreshToken();

    if (refreshToken) {
      store.dispatch(refreshTokenRequest({ token: refreshToken, isClient }));
    }

    return refreshToken ? state.auth.accessToken : null;
  }

  return accessToken;
};

const handleRefreshToken = (token) => {
  return axiosRequest
    .post(`${BASE_URL}/auth/refresh-token`, token)
    .then((token) => token)
    .catch((err) => {
      throw new Error(err);
    });
};

const handleRegister = (formInput) => {
  return axiosRequest
    .post(`${BASE_URL}/auth/register`, formInput)
    .then((res) => res)
    .catch((error) => {
      throw new Error(error);
    });
};

const handleLogout = () => {
  systemService.deleteRefreshToken();
}

const handleForgotPassword = (formInput) => {
  return axiosRequest
    .post(`${BASE_URL}/auth/forgot-password`, formInput)
    .then((res) => res)
    .catch((error) => {
      throw error;
    });
};

const handleResetPassword = ({token, newPassword}) => {
  return axiosRequest
    .post(`${BASE_URL}/auth/reset-password/${token}`, {newPassword})
    .then((res) => res)
    .catch((error) => {
      throw error;
    });
};

export default {
  handleLogin,
  getAcessToken,
  handleRefreshToken,
  handleRegister,
  handleLogout,
  handleForgotPassword,
  handleResetPassword,
  handleGoogleLogin,
};
