import { BASE_URL } from "../../constants/http";
import axiosRequest from "../../config/http-request";

const postPayment = (formData) => {
  return axiosRequest
    .post(`${BASE_URL}/payment`, formData)
    .then((product) => product)
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export default {
  postPayment
};
