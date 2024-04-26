import axios from "axios";

export const listProductDetails = async () => {
    return await axios.get(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/supplier`);
};

export const createProductDetails = async (values) => {
    return await axios.post(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/create/supplier`, values);
};

export const updateProductDetails = async (_id, values) => {
  return await axios.put(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/update/supplier/${_id}`, values);
};

export const getProductDetails = async (_id) => {
  return await axios.get(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/getbyid/supplier/${_id}`);
};
export const removeProductDetails = async (_id) => {
  return await axios.delete(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/delete/supplier/${_id}`);
};