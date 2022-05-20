<template>
  <div class="popup">
    <router-link class="close" :to="goToUrl">
      <span class="visually-hidden">Закрыть попап</span>
    </router-link>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <router-link class="button" :to="goToUrl">Отлично, я жду!</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SuccessPopup",
  computed: {
    ...mapState("Auth", ["isAuthenticated"]),
    goToUrl() {
      return this.isAuthenticated ? "orders" : "/";
    },
  },
};
</script>

<style scoped></style>
