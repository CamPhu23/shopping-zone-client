import axiosRequest from "../../../config/http-request";
import { BASE_URL } from "../../../constants/http";
import { systemService } from "../../../services/modules";

const handleLogin = (formInput) => {
  return axiosRequest
    .post(`${BASE_URL}/admin/auth/login`, formInput)
    .then((token) => token)
    .catch((err) => {
      throw new Error(err);
    });
};

const handleRefreshToken = (token) => {
  return axiosRequest
    .post(`${BASE_URL}/admin/auth/refresh-token`, token)
    .then((token) => token)
    .catch((err) => {
      throw new Error(err);
    });
};

const handleLogout = () => {
  systemService.deleteRefreshToken();
}

export default {
  handleLogin,
  handleRefreshToken,
  handleLogout,
};
