import {
  doughTypes,
  sauceTypes,
  ingredientTypes,
  sizeTypes,
} from "@/common/constants";

export const normalizeDough = (dough) => normalizeWithType(dough, doughTypes);

export const normalizeSauce = (sauce) => normalizeWithType(sauce, sauceTypes);

export const normalizeIngredient = (ingredient) =>
  normalizeWithType(ingredient, ingredientTypes);

export const normalizeSize = (size) => normalizeWithType(size, sizeTypes);

export const normalizeMisc = (misc) => ({
  ...misc,
  image: getFileNameFromPath(misc.image),
  count: 0,
});

const normalizeWithType = (source, types) => ({
  ...source,
  type: types.find((t) => t.name === source.name).value,
});

const getFileNameFromPath = (path) => {
  return path.split("/").pop();
};
