import axios from "axios";

export const createProductGroup = async (values) => {
  try{
    console.log(values)
    const response =await axios.post(
      `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/areatype`,
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
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/remove/areatype/${_id}`
  );
};

export const listProductGroup = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/areatype`
  );
};

// export const listBookingManagement_noParams = async () => {
//   return await axios.get(
//     `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/listBookingManagement_noParams`
//   );
// };

export const updateProductGroup = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/update/areatype/${_id}`,
    values
  );
};

export const getProductGroup = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/get/areatype/${_id}`
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
      `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/listarea`,
      body
    );
  };  
