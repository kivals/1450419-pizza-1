<template>
  <div>
    <ul class="cart-list sheet">
      <li v-for="pizza in cartPizzas" :key="pizza.id" class="cart-list__item">
        <AppPizzaItem
          :name="pizza.name"
          :size-id="pizza.sizeId"
          :sauce-id="pizza.sauceId"
          :dough-id="pizza.doughId"
          :ingredients="pizza.ingredients"
          class="cart-list__product"
        />

        <ItemCounter
          class="cart-list__counter"
          :counter="pizza.count"
          color-theme="orange"
          @change="changePizzaCount({ id: pizza.id, count: $event })"
        />
        <div class="cart-list__price">
          <b>{{ pizza.price * pizza.count }} ₽</b>
        </div>

        <div class="cart-list__button">
          <button
            type="button"
            class="cart-list__edit"
            @click="goToBuilder(pizza)"
          >
            Изменить
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ItemCounter from "@/common/components/ItemCounter";
import AppPizzaItem from "@/common/components/AppPizzaItem";

export default {
  name: "CartList",
  components: { ItemCounter, AppPizzaItem },
  computed: {
    ...mapState("Cart", {
      cartPizzas: "clientPizzas",
    }),
  },
  methods: {
    ...mapActions("Cart", ["changePizzaCount"]),
    ...mapActions("Builder", ["initSelectedPizza"]),
    goToBuilder(pizza) {
      this.initSelectedPizza(pizza);
      this.$router.push("/");
    },
  },
};
</script>

<style scoped></style>
