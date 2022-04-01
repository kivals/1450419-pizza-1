<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <BuilderIngredientItem
        v-for="ingredient in ingredients"
        :key="ingredient.id"
        :ingredient="ingredient"
      />
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BuilderIngredientItem from "@/modules/builder/components/BuilderIngredientItem";

export default {
  name: "BuilderIngredientList",
  components: {
    BuilderIngredientItem,
  },
  computed: {
    ...mapGetters("Builder", ["ingredients"]),
  },
};
</script>

<style scoped></style>
