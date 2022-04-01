<template>
  <div class="product">
    <img
      src="@/assets/img/product.svg"
      class="product__img"
      width="56"
      height="56"
      :alt="pizza.name"
    />
    <div class="product__text">
      <h2>{{ pizza.name }}</h2>
      <ul>
        <li>{{ doughInfo }}</li>
        <li>Соус: {{ sauceNamesEnum[pizza.sauce] }}</li>
        <li>
          Начинка:
          {{ ingredientsInfo }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CartPizzaItem",
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters("Builder", [
      "sizeNamesEnum",
      "sauceNamesEnum",
      "ingredientNamesEnum",
    ]),
    doughInfo() {
      const sizeName = this.sizeNamesEnum[this.pizza.size];
      const doughDescription =
        this.pizza.dough === 1 ? "на тонком тесте" : "на толстом тесте";

      return `${sizeName}, ${doughDescription}`;
    },
    ingredientsInfo() {
      return this.pizza.ingredients
        .map((ing) => this.ingredientNamesEnum[ing.id])
        .join(", ");
    },
  },
};
</script>

<style scoped></style>
