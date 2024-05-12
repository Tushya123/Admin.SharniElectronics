import axios from "axios";

export const createBannerImages = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/create/Banner`,
    values
  );
};

export const removeBannerImages = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/remove/Banner/${_id}`
  );
};

export const listBannerImages = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/listonly/Banner`
  );
};

export const updateBannerImages = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/update/Banner/${_id}`,
    values
  );
};

export const getBannerImages = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/get/Banner/${_id}`
  );
};
