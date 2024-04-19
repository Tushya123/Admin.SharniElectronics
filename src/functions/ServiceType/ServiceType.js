import axios from "axios";

export const createServiceType = async (values) => {
  try{
    console.log(values)
    const response =await axios.post(
      `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/create/ServiceType`,
      values
    )

  console.log("Response",response)
  return response;
  } catch (error) {
    console.error("Error in createServiceType:", error);
    throw error; // Re-throw the error to propagate it to the calling code
  }
};

export const removeServiceType = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/delete/ServiceType/${_id}`
  );
};

export const listServiceType = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/list/ServiceType`
  );
};

// export const listBookingManagement_noParams = async () => {
//   return await axios.get(
//     `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/listBookingManagement_noParams`
//   );
// };

export const updateServiceType = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/update/ServiceType/${_id}`,
    values
  );
};

export const getServiceType = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/get/ServiceType/${_id}`
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
  export const getServiceTypebyParams = async (body) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_CONTACTUS}/auth/list-by-params/ServiceType`,
      body
    );
  };  
