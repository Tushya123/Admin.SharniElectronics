import axios from "axios";

export const createBannerImages = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/create/Banner`,
    values
  );
};

export const removeBannerImages = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/remove/Banner/${_id}`
  );
};

export const listBannerImages = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/listonly/Banner`
  );
};

export const updateBannerImages = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/update/Banner/${_id}`,
    values
  );
};

export const getBannerImages = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/get/Banner/${_id}`
  );
};
