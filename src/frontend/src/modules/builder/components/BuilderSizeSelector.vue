<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="{ id, type, name } in sizes"
          :key="id"
          class="diameter__input"
          :class="`diameter__input--${type}`"
        >
          <input
            type="radio"
            name="diameter"
            :value="type"
            :checked="id === selectedSizeId"
            class="visually-hidden"
            @click="selectSize(id)"
          />
          <span>{{ name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BuilderSizeSelector",
  computed: {
    ...mapGetters("Builder", ["sizes", "selectedSizeId"]),
  },
  methods: {
    ...mapActions("Builder", ["selectSize"]),
  },
};
</script>

<style scoped></style>
