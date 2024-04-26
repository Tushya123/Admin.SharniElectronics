import axios from "axios";

export const createOtherProducts = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/create/otherproducts`,
    values
  );
};

export const removeOtherProducts  = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/remove/otherproducts/${_id}`
  );
};

export const listOtherProducts  = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/otherproducts`
  );
};

export const updateOtherProducts  = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/update/otherproducts/${_id}`,
    values
  );
};

export const getOtherProducts= async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/listbyid/otherproducts/${_id}`
  );
};


export const uploadproductImage = async (body) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/otherproducts/imageupload`,
      body
    );
  };

  export const getOtherProductsDetailsbyParams = async (body) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/listotherproductsbyparam`,
      body
    );
  };  
