<template>
  <AppSheet>
    <template #header-title>Выберите тесто</template>
    <template #content>
      <div class="dough">
        <label
          v-for="{ id, type, name, description } in dough"
          :key="id"
          class="dough__input"
          :class="`dough__input--${type}`"
          data-test="label"
        >
          <input
            type="radio"
            name="dough"
            :value="type"
            :checked="true"
            class="visually-hidden"
            data-test="input"
            @click="selectDough(id)"
          />
          <b>{{ name }}</b>
          <span>{{ description }}</span>
        </label>
      </div>
    </template>
  </AppSheet>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppSheet from "@/common/components/AppSheet";

export default {
  name: "BuilderDoughSelector",

  components: {
    AppSheet,
  },

  computed: {
    ...mapGetters("Builder", ["selectedDoughId"]),

    ...mapGetters(["dough"]),
  },

  methods: {
    ...mapActions("Builder", ["selectDough"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
.dough {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.dough__input {
  position: relative;

  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;

  cursor: pointer;

  b {
    @include r-s16-h19;

    &::before {
      @include p_center-v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }

  span {
    @include l-s11-h13;

    display: block;
  }

  &--light {
    b {
      &::before {
        background-image: url("~@/assets/img/dough-light.svg");
      }
    }
  }

  &--large {
    b {
      &::before {
        background-image: url("~@/assets/img/dough-large.svg");
      }
    }
  }

  &:hover {
    b::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + b::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>
