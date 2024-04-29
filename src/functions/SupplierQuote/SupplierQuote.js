import axios from "axios";

export const listSupplierQuote = async () => {
    return await axios.get(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/supplierquote`);
};

export const createSupplierQuote = async (values) => {
    return await axios.post(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/create/supplierquote`, values);
};

export const updateSupplierQuote = async (_id, values) => {
  return await axios.put(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/update/supplierquote/${_id}`, values);
};

// export const getSupplierQuote = async (_id) => {
//   return await axios.get(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/getbyid/supplier/${_id}`);
// };
// export const removeSupplierQuote = async (_id) => {
//   return await axios.delete(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/delete/supplier/${_id}`);
// };