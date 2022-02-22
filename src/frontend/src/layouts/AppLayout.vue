<template>
  <div class="app-layout">
    <AppLayoutHeader />
    <main class="content">
      <IndexHome />
    </main>
  </div>
</template>

<script>
import IndexHome from "@/views/Index";
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppLayout",
  components: {
    AppLayoutHeader,
    IndexHome,
  },
};
</script>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  flex-direction: column;

  height: 100vh;
}
</style>
