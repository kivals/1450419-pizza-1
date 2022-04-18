<template>
  <div>
    <OrderItem />
  </div>
</template>

<script>
import { mapState } from "vuex";
import OrderItem from "@/modules/orders/components/OrderItem";

export default {
  name: "Orders",
  components: {
    OrderItem,
  },
  computed: {
    ...mapState(["loading"]),
  },
  data() {
    return {
      orders: [],
    };
  },
  /*  async created() {
    this.orders = await this.$store.dispatch("Orders/getOrders");
  },*/
};
</script>

<style scoped></style>
