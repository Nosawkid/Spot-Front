import axios from "axios";
const adminUrl = "/api/admin";
const userUrl = "/api/users";
const loginUrl = "/api/login";

const getProfessions = async () => {
  const res = await axios.get(`${adminUrl}/professions`);
  console.log(res);
  return res.data;
};

const registerUser = async (user) => {
  const res = await axios.post(userUrl, user);
  return res.data;
};

const loginUser = async (credentials) => {
  const res = await axios.post(loginUrl, credentials);
  return res.data;
};

export default { getProfessions, registerUser, loginUser };
