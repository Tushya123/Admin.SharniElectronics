import axios from "axios";

export const createCategory = async (values) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/create/categoryMaster`,
      values
    );
  };
  
  export const removeCategory = async (_id) => {
    return await axios.delete(
      `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/remove/categoryMaster/${_id}`
    );
  };
  
  export const listCategory = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/list/categoryMaster`
    );
  };
  
  
  export const updateCategory = async (_id, values) => {
    return await axios.put(
      `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/update/categoryMaster/${_id}`,
      values
    );
  };
  
  export const getCategory = async (_id) => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/get/categoryMaster/${_id}`
    );
  };
  