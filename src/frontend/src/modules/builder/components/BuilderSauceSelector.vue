<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
      v-for="{ id, type, name } in sauces"
      :key="id"
      class="radio ingredients__input"
    >
      <input
        type="radio"
        name="sauce"
        :value="type"
        :checked="id === selectedSauceId"
        @click="selectSauce(id)"
      />
      <span>{{ name }}</span>
    </label>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BuilderSauceSelector",
  computed: {
    ...mapGetters("Builder", ["sauces", "selectedSauceId"]),
  },
  methods: {
    ...mapActions("Builder", ["selectSauce"]),
  },
};
</script>

<style scoped></style>
