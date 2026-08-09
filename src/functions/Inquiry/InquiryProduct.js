import axios from "axios";

export const listInquiryProduct = async () => {
    return await axios.get(`${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/list/InquiryProduct`);
};

export const createInquiryProduct = async (values) => {
    return await axios.post(`${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/create/InquiryProduct`, values);
};

export const updateInquiryProduct = async (_id, values) => {
  return await axios.put(`${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/update/InquiryProduct/${_id}`, values);
};

export const getInquiryProduct = async (_id) => {
  return await axios.get(`${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/getbyid/InquiryProduct/${_id}`);
};
export const removeInquiryProduct = async (_id) => {
  return await axios.delete(`${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/delete/InquiryProduct/${_id}`);
};