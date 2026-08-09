import axios from "axios";

export const createProductDetail = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/create/projectdetail`,
    values
  );
};

export const removeProductDetail  = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/remove/projectdetail/${_id}`
  );
};

export const listProductDetail  = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/list/projectdetail`
  );
};

export const updateProductDetail  = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/update/projectdetail/${_id}`,
    values
  );
};

export const getProductDetail= async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/getspecific/projectdetail/${_id}`
  );
};


export const uploadproductImage = async (body) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/ckeditorservicename/imageupload`,
      body
    );
  };

  export const getProductDetailByParams = async (body) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/auth/list-by-params/ServiceDetail`,
      body
    );
  };  
