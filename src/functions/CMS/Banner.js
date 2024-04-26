import axios from "axios";

export const createBannerImages = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/create/banner-images`,
    values
  );
};

export const removeBannerImages = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/remove/banner-images/${_id}`
  );
};

export const listBannerImages = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/banner-images`
  );
};

export const updateBannerImages = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/update/banner-images/${_id}`,
    values
  );
};

export const getBannerImages = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/get/banner-images/${_id}`
  );
};
