<template>
  <ul class="additional-list">
    <li
      v-for="product in extraProducts"
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
          @change="changeProductCount({ id: product.id, count: $event })"
        />

        <div class="additional-list__price">
          <b>× {{ product.price }} ₽</b>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "CartAdditional",
  components: { ItemCounter },
  computed: {
    ...mapState("Cart", ["extraProducts"]),
  },
  methods: {
    ...mapActions("Cart", ["changeProductCount"]),
  },
};
</script>

<style scoped></style>
