import axiosRequest from "../../../config/http-request";
import { BASE_URL } from "../../../constants/http";

const getOverviewStatistics = () => {
  return axiosRequest
    .get(`${BASE_URL}/admin/statistics`)
    .then((data) => data)
    .catch((err) => {
      throw new Error(err);
    });
};

export default {
  getOverviewStatistics
};
