<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <AppTitle size="big">Конструктор пиццы</AppTitle>

      <div v-if="dough" class="content__dough">
        <BuilderDoughSelector />
      </div>

      <div class="content__diameter">
        <BuilderSizeSelector />
      </div>
      <div class="content__ingredients">
        <BuilderIngredientsSelector />
      </div>

      <div class="content__pizza">
        <label class="input">
          <span class="visually-hidden">Название пиццы</span>
          <input
            type="text"
            name="pizza_name"
            placeholder="Введите название пиццы"
            :value="pizzaName"
            @input="changePizzaName($event.target.value)"
          />
        </label>

        <BuilderPizzaView />

        <div class="content__result">
          <BuilderPriceCounter :total-price="totalPrice" />

          <button
            type="button"
            class="button"
            :disabled="!allowToCook"
            @click="moveToCart"
          >
            Готовьте!
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import { mapActions, mapGetters, mapState } from "vuex";
import AppTitle from "@/common/components/AppTitle";

export default {
  name: "Index",
  components: {
    AppTitle,
    BuilderPriceCounter,
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
  },
  computed: {
    ...mapGetters("Builder", [
      "pizzaName",
      "hasIngredients",
      "hasPizzaName",
      "totalPrice",
      "dough",
    ]),
    ...mapState("Builder", ["selectedPizza"]),
    allowToCook() {
      return this.hasPizzaName && this.hasIngredients;
    },
  },
  methods: {
    ...mapActions("Builder", ["changePizzaName"]),
    ...mapActions("Cart", ["addToCart"]),
    moveToCart() {
      this.addToCart({
        ...this.selectedPizza,
        price: this.totalPrice,
      });
    },
  },
};
</script>

<style scoped></style>
