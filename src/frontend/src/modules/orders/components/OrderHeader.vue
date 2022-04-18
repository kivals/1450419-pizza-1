<template>
  <div class="order__header">
    <div class="order__number">
      <b>Заказ #11199929</b>
    </div>

    <div class="order__sum">
      <span>Сумма заказа: 1564 ₽</span>
    </div>

    <div class="order__button">
      <button type="button" class="button button--border">Удалить</button>
    </div>
    <div class="order__button">
      <button type="button" class="button">Повторить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderHeader",
};
</script>

<style lang="scss" scoped>
.order__header {
  display: flex;
  align-items: center;

  padding: 6px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  b {
    @include b-s14-h16;
  }

  span {
    @include b-s14-h16;
  }

  button {
    padding: 8px 26px;
  }
}

.order__number {
  margin-right: auto;
}

.order__sum {
  margin-right: 16px;
}

.order__button {
  margin-left: 16px;
}
</style>
