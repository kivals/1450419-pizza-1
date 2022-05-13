<template>
  <li class="ingredients__item">
    <AppDrag :transfer-data="transferData" :draggable="!isMaxLimit">
      <span class="filling" :class="`filling--${ingredientWithCount.type}`">{{
        ingredientWithCount.name
      }}</span>
    </AppDrag>
    <ItemCounter
      class="counter--orange ingredients__counter"
      :counter="ingredientWithCount.count"
      :max-count="countLimit"
      @change="changeCount"
    />
  </li>
</template>

<script>
import AppDrag from "@/common/components/AppDrag";
import ItemCounter from "@/common/components/ItemCounter";
import { mapActions, mapGetters } from "vuex";
import { counterLimit } from "@/common/constants";
export default {
  name: "BuilderIngredientItem",
  components: { AppDrag, ItemCounter },
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters("Builder", ["selectedIngredientsIds"]),
    ...mapGetters(["ingredientsEnum"]),
    ingredientWithCount() {
      const selectedIngredient = this.selectedIngredientsIds.find(
        (ing) => ing.id === this.ingredient.id
      );
      const count = selectedIngredient?.count || 0;
      return {
        ...this.ingredient,
        count,
      };
    },
    transferData() {
      return {
        id: this.ingredientWithCount.id,
        count: this.ingredientWithCount.count + 1,
      };
    },
    countLimit() {
      return counterLimit.MAX;
    },
    isMaxLimit() {
      return this.ingredientWithCount.count >= this.countLimit;
    },
  },
  methods: {
    ...mapActions("Builder", ["selectIngredient"]),
    changeCount(count) {
      this.selectIngredient({ id: this.ingredient.id, count });
    },
  },
};
</script>

<style scoped></style>
