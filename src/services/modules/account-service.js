import axiosRequest from "../../config/http-request";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../../constants/default-axios-product";
import { BASE_URL } from "../../constants/http";

const getUserInfo = () => {
  return axiosRequest
    .get(`${BASE_URL}/account/info`)
    .then((info) => info)
    .catch((err) => {
      throw new Error(err);
    });
};

const updateUserInfo = (formData) => {
  return axiosRequest
    .post(`${BASE_URL}/account/update`, formData)
    .then((response) => response)
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    })
};

const getUserOrderHistory = (id, page = DEFAULT_PAGE, size = DEFAULT_PAGE_SIZE) => {
  return axiosRequest
    .get(`${BASE_URL}/account/orders?id=${id}&page=${page}&size=${size}`)
    .then((orders) => orders)
    .catch((err) => {
      throw new Error(err);
    });
};

const getReceiptById = (id) => {
  return axiosRequest
    .get(`${BASE_URL}/account/order/${id}`)
    .then((order) => order)
    .catch((err) => {
      throw new Error(err);
    });
};

const postRating = (formData) => {
  return axiosRequest
    .post(`${BASE_URL}/account/rating`, formData)
    .then((order) => order)
    .catch((err) => {
      throw new Error(err);
    });
};

export default {
  getUserInfo,
  getUserOrderHistory,
  updateUserInfo,
  getReceiptById,
  postRating,
};
