<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <BuilderSauceSelector />

        <BuilderIngredientList />
      </div>
    </div>
  </div>
</template>

<script>
import BuilderSauceSelector from "@/modules/builder/components/BuilderSauceSelector";
import BuilderIngredientList from "@/modules/builder/components/BuilderIngredientList";

export default {
  name: "BuilderIngredientsSelector",
  components: { BuilderSauceSelector, BuilderIngredientList },
};
</script>

<style scoped></style>
