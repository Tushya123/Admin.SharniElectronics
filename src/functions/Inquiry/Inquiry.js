import axios from "axios";

export const listinquiry = async () => {
    return await axios.get(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/inquiry`);
};

export const createinquiry = async (values) => {
    return await axios.post(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/create/inquiry`, values);
};

export const updateinquiry = async (_id, values) => {
  return await axios.put(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/update/inquiry/${_id}`, values);
};

export const getinquiry = async (_id) => {
  return await axios.get(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/getbyid/inquiry/${_id}`);
};
export const removeinquiry = async (_id) => {
  return await axios.delete(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/delete/inquiry/${_id}`);
};