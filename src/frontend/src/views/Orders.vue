<template>
  <div v-if="orders.length">
    <OrderItem v-for="{ id } in orders" :key="id" :orderId="id" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import OrderItem from "@/modules/orders/components/OrderItem";

export default {
  name: "Orders",
  components: {
    OrderItem,
  },
  computed: {
    ...mapState("Orders", ["orders"]),
  },
  methods: {
    ...mapActions("Orders", ["fetchOrders"]),
  },
  async created() {
    await this.fetchOrders();
  },
};
</script>

<style scoped></style>
