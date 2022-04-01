<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="{ id, type, name, description } in dough"
          :key="id"
          class="dough__input"
          :class="`dough__input--${type}`"
        >
          <input
            type="radio"
            name="dough"
            :value="type"
            :checked="id === selectedDoughId"
            class="visually-hidden"
            @click="selectDough(id)"
          />
          <b>{{ name }}</b>
          <span>{{ description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BuilderDoughSelector",
  computed: {
    ...mapGetters("Builder", ["dough", "selectedDoughId"]),
  },
  methods: {
    ...mapActions("Builder", ["selectDough"]),
  },
};
</script>

<style scoped></style>
