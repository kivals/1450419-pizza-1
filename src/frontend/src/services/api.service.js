import axios from "@/plugins/axios";
import {
  normalizeDough,
  normalizeIngredient,
  normalizeSauce,
  normalizeSize,
} from "@/common/helpers";

export const fetchDough = async () => {
  const { data } = await axios.get("dough");
  return data.map(normalizeDough);
};

export const fetchSizes = async () => {
  const { data } = await axios.get("sizes");
  // Формируем необходимую структуру объекта SIZE и сортируем по множетелю цены
  return data.map(normalizeSize).sort((a, b) => a.multiplier - b.multiplier);
};

export const fetchSauces = async () => {
  const { data } = await axios.get("sauces");
  return data.map(normalizeSauce);
};

export const fetchIngredients = async () => {
  const { data } = await axios.get("ingredients");
  return data.map(normalizeIngredient);
};
