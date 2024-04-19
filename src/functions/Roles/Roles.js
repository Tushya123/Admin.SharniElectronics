import axios from "axios";

export const createRoles = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/create/role`,
    values
  );
};

export const removeRoles  = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/delete/role/${_id}`
  );
};

export const listRoles  = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/list/role`
  );
};

export const updateRoles  = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/update/role/${_id}`,
    values
  );
};

export const getRoles= async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/listbyid/role/${_id}`
  );
};


export const uploadproductImage = async (body) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/role/imageupload`,
      body
    );
  };

  export const getRoleDetailsbyParams = async (body) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_CONTACTUS}/auth/list-by-params/role`,
      body
    );
  };  
