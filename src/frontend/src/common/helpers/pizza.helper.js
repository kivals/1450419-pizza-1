export const calculatePizzaPrice = (
  store,
  { doughId, sauceId, sizeId, ingredients }
) => {
  const sizesEnum = store.getters["sizeEnum"];
  const doughEnum = store.getters["doughEnum"];
  const sauceEnum = store.getters["sauceEnum"];
  const ingredientsEnum = store.getters["ingredientsEnum"];

  const doughPrice = Number(doughEnum[doughId].price);
  const saucePrice = Number(sauceEnum[sauceId].price);
  const sizeMultiplier = Number(sizesEnum[sizeId].multiplier);
  const ingredientsPrice = ingredients.reduce(
    (sum, ing) =>
      sum + Number(ingredientsEnum[ing.id].price) * Number(ing.count),
    0
  );
  return (saucePrice + ingredientsPrice + doughPrice) * sizeMultiplier;
};

export const calculateOrderPrice = (pizzas, misc, store) => {
  const pizzasPrice = pizzas.reduce((sum, pizza) => {
    const pizzaPrice = pizza.price || calculatePizzaPrice(store, pizza);

    return sum + pizzaPrice * Number(pizza.count);
  }, 0);

  const miscPrice = misc.reduce((sum, misc) => {
    const miscEnum = store.getters["miscEnum"];

    const price = Number(miscEnum[misc.id].price);
    const count = Number(misc.count);
    return sum + price * count;
  }, 0);

  return pizzasPrice + miscPrice;
};
