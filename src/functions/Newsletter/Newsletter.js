import axios from "axios";

export const createNewsletter = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/create/Newsletter`,
    values
  );
};

export const removeNewsletter = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/remove/Newsletter/${_id}`
  );
};

export const listNewsletter = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/Newsletter`
  );
};

export const updateNewsletter = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/update/Newsletter/${_id}`,
    values
  );
};

export const getNewsletter = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/get/Newsletter/${_id}`
  );
};
