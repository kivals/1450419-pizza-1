import JwtService from "@/services/jwt.service";
import axios from "@/plugins/axios";

const setAuthHeader = () => {
  const token = JwtService.getToken();
  axios.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : "";
};

const login = async (params) => {
  const { data } = await axios.post("login", params);
  return data;
};

const logout = async () => {
  const { data } = await axios.delete("logout");
  return data;
};

const getMe = async () => {
  const { data } = await axios.get("whoAmI");
  return data;
};

export default {
  setAuthHeader,
  login,
  logout,
  getMe,
};
