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
          v-model="delivery.phone"
        />
      </label>

      <div v-if="showDeliveryAddress" class="cart-form__address">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input type="text" name="street" v-model="delivery.street" />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input type="text" name="house" v-model="delivery.building" />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input type="text" name="apartment" v-model="delivery.flat" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

const orderTypes = [
  {
    value: "self",
    description: "Заберу сам",
    auth: false,
  },
  {
    value: "address",
    description: "Новый адрес",
    auth: false,
    needAddress: true,
  },
  {
    value: "house",
    description: "Дом",
    auth: true,
    needAddress: true,
  },
];

export default {
  name: "CartDeliveryInfo",
  props: {
    street: {
      type: String,
      default: "",
    },
    building: {
      type: String,
      default: "",
    },
    flat: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      currentOrderType: orderTypes[0].value,
      delivery: {
        street: this.street,
        building: this.building,
        flat: this.flat,
        phone: this.phone,
      },
    };
  },
  computed: {
    ...mapState("Auth", ["isAuthenticated"]),
    allowOrderTypes() {
      return this.isAuthenticated
        ? orderTypes
        : orderTypes.filter((t) => !t.auth);
    },
    showDeliveryAddress() {
      return orderTypes.find((t) => t.value === this.currentOrderType)
        ?.needAddress;
    },
  },
  methods: {
    clearAddressForm() {
      this.delivery.street = "";
      this.delivery.building = "";
      this.delivery.flat = "";
    },
  },
  watch: {
    "delivery.street"(value) {
      this.$emit("change-street", value);
    },
    "delivery.building"(value) {
      this.$emit("change-building", value);
    },
    "delivery.flat"(value) {
      this.$emit("change-flat", value);
    },
    "delivery.phone"(value) {
      this.$emit("change-phone", value);
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
