<template>
  <AppDrop @drop="moveIngredient">
    <div class="content__constructor">
      <div
        class="pizza"
        :class="`pizza--foundation--${selectedDough}-${selectedSauce}`"
      >
        <div class="pizza__wrapper">
          <div
            v-for="ingredient of selectedIngredients"
            :key="ingredient.id"
            class="pizza__filling"
            :class="[
              `pizza__filling--${ingredient.type}`,
              `${ingredient.count === 2 ? 'pizza__filling--second' : ''}`,
              `${ingredient.count === 3 ? 'pizza__filling--third' : ''}`,
            ]"
          ></div>
        </div>
      </div>
    </div>
  </AppDrop>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";
export default {
  name: "BuilderPizzaView",
  components: {
    AppDrop,
  },
  props: {
    selectedIngredients: {
      type: Array,
      default: () => [],
    },
    selectedSauce: {
      type: String,
      default: "tomato",
    },
    selectedDough: {
      type: String,
      default: "light",
    },
  },
  methods: {
    moveIngredient(ingredient) {
      this.$emit("addIngredient", ingredient.id);
    },
  },
};
</script>

<style scoped></style>
