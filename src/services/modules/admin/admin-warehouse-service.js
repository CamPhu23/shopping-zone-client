import axiosRequest from "../../../config/http-request";
import { BASE_URL } from "../../../constants/http";

const postImportProduct = (formData) => {
  return axiosRequest
    .post(`${BASE_URL}/admin/warehouse/import`, formData)
    .then((data) => data)
    .catch((err) => {
      throw new Error(err);
    });
};

export default {
  postImportProduct
};
