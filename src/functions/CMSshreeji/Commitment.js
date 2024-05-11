import axios from "axios";

export const createCommitment = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/create/Commitment`,
    values
  );
};

export const removeCommitment = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/remove/Commitment/${_id}`
  );
};

export const listCommitment = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/Commitment`
  );
};

export const updateCommitment = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/update/Commitment/${_id}`,
    values
  );
};

export const getCommitment = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/get/Commitment/${_id}`
  );
};
