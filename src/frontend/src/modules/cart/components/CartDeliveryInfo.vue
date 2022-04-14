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
        <input
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
          v-model="phone"
        />
      </label>

      <div v-if="showDeliveryAddress" class="cart-form__address">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input type="text" name="street" v-model="street" />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input type="text" name="house" v-model="building" />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input type="text" name="apartment" v-model="flat" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { orderTypes } from "@/common/constants";
import { CHANGE_ADDRESS, SET_PHONE } from "@/store/mutations-types";

export default {
  name: "CartDeliveryInfo",
  data() {
    return {
      orderTypes,
      currentOrderType: orderTypes[0].value,
      street: "",
      building: "",
      flat: "",
      phone: "",
    };
  },
  computed: {
    ...mapState("Auth", ["isAuthenticated"]),
    allowOrderTypes() {
      return this.isAuthenticated
        ? this.orderTypes
        : this.orderTypes.filter((t) => !t.auth);
    },
    showDeliveryAddress() {
      return this.orderTypes.find((t) => t.value === this.currentOrderType)
        ?.needAddress;
    },
  },
  methods: {
    ...mapMutations("Orders", [CHANGE_ADDRESS, SET_PHONE]),
    clearAddressForm() {
      this.street = "";
      this.building = "";
      this.flat = "";
    },
  },
  watch: {
    street(value) {
      this.CHANGE_ADDRESS({ entity: "street", value });
    },
    building(value) {
      this.CHANGE_ADDRESS({ entity: "building", value });
    },
    flat(value) {
      this.CHANGE_ADDRESS({ entity: "flat", value });
    },
    phone(value) {
      this.SET_PHONE(value);
    },
    currentOrderType() {
      if (!this.showDeliveryAddress) {
        this.clearAddressForm();
      }
    },
  },
};
</script>

<style scoped></style>
