<template>
  <component :is="componentSize" class="title" :class="styleSize">
    <slot></slot>
  </component>
</template>

<script>
const sizes = {
  SMALL: "small",
  BIG: "big",
};

export default {
  name: "AppTitle",
  props: {
    size: {
      type: String,
      default: sizes.SMALL,
      validator: (size) => Object.values(sizes).some((value) => value === size),
    },
  },
  computed: {
    componentSize() {
      return this.size === sizes.BIG ? "h1" : "h2";
    },
    styleSize() {
      return `title__${this.size}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  color: $black;

  &--big {
    @include b-s36-h42;
  }

  &--small {
    @include b-s18-h21;
  }
}
</style>
