<template>
  <div id="app">
    <AppLayout v-if="!loading">
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    AppLayout,
  },
  async created() {
    window.onerror = function (msg, url, line, col, error) {
      console.error(error);
    };

    if (this.$jwt.getToken()) {
      this.$store.$api.setAuthHeader();
      await this.$store.dispatch("Auth/getMe");
    }

    await this.$store.dispatch("init");
  },
  computed: {
    ...mapState(["loading"]),
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
