<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
const mainLayout = "AppLayoutMain";

export default {
  name: "AppLayout",
  computed: {
    layout() {
      const layout = this.$route.meta.layout || mainLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
