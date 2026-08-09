import axios from "axios";

export const createBlogs = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/create/Blog`,
    values
  );
};

export const removeBlogs = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/remove/Blog/${_id}`
  );
};

export const listBlogs = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/list/Blog`
  );
};

export const updateBlogs = async (_id, values) => {
  console.log(_id)
  console.log(values)
  return await axios.put(
    `${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/update/Blog/${_id}`,
    values
  );
};

export const getBlogs = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/get/Blog/${_id}`
  );
};

export const uploadImage = async (body) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/cms-blog/image-upload`,
    body
  );
};
