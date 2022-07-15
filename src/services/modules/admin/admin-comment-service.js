import axiosRequest from "../../../config/http-request";
import { BASE_URL } from "../../../constants/http";

const getAllComments = () => {
  return axiosRequest
    .get(`${BASE_URL}/admin/comments`)
    .then((data) => data)
    .catch((error) => {
      throw new Error(error);
    });
};

const replyComment = (comment) => {
  return axiosRequest
    .post(`${BASE_URL}/admin/comments/reply`, comment)
    .then((res) => res)
    .catch((error) => {
      throw new Error(error);
    });
};

const markComment = (ids) => {
  return axiosRequest
    .post(`${BASE_URL}/admin/comments/mark`, ids)
    .then((res) => res)
    .catch((error) => {
      throw new Error(error);
    });
};

const deleteComment = (data) => {
  return axiosRequest
    .post(`${BASE_URL}/admin/comments/delete`, data)
    .then((res) => res)
    .catch((error) => {
      throw new Error(error);
    });
};

const editReply = (data) => {
  return axiosRequest
    .post(`${BASE_URL}/admin/comments/update`, data)
    .then((res) => res)
    .catch((error) => {
      throw new Error(error);
    });
};

export default {
  getAllComments,
  replyComment,
  markComment,
  deleteComment,
  editReply,
};
