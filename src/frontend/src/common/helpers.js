import {
  doughTypes,
  sauceTypes,
  ingredientTypes,
  sizeTypes,
  emailRegex,
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

export const validationRules = {
  isNotEmpty: {
    rule: (value) => !!value?.trim(),
    message: "Поле не заполнено",
  },
  required: {
    rule: (value) => !!value?.trim(),
    message: "Поле обязательно для заполнения",
  },
  email: {
    rule: (value) =>
      value ? emailRegex.test(String(value).toLowerCase()) : true,
    message: "Электроная почта имеет неверный формат",
  },
};

const normalizeWithType = (source, types) => ({
  ...source,
  type: types.find((t) => t.name === source.name).value,
});

const getFileNameFromPath = (path) => {
  return path.split("/").pop();
};
