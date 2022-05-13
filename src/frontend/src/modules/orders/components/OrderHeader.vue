<template>
  <div class="order__header">
    <div class="order__number">
      <b>Заказ #{{ orderId }}</b>
    </div>

    <div class="order__sum">
      <span>Сумма заказа: {{ orderPrice }} ₽</span>
    </div>

    <div class="order__button">
      <button
        @click="deleteOrderHandler"
        type="button"
        class="button button--border"
      >
        Удалить
      </button>
    </div>
    <div class="order__button">
      <button @click="repeatOrderHandler" type="button" class="button">
        Повторить
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { calculatePizzaPrice } from "@/common/helpers/pizza.helper";

export default {
  name: "OrderHeader",
  props: {
    orderId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters("Orders", ["getOrderById"]),
    ...mapGetters(["miscEnum"]),
    // TODO такая же логика есть в сторе корзины, надо сделать единую точку подсчета суммы
    orderPrice() {
      const order = this.getOrderById(this.orderId);

      const pizzasPrice = order.pizzas.reduce((sum, pizza) => {
        return (
          sum + calculatePizzaPrice(this.$store, pizza) * Number(pizza.count)
        );
      }, 0);
      const miscPrice = order.orderMisc.reduce((sum, misc) => {
        const price = Number(this.miscEnum[misc.id].price);
        const count = Number(misc.count);
        return sum + price * count;
      }, 0);

      return pizzasPrice + miscPrice;
    },
  },
  methods: {
    deleteOrderHandler() {
      this.$emit("delete-order");
    },
    repeatOrderHandler() {
      this.$emit("repeat-order");
    },
  },
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
