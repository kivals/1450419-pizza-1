<template>
  <div class="content__result">
    <p>Итого: {{ this.totalPrice }} ₽</p>
    <button type="button" class="button" :disabled="disabled">Готовьте!</button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    totalPrice: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped></style>
