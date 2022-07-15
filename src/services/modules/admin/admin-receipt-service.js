import axiosRequest from "../../../config/http-request";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../../../constants/default-axios-product";
import { BASE_URL } from "../../../constants/http";

const getAllReceipts = async (page = DEFAULT_PAGE, size = DEFAULT_PAGE_SIZE) => {
  return axiosRequest
    .get(`${BASE_URL}/admin/receipts?page=${page}&size=${size}`)
    .then((data) => data)
    .catch(error => {
      throw new Error(error);
    })
}

const getReceiptById = async (id) => {
  return axiosRequest
    .get(`${BASE_URL}/admin/receipts/${id}`)
    .then((data) => data)
    .catch(error => {
      throw new Error(error);
    })
}

const postReceiptStatus = async (status) => {
  return axiosRequest
    .post(`${BASE_URL}/admin/receipts/update-status`, status)
    .then((data) => data)
    .catch(error => {
      throw new Error(error);
    })
}

export default {
  getAllReceipts,
  getReceiptById,
  postReceiptStatus,
};
