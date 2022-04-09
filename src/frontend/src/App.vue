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
