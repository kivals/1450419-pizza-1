<template>
  <p class="order__address">
    Адрес доставки: Тест (или если адрес новый - писать целиком)
  </p>
</template>

<script>
export default {
  name: "OrderAddress",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";

.order__address {
  @include l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba($green-500, 0.1);
}
</style>
