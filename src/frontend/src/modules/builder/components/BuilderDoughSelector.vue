<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="d in doughList"
          :key="d.id"
          class="dough__input"
          :class="`dough__input--${d.type}`"
        >
          <input
            type="radio"
            name="dough"
            :value="d.type"
            class="visually-hidden"
            @click="$emit('select', d.id)"
          />
          <b>{{ d.name }}</b>
          <span>{{ d.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderDoughSelector",
  props: {
    doughList: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
