<template>
  <form action="#" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if="!hasClientPizzas" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <template v-else>
          <CartList />

          <div class="cart__additional">
            <CartAdditionalList />
          </div>

          <CartDeliveryInfo
            :street.sync="address.street"
            :building.sync="address.building"
            :flat.sync="address.flat"
            :phone.sync="phone"
            :type.sync="address.type"
          />
        </template>
      </div>
    </main>
    <section v-if="hasClientPizzas" class="footer">
      <div class="footer__more">
        <router-link to="/" class="button button--border button--arrow"
          >Хочу еще одну</router-link
        >
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ totalPrice }} ₽</b>
      </div>

      <div class="footer__submit">
        <button @click.prevent="makeOrder" type="submit" class="button">
          Оформить заказ
        </button>
      </div>
    </section>
  </form>
</template>

<script>
import CartList from "@/modules/cart/components/CartList";
import CartAdditionalList from "@/modules/cart/components/CartAdditionalList";
import CartDeliveryInfo from "@/modules/cart/components/CartDeliveryInfo";
import { mapActions, mapGetters, mapState } from "vuex";
import { calculateOrderPrice } from "@/common/helpers/pizza.helper";
import { deliveryType } from "@/common/constants";
import { validationRules } from "@/common/helpers/validate.helper";

export default {
  components: {
    CartList,
    CartAdditionalList,
    CartDeliveryInfo,
  },
  data() {
    return {
      address: {
        type: deliveryType.SELF,
        street: "",
        building: "",
        flat: "",
      },
      phone: "",
    };
  },
  computed: {
    ...mapState("Cart", ["clientPizzas", "selectedMisc"]),
    ...mapGetters("Cart", ["hasClientPizzas"]),
    ...mapGetters("Auth", ["getUserId"]),
    totalPrice() {
      return calculateOrderPrice(
        this.clientPizzas,
        this.selectedMisc,
        this.$store
      );
    },
  },
  methods: {
    ...mapActions("Orders", ["post"]),
    ...mapActions("Cart", ["clearCart"]),
    async makeOrder() {
      if (!this.validate()) {
        return;
      }
      const sendData = {
        userId: this.getUserId,
        phone: this.phone,
        address: this.address.type !== deliveryType.SELF ? this.address : null,
        pizzas: this.clientPizzas,
        misc: this.selectedMisc,
      };
      await this.post(sendData);
      this.clearCart();
      await this.$router.push("/success");
    },
    //TODO переписать для читаемости
    validate() {
      if (!validationRules.required.rule(this.phone)) {
        return false;
      }
      if (
        this.address.type !== deliveryType.SELF &&
        (!validationRules.required.rule(this.address.street) ||
          !validationRules.required.rule(this.address.building))
      ) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped></style>
