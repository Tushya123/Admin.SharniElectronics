import axios from "axios";

export const createContactInquiry = async (values) => {
  try{
    console.log(values)
    const response =await axios.post(
      `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/create/contactinquiry`,
      values
    )

  console.log("Response",response)
  return response;
  } catch (error) {
    console.error("Error in createSubscribers:", error);
    throw error; // Re-throw the error to propagate it to the calling code
  }
};

export const removeContactInquiry = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/delete/contactinquiry/${_id}`
  );
};

export const listContactInquiry = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/contactinquiry`
  );
};



export const updateContactInquiry = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/update/contactinquiry/${_id}`,
    values
  );
};


export const getSpecificContactInquiry = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/getbyid/contactinquiry/${_id}`
  );
};


