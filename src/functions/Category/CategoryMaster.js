import axios from "axios";

export const createCategory = async (values) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/create/Category`,
      values
    );
  };
  
  export const removeCategory = async (_id) => {
    return await axios.delete(
      `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/remove/Category/${_id}`
    );
  };
  
  export const listCategory = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/Category`
    );
  };
  
  
  export const updateCategory = async (_id, values) => {
    return await axios.put(
      `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/update/Category/${_id}`,
      values
    );
  };
  
  export const getCategory = async (_id) => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/getbyid/Category/${_id}`
    );
  };
  