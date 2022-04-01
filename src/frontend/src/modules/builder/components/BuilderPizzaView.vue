<template>
  <AppDrop @drop="selectIngredient">
    <div class="content__constructor">
      <div
        class="pizza"
        :class="`pizza--foundation--${this.selectedDough.type}-${this.selectedSauce.type}`"
      >
        <div class="pizza__wrapper">
          <template v-for="ingredient of this.selectedIngredients">
            <div
              :key="ingredient.id"
              class="pizza__filling"
              :class="`pizza__filling--${ingredient.type}`"
            ></div>
            <div
              v-if="ingredient.count === 2"
              :key="`${ingredient.id}-second`"
              class="pizza__filling pizza__filling--second"
              :class="`pizza__filling--${ingredient.type}`"
            ></div>
            <div
              v-if="ingredient.count === 3"
              :key="`${ingredient.id}-third`"
              class="pizza__filling pizza__filling--third"
              :class="`pizza__filling--${ingredient.type}`"
            ></div>
          </template>
        </div>
      </div>
    </div>
  </AppDrop>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "BuilderPizzaView",
  components: {
    AppDrop,
  },
  computed: {
    ...mapGetters("Builder", [
      "selectedDough",
      "selectedSauce",
      "selectedIngredients",
    ]),
  },
  methods: {
    ...mapActions("Builder", ["selectIngredient"]),
  },
};
</script>

<style scoped></style>
