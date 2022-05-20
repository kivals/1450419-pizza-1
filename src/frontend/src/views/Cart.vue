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
            :street="address.street"
            :building="address.building"
            :flat="address.flat"
            :phone="phone"
            @change-street="address.street = $event"
            @change-building="address.building = $event"
            @change-flat="address.flat = $event"
            @change-phone="phone = $event"
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

export default {
  components: {
    CartList,
    CartAdditionalList,
    CartDeliveryInfo,
  },
  data() {
    return {
      address: {
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
        address: this.address,
        pizzas: this.clientPizzas,
        misc: this.selectedMisc,
      };
      await this.post(sendData);
      this.clearCart();
      await this.$router.push("/success");
    },
    validate() {
      return true;
    },
  },
};
</script>

<style scoped></style>
