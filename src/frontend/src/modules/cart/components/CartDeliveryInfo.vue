<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select v-model="currentOrderType" name="test" class="select">
          <option
            v-for="type in allowOrderTypes"
            :key="type.value"
            :value="type.value"
          >
            {{ type.description }}
          </option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input type="text" name="tel" placeholder="+7 999-999-99-99" />
      </label>

      <div v-if="showDeliveryAddress" class="cart-form__address">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input type="text" name="street" />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input type="text" name="house" />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input type="text" name="apartment" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { orderTypes } from "@/common/constants";

export default {
  name: "CartDeliveryInfo",
  data() {
    return {
      orderTypes,
      currentOrderType: orderTypes[0].value,
    };
  },
  computed: {
    ...mapState("Auth", ["user"]),
    allowOrderTypes() {
      return this.user
        ? this.orderTypes
        : this.orderTypes.filter((t) => !t.auth);
    },
    showDeliveryAddress() {
      return this.orderTypes.find((t) => t.value === this.currentOrderType)
        .needAddress;
    },
  },
};
</script>

<style scoped></style>
