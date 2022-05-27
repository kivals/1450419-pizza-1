<template>
  <ul class="additional-list">
    <li
      v-for="product in miscWithCount"
      :key="product.id"
      class="additional-list__item sheet"
    >
      <p class="additional-list__description">
        <img
          :src="require(`@/assets/img/${product.image}`)"
          width="39"
          height="60"
          :alt="product.name"
        />
        <span>{{ product.name }}</span>
      </p>
      <div class="additional-list__wrapper">
        <ItemCounter
          class="additional-list__counter"
          color-theme="orange"
          :counter="product.count"
          @change="changeMiscCount({ id: product.id, count: $event })"
        />

        <div class="additional-list__price">
          <b>× {{ product.price }} ₽</b>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "CartAdditional",
  components: { ItemCounter },
  computed: {
    ...mapGetters(["misc"]),
    ...mapState("Cart", ["selectedMisc"]),
    miscWithCount() {
      return this.misc.map((miscItem) => ({
        ...miscItem,
        count: this.selectedMisc.find((m) => m.id === miscItem.id)?.count || 0,
      }));
    },
  },
  methods: {
    ...mapActions("Cart", ["changeMiscCount"]),
  },
};
</script>

<style scoped></style>
