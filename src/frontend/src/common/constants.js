export const doughTypes = [
  {
    name: "Тонкое",
    value: "light",
  },
  {
    name: "Толстое",
    value: "large",
  },
];

export const sauceTypes = [
  {
    name: "Томатный",
    value: "tomato",
  },
  {
    name: "Сливочный",
    value: "creamy",
  },
];

export const ingredientTypes = [
  {
    name: "Грибы",
    value: "mushrooms",
  },
  {
    name: "Чеддер",
    value: "cheddar",
  },
  {
    name: "Салями",
    value: "salami",
  },
  {
    name: "Ветчина",
    value: "ham",
  },
  {
    name: "Ананас",
    value: "ananas",
  },
  {
    name: "Бекон",
    value: "bacon",
  },
  {
    name: "Лук",
    value: "onion",
  },
  {
    name: "Чили",
    value: "chile",
  },
  {
    name: "Халапеньо",
    value: "jalapeno",
  },
  {
    name: "Маслины",
    value: "olives",
  },
  {
    name: "Томаты",
    value: "tomatoes",
  },
  {
    name: "Лосось",
    value: "creamy",
  },
  {
    name: "Моцарелла",
    value: "mozzarella",
  },
  {
    name: "Пармезан",
    value: "parmesan",
  },
  {
    name: "Блю чиз",
    value: "blue_cheese",
  },
];

export const sizeTypes = [
  {
    name: "23 см",
    value: "small",
  },
  {
    name: "32 см",
    value: "normal",
  },
  {
    name: "45 см",
    value: "big",
  },
];

export const orderTypes = [
  {
    value: "self",
    description: "Заберу сам",
    auth: false,
  },
  {
    value: "address",
    description: "Новый адрес",
    auth: false,
    needAddress: true,
  },
  {
    value: "house",
    description: "Дом",
    auth: true,
    needAddress: true,
  },
];

export const DATA_TRANSFER_PAYLOAD = "drag-payload";
export const counterLimit = {
  MIN: 0,
  MAX: 3,
};

/* eslint-disable */
export const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
