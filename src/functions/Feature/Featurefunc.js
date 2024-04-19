import axios from "axios";

export const createFeature = async (values) => {
  return await axios.post(

    `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/create/feature`,

    values
  );
};

export const removeFeature = async (_id) => {
  return await axios.delete(

    `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/remove/feature/${_id}`

  );
};



export const updateFeature = async (_id, values) => {
  return await axios.put(

    `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/update/feature/${_id}`,

    values
  );
};

export const getFeature = async (_id) => {
  return await axios.get(

    `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/get/feature/${_id}`

  );
};
