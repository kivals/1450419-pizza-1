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

          <CartDeliveryInfo />
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
import { cloneDeep } from "lodash";

export default {
  components: {
    CartList,
    CartAdditionalList,
    CartDeliveryInfo,
  },
  data() {
    return {
      showModal: true,
    };
  },
  computed: {
    ...mapState("Cart", ["clientPizzas", "extraProducts"]),
    ...mapState("Orders", ["phone", "address"]),
    ...mapGetters("Cart", ["totalPrice", "hasClientPizzas"]),
    ...mapGetters("Auth", ["getUserId"]),
  },
  methods: {
    ...mapActions("Orders", ["post"]),
    async makeOrder() {
      const filteredExtraProducts = this.extraProducts.filter(
        (p) => p.count > 0
      );
      const sendData = {
        userId: this.getUserId,
        phone: this.phone,
        address: cloneDeep(this.address),
        pizzas: this.clientPizzas,
        misc: filteredExtraProducts,
      };
      await this.post(sendData);
      await this.$router.push("/success");
    },
  },
};
</script>

<style scoped></style>
