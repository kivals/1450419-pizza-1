<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>

      <BuilderDoughSelector
        :dough-list="dough"
        :selected-dough="selectedData.dough"
        @select="selectDough"
      />

      <BuilderSizeSelector
        :sizes="sizes"
        :selected-size="selectedData.size"
        @select="selectSize"
      />

      <BuilderIngredientsSelector
        :ingredients="ingredients"
        :selected-ingredients="selectedData.ingredients"
        :sauces="sauces"
        :selected-sauce="selectedData.sauce"
        @selectSauce="selectSauce"
        @addIngredient="addIngredient"
        @removeIngredient="removeIngredient"
      />

      <div class="content__pizza">
        <label class="input">
          <span class="visually-hidden">Название пиццы</span>
          <input
            type="text"
            name="pizza_name"
            placeholder="Введите название пиццы"
            v-model="selectedData.name"
          />
        </label>

        <BuilderPizzaView
          :selected-sauce="selectedData.sauce.type"
          :selected-dough="selectedData.dough.type"
          :selected-ingredients="selectedData.ingredients"
          @addIngredient="addIngredient"
        />

        <BuilderPriceCounter :totalPrice="totalPrice" :disabled="!isToCook" />
      </div>
    </div>
  </form>
</template>

<script>
import pizza from "@/static/pizza.json";
import {
  normalizeDough,
  normalizeIngredient,
  normalizeSauce,
  normalizeSize,
} from "@/common/helpers";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import { MAX_INGREDIENT_COUNT } from "@/common/constants";

export default {
  name: "Index",
  components: {
    BuilderPriceCounter,
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
  },
  data() {
    return {
      dough: pizza.dough.map((dough) => normalizeDough(dough)),
      sauces: pizza.sauces.map((sauce) => normalizeSauce(sauce)),
      ingredients: pizza.ingredients.map((ingredient) =>
        normalizeIngredient(ingredient)
      ),
      sizes: pizza.sizes.map((size) => normalizeSize(size)),
      selectedData: {
        name: "",
        dough: {},
        size: {},
        ingredients: [],
        sauce: {},
      },
    };
  },
  created() {
    this.selectedData.dough = this.dough[0];
    this.selectedData.size = this.sizes[0];
    this.selectedData.sauce = this.sauces[0];
  },
  computed: {
    isToCook() {
      return !!(
        this.selectedData.name !== "" && this.selectedData.ingredients.length
      );
    },
    totalPrice() {
      const doughPrice = this.selectedData.dough?.price || 0;
      const saucePrice = this.selectedData.sauce?.price || 0;
      const ingredientsPrice = this.selectedData.ingredients.reduce(
        (sum, ingredient) =>
          Number(sum) + Number(ingredient.price * ingredient.count),
        0
      );
      const sizeMultiplier = this.selectedData.size?.multiplier || 1;

      return (
        (Number(doughPrice) + Number(saucePrice) + ingredientsPrice) *
        Number(sizeMultiplier)
      );
    },
  },
  methods: {
    selectDough(id) {
      this.selectedData.dough = this.dough.find((d) => d.id === id);
    },
    selectSize(id) {
      this.selectedData.size = this.sizes.find((s) => s.id === id);
    },
    selectSauce(id) {
      this.selectedData.sauce = this.sauces.find((s) => s.id === id);
    },
    addIngredient(id) {
      const exist = this.selectedData.ingredients.find((ing) => ing.id === id);
      if (exist && exist.count < MAX_INGREDIENT_COUNT) {
        exist.count++;
        return;
      }

      const newChooseIngredient = this.ingredients.find((ing) => ing.id === id);
      this.selectedData.ingredients.push({
        ...newChooseIngredient,
        count: 1,
      });
    },
    removeIngredient(id) {
      const deleted = this.selectedData.ingredients.find(
        (ing) => ing.id === id
      );
      if (deleted.count === 1) {
        this.selectedData.ingredients = this.selectedData.ingredients.filter(
          (ing) => ing.id !== deleted.id
        );
      } else {
        deleted.count--;
      }
    },
  },
};
</script>

<style scoped></style>
