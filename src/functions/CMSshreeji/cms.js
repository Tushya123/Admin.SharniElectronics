import axios from "axios";

export const getCmsContactUsDetailById = async (_id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/cms/get/contactusdetail/${_id}`
    );
    return response;
  } catch (error) {
    console.error("Error in getCmsContactUsDetailById:", error);
    throw error;
  }
};

export const getCmsAboutUsById = async (_id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/get/cms/${_id}`
    );
    return response;
  } catch (error) {
    console.error("Error in getCmsAboutUsById:", error);
    throw error;
  }
};

export const editCmsContactUsDetailContent = async (values) => {
  try {
    const { _id } = values;
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/cms/edit/contactusdetail/${_id}`,
      values
    );
    return response;
  } catch (error) {
    console.error("Error in editCmsContactUsDetailContent:", error);
    throw error;
  }
};

export const editCmsAboutUsContent = async (values) => {
  try {
    const { _id } = values;
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/update/cms/${_id}`,
      values
    );
    return response;
  } catch (error) {
    console.error("Error in editCmsAboutUsContent:", error);
    throw error;
  }
};
export const uploadproductImageAboutUs = async (body) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/ckeditorAboutUs/imageupload`,
      body
    );
  };