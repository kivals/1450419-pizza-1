import {
  fetchDough,
  fetchIngredients,
  fetchSauces,
  fetchSizes,
} from "@/services/api.service";

export default function (store) {
  store.$api = {
    fetchDough,
    fetchSizes,
    fetchSauces,
    fetchIngredients,
  };
}
