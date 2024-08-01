import axios from "axios";

export const createProductGroup = async (values) => {
  try{
    console.log(values)
    const response =await axios.post(
      `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/servicetype`,
      values
    )

  console.log("Response",response)
  return response;
  } catch (error) {
    console.error("Error in createServiceType:", error);
    throw error; // Re-throw the error to propagate it to the calling code
  }
};

export const removeProductGroup = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/remove/servicetype/${_id}`
  );
};

export const listProductGroup = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/servicetype`
  );
};

// export const listBookingManagement_noParams = async () => {
//   return await axios.get(
//     `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/listBookingManagement_noParams`
//   );
// };

export const updateProductGroup = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/update/servicetype/${_id}`,
    values
  );
};

export const getProductGroup = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/get/servicetype/${_id}`
  );
};
// export const getBookingReport = async (id) => {
//   return await axios.get(
//     `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/report/${id}`
//   );
// };

// export const uploadImage = async (body) => {
//   return await axios.post(
//     `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/servicemanagement/image-upload`,
//     body
//   );
// };
  export const getProductGroupbyParams = async (body) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/listservicetype`,
      body
    );
  };  
