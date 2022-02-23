<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <label
            v-for="sauce in sauces"
            :key="sauce.id"
            class="radio ingredients__input"
          >
            <input
              type="radio"
              name="sauce"
              :value="sauce.type"
              :checked="sauce.id === selectedSauce.id"
              @click="$emit('selectSauce', sauce.id)"
            />
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <BuilderIngredientItem
              v-for="ingredient in normalizeIngredients"
              :key="ingredient.id"
              :ingredient="ingredient"
              @addIngredient="$emit('addIngredient', ingredient.id)"
              @removeIngredient="$emit('removeIngredient', ingredient.id)"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BuilderIngredientItem from "@/modules/builder/components/BuilderIngredientItem";
export default {
  name: "BuilderIngredientsSelector",
  components: { BuilderIngredientItem },
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
    selectedIngredients: {
      type: Array,
      default: () => [],
    },
    sauces: {
      type: Array,
      required: true,
    },
    selectedSauce: {
      type: Object,
      required: true,
    },
  },
  computed: {
    normalizeIngredients() {
      return this.ingredients.map((ing) => ({
        ...ing,
        count:
          this.selectedIngredients.find((selIng) => selIng.id === ing.id)
            ?.count || 0,
      }));
    },
  },
};
</script>

<style scoped></style>
