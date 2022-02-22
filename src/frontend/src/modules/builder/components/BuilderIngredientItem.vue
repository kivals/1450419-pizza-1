<template>
  <li class="ingredients__item">
    <AppDrag :transfer-data="ingredient" :draggable="isAllowAdd">
      <span class="filling" :class="`filling--${ingredient.type}`">{{
        ingredient.name
      }}</span>
    </AppDrag>
    <div class="counter counter--orange ingredients__counter">
      <button
        type="button"
        class="counter__button counter__button--minus"
        @click="$emit('removeIngredient')"
        :disabled="ingredient.count === 0"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        readonly
        type="text"
        name="counter"
        class="counter__input"
        :value="ingredient.count"
      />
      <button
        type="button"
        class="counter__button counter__button--plus"
        @click="$emit('addIngredient')"
        :disabled="!isAllowAdd"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>
  </li>
</template>

<script>
import AppDrag from "@/common/components/AppDrag";
import { MAX_INGREDIENT_COUNT } from "@/common/constants";
export default {
  name: "BuilderIngredientItem",
  components: { AppDrag },
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isAllowAdd() {
      return this.ingredient.count < MAX_INGREDIENT_COUNT;
    },
  },
};
</script>

<style scoped></style>
