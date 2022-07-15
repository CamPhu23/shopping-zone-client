import { BASE_URL } from "../../constants/http";
import axiosRequest from "../../config/http-request";

const addComment = (formInput) => {
  return axiosRequest
    .post(`${BASE_URL}/comment/addcomment`, formInput)
    .then(response => response)
    .catch((error) => {
      throw error;
    });
}
const getAllComments = (id) => {
  return axiosRequest.get(`${BASE_URL}/products/${id}`)
    .then((response) => {
      return response.comments;
    })
    .catch((error) => {
      throw error;
    });
}
export default {
  addComment,
  getAllComments
};
