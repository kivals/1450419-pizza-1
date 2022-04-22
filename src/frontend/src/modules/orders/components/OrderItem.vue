<template>
  <section class="order" v-if="order">
    <OrderHeader :order-id="orderId" />

    <ul class="order__list">
      <li class="order__item" v-for="pizza in order.pizzas" :key="pizza.id">
        <AppPizzaItem
          :name="pizza.name"
          :size-id="pizza.sizeId"
          :sauce-id="pizza.sauceId"
          :dough-id="pizza.doughId"
          :ingredients="pizza.ingredients"
        />
        <p class="order__price">
          {{ `${pizza.count}x${getPizzaPrice(pizza)} ₽` }}
        </p>
      </li>
    </ul>

    <OrderExtraProducts :products="order.extraProducts" />

    <OrderAddress />
  </section>
</template>

<script>
import OrderHeader from "@/modules/orders/components/OrderHeader";
import OrderExtraProducts from "@/modules/orders/components/OrderExtraProducts";
import OrderAddress from "@/modules/orders/components/OrderAddress";
import AppPizzaItem from "@/common/components/AppPizzaItem";
import { mapGetters } from "vuex";
import { calculatePizzaPrice } from "@/common/helpers/pizza.helper";

export default {
  name: "OrderItem",
  components: {
    AppPizzaItem,
    OrderHeader,
    OrderExtraProducts,
    OrderAddress,
  },
  props: {
    orderId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters("Orders", ["getOrderById"]),
    order() {
      return this.getOrderById(this.orderId);
    },
  },
  methods: {
    getPizzaPrice(pizza) {
      return calculatePizzaPrice(this.$store, { ...pizza });
    },
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
