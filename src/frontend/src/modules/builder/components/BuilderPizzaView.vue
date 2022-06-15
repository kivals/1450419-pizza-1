<template>
  <AppDrop @drop="selectIngredient">
    <div class="content__constructor">
      <div
        class="pizza"
        :class="`pizza--foundation--${selectedDough.type}-${selectedSauce.type}`"
      >
        <div class="pizza__wrapper">
          <transition-group name="drop">
            <div v-for="ingredient of selectedIngredients" :key="ingredient.id">
              <div
                :key="ingredient.id"
                class="pizza__filling"
                :class="`pizza__filling--${ingredient.type}`"
              ></div>
              <transition name="drop2">
                <div
                  v-if="ingredient.count === 2"
                  :key="`${ingredient.id}-second`"
                  class="pizza__filling pizza__filling--second"
                  :class="`pizza__filling--${ingredient.type}`"
                ></div>
              </transition>
              <transition name="drop2">
                <div
                  v-if="ingredient.count === 3"
                  :key="`${ingredient.id}-third`"
                  class="pizza__filling pizza__filling--third"
                  :class="`pizza__filling--${ingredient.type}`"
                ></div>
              </transition>
            </div>
          </transition-group>
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

<style lang="scss" scoped>
.drop-enter-active {
  transition: all 1s ease;
}
.drop-enter {
  opacity: 0;
}
.drop-enter-to {
  opacity: 1;
}

.drop2-enter-active {
  transition: all 1s ease;
}
.drop2-enter {
  transform: rotate(115deg);
}
.drop2-enter-to {
  opacity: 1;
}
</style>
