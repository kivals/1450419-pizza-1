<template>
  <div class="counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="degrease"
      :disabled="isMinLimit"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      readonly
      type="text"
      name="counter"
      class="counter__input"
      :value="counter"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :class="themeClass"
      :disabled="isMaxLimit"
      @click="increase"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import { counterLimit } from "@/common/constants";

export default {
  name: "ItemCounter",
  props: {
    counter: {
      type: Number,
      default: 0,
    },
    colorTheme: {
      type: String,
      required: false,
    },
    maxCount: {
      type: Number,
      required: false,
    },
  },
  computed: {
    isMaxLimit() {
      return this.maxCount ? this.counter >= this.maxCount : false;
    },
    isMinLimit() {
      return this.counter <= counterLimit.MIN;
    },
    themeClass() {
      return this.colorTheme ? `counter__button--${this.colorTheme}` : "";
    },
  },
  methods: {
    changeCount(digit) {
      this.$emit("change", digit);
    },
    increase() {
      if (this.isMaxLimit) return;
      this.changeCount(this.counter + 1);
    },
    degrease() {
      if (this.isMinLimit) return;
      this.changeCount(this.counter - 1);
    },
  },
};
</script>

<style scoped></style>
