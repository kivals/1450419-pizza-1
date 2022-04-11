<template>
  <div class="sign-form">
    <router-link to="/" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form @submit.prevent="login" method="post">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            ref="email"
            type="email"
            v-model="email.value"
            name="email"
            placeholder="example@mail.ru"
          />
          <span v-if="isShowEmailErrors" class="sign-form__error">
            {{ email.error }}
          </span>
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            v-model="password.value"
            type="password"
            name="pass"
            placeholder="***********"
          />
          <span v-if="isShowPasswordErrors" class="sign-form__error">
            {{ password.error }}
          </span>
        </label>
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script>
import { validationRules } from "@/common/helpers";

export default {
  name: "Login",
  data() {
    return {
      email: {
        value: "",
        error: "",
      },
      password: {
        value: "",
        error: "",
      },
    };
  },
  computed: {
    isShowEmailErrors() {
      return !!this.email.error;
    },
    isShowPasswordErrors() {
      return !!this.password.error;
    },
  },
  mounted() {
    this.$refs.email.focus();
  },
  methods: {
    async login() {
      this.validate();
      if (!this.email.error && !this.password.error) {
        await this.$store.dispatch("Auth/login", {
          email: this.email.value,
          password: this.password.value,
        });
        await this.$router.push("/");
      }
    },
    validate() {
      if (!validationRules.required.rule(this.email.value)) {
        this.email.error = validationRules.required.message;
      }
      if (!validationRules.required.rule(this.password.value)) {
        this.password.error = validationRules.required.message;
      }
      if (!this.email.error && !validationRules.email.rule(this.email.value)) {
        this.email.error = validationRules.email.message;
      }
    },
    clearValidationErrors() {
      this.email.error = "";
      this.password.error = "";
    },
  },
  watch: {
    "email.value": function () {
      this.clearValidationErrors();
    },
    "password.value": function () {
      this.clearValidationErrors();
    },
  },
};
</script>

<style lang="scss" scoped>
.sign-form__error {
  color: $red-900;
}
</style>
