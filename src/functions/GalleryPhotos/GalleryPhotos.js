import axios from "axios";

export const createGalleryPhotos = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/create/GalleryPhoto`,
    values
  );
};

export const removeGalleryPhotos  = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/remove/GalleryPhoto/${_id}`
  );
};

export const listGalleryPhotos  = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/list/GalleryPhoto"`
  );
};

export const updateGalleryPhotos = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/update/GalleryPhoto/${_id}`,
    values
  );
};

export const getGalleryPhotos= async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/get/GalleryPhoto/${_id}`
  );
};


// export const uploadproductImage = async (body) => {
//     return await axios.post(
//       `${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/ckeditorservicename/imageupload`,
//       body
//     );
//   };

  export const getGalleryPhotosByParams = async (body) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_SHARNI_ELECTRONICS}/api/auth/list-by-params/GalleryPhoto`,
      body
    );
  };  
