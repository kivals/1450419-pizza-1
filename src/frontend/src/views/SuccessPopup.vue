<template>
  <div class="popup" @click.prevent="close()">
    <a href="#" class="close">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a href="#" class="button" @click.prevent="close()">Отлично, я жду!</a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SuccessPopup",
  computed: {
    ...mapState("Auth", ["isAuthenticated"]),
  },
  methods: {
    close() {
      this.isAuthenticated
        ? this.$router.push("/orders")
        : this.$router.push("/");
    },
  },
};
</script>

<style scoped></style>
