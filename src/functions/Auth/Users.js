import axios from "axios";

export const createUsers = async (values) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/add/addUser`,
      values
    );
  };
  
  export const removeUsers = async (_id) => {
    return await axios.delete(
      `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/delete/deleteuser/${_id}`
    );
  };
  
  export const listUsers = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_CONTACTUS}/api/listonly/listUser`
    );
  };
  
  export const updateUsers = async (_id, values) => {
    return await axios.put(
      `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/update/user/${_id}`,
      values
    );
  };
  
  export const getUsers = async (_id) => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/get/user/${_id}`
    );
  };
  