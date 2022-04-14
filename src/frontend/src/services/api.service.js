import axios from "@/plugins/axios";
import {
  normalizeDough,
  normalizeIngredient,
  normalizeMisc,
  normalizeSauce,
  normalizeSize,
} from "@/common/helpers/normalize.helper";
import JwtService from "./jwt.service";

const fetchDough = async () => {
  const { data } = await axios.get("dough");
  return data.map(normalizeDough);
};

const fetchSizes = async () => {
  const { data } = await axios.get("sizes");
  // Формируем необходимую структуру объекта SIZE и сортируем по множетелю цены
  return data.map(normalizeSize).sort((a, b) => a.multiplier - b.multiplier);
};

const fetchSauces = async () => {
  const { data } = await axios.get("sauces");
  return data.map(normalizeSauce);
};

const fetchIngredients = async () => {
  const { data } = await axios.get("ingredients");
  return data.map(normalizeIngredient);
};

const fetchMisc = async () => {
  const { data } = await axios.get("misc");
  return data.map(normalizeMisc);
};

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

const fetchOrders = async () => {
  const { data } = await axios.get("orders");
  return data;
};

export default {
  fetchSizes,
  fetchIngredients,
  fetchDough,
  fetchSauces,
  fetchMisc,
  fetchOrders,
  setAuthHeader,
  login,
  logout,
  getMe,
};
