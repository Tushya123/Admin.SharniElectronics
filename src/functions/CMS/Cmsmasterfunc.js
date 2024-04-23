import axios from "axios";

export const createCms = async (values) => {
  return await axios.post(

    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/create/cms`,

    values
  );
};

export const removecms = async (id) => {
  return await axios.delete(

    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/remove/cms/${id}`

  );
};

// export const listBlogs = async () => {
//   return await axios.get(
//     `${process.env.REACT_APP_API_URL_ECOSOCH}/api/auth/list/blogs`
//   );
// };

export const updatecms = async (id, values) => {
  return await axios.put(

    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/update/cms/${id}`,

    values
  );
};

export const getcms = async (id) => {
  return await axios.get(

    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/get/cms/${id}`

  );
};

export const uploadImagetype = async (body) => {
  return await axios.post(

    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/cmsckkkkk/imageupload`,

    body
  );
};
