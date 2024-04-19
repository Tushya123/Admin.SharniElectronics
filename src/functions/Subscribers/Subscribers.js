import axios from "axios";

export const createSubscribers = async (values) => {
  try{
    console.log(values)
    const response =await axios.post(
      `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/create/subscribe`,
      values
    )

  console.log("Response",response)
  return response;
  } catch (error) {
    console.error("Error in createSubscribers:", error);
    throw error; // Re-throw the error to propagate it to the calling code
  }
};

export const removeSubscribers = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/delete/subscribe/${_id}`
  );
};

export const listSubscriber = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/list/subscribe`
  );
};

// export const listBookingManagement_noParams = async () => {
//   return await axios.get(
//     `${process.env.REACT_APP_API_URL_SHELDON}/api/auth/get/listBookingManagement_noParams`
//   );
// };

export const updateSubscriber = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/update/subscribe/${_id}`,
    values
  );
};


export const getSpecificSubscriber = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/getbyid/subscriber/${_id}`
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
