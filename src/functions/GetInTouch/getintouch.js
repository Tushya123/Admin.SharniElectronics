import axios from "axios";

export const createGetInTouch = async (values) => {
  try{
    console.log(values)
    const response =await axios.post(
      `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/create/getintouch`,
      values
    )

  console.log("Response",response)
  return response;
  } catch (error) {
    console.error("Error in createSubscribers:", error);
    throw error; // Re-throw the error to propagate it to the calling code
  }
};

export const removeGetinTouch = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/delete/getintouch/${_id}`
  );
};

export const listgetinTouch = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/list/getintouch`
  );
};

// export const listBookingManagement_noParams = async () => {
//   return await axios.get(
//     `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/listBookingManagement_noParams`
//   );
// };

export const updateGetInTouch = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/update/getintouch/${_id}`,
    values
  );
};


export const getSpecificGetInTouch = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/getbyid/getintouch/${_id}`
  );
};

// export const uploadImage = async (body) => {
//   return await axios.post(
//     `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/servicemanagement/image-upload`,
//     body
//   );
// };
//   export const getServiceTypebyParams = async (body) => {
//     return await axios.post(
//       `${process.env.REACT_APP_API_URL_CONTACTUS}/auth/list-by-params/ServiceType`,
//       body
//     );
//   };  
