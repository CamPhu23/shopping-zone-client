import axiosRequest from "../../../config/http-request";
import { BASE_CLOUDINARY_URL } from '../../../constants/http'

// @ts-ignore
const cloudName = process.env.REACT_APP_CLOUDINARY_NAME;

const uploadImage = async (configuration) => {
  const formData = new FormData();
  formData.append("file", configuration.file);
  formData.append("api_key", configuration.api_key);
  formData.append("timestamp", configuration.timestamp.toString());
  formData.append("folder", configuration.folder);
  formData.append("signature", configuration.signature);
  formData.append("public_id", configuration.public_id);

  //remove authorization token in header
  return axiosRequest
    .post(`${BASE_CLOUDINARY_URL}/${cloudName}/auto/upload`, formData, {
      transformRequest: [
        (data, headers) => {
          delete headers.Authorization;
          return data;
        },
      ],
    })
    .then((data) => {
      return {
        name: data.original_filename || "",
        format: data.format || "jpg",
        url: data.secure_url,
        width: data.width,
        height: data.height,
        size: data.bytes,
      };
    });
};

export default {
  uploadImage,
};
