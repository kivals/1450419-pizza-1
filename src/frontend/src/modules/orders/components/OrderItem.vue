<template>
  <section class="order">
    <OrderHeader />

    <ul class="order__list">
      <li class="order__item">
        <OrderPizzaItem />

        <p class="order__price">782 ₽</p>
      </li>
      <!--      <li class="order__item">
        <div class="product">
          <img
            src="@/assets/img/product.svg"
            class="product__img"
            width="56"
            height="56"
            alt="Капричоза"
          />
          <div class="product__text">
            <h2>Моя любимая</h2>
            <ul>
              <li>30 см, на тонком тесте</li>
              <li>Соус: томатный</li>
              <li>Начинка: грибы, лук, ветчина, пармезан, ананас</li>
            </ul>
          </div>
        </div>

        <p class="order__price">2х782 ₽</p>
      </li>-->
    </ul>

    <OrderAdditionalList />

    <OrderAddress />
  </section>
</template>

<script>
import OrderHeader from "@/modules/orders/components/OrderHeader";
import OrderPizzaItem from "@/modules/orders/components/OrderPizzaItem";
import OrderAdditionalList from "@/modules/orders/components/OrderAdditionalList";
import OrderAddress from "@/modules/orders/components/OrderAddress";

export default {
  name: "OrderItem",
  components: {
    OrderHeader,
    OrderPizzaItem,
    OrderAdditionalList,
    OrderAddress,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";

.order {
  margin-bottom: 32px;

  padding-top: 15px;

  border-radius: 8px;
  background-color: $white;
  box-shadow: $shadow-light;
}

.order__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}

.order__item {
  display: flex;

  width: 310px;
  margin-right: 33px;
  margin-bottom: 32px;
}

.order__price {
  @include b-s16-h19;

  margin: 0;

  white-space: nowrap;
}
</style>
