import axios from "@/plugins/axios";
import {
  normalizeDough,
  normalizeIngredient,
  normalizeMisc,
  normalizeSauce,
  normalizeSize,
} from "@/common/helpers";

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

export default {
  fetchSizes,
  fetchIngredients,
  fetchDough,
  fetchSauces,
  fetchMisc,
};
