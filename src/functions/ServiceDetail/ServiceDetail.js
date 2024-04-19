import axios from "axios";

export const createServiceDetail = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/create/ServiceDetail`,
    values
  );
};

export const removeServiceDetail  = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/delete/ServiceDetail/${_id}`
  );
};

export const listServiceDetail  = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/list/ServiceDetail`
  );
};

export const updateServiceDetail  = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/update/ServiceDetail/${_id}`,
    values
  );
};

export const getServiceDetail= async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/get/ServiceDetail/${_id}`
  );
};


export const uploadproductImage = async (body) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/ckeditorservicename/imageupload`,
      body
    );
  };

  export const getServiceDetailByParams = async (body) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_CONTACTUS}/auth/list-by-params/ServiceDetail`,
      body
    );
  };  
