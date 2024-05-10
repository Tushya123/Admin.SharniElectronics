import axios from "axios";

export const createBlogs = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/create/Blog`,
    values
  );
};

export const removeBlogs = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/remove/Blog/${_id}`
  );
};

export const listBlogs = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/Blog`
  );
};

export const updateBlogs = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/update/Blog/${_id}`,
    values
  );
};

export const getBlogs = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/get/Blog/${_id}`
  );
};

export const uploadImage = async (body) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/cms-blog/image-upload`,
    body
  );
};
