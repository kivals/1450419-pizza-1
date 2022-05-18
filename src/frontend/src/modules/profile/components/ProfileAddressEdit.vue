<template>
  <form class="address-form address-form--opened sheet">
    <div v-if="addressState.id" class="address-form__header">
      <b>{{ addressState.name }}</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <label class="input">
          <span>Название адреса*</span>
          <input
            type="text"
            v-model="addressState.name"
            name="addr-name"
            placeholder="Введите название адреса"
            required
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <label class="input">
          <span>Улица*</span>
          <input
            type="text"
            v-model="addressState.street"
            name="addr-street"
            placeholder="Введите название улицы"
            required
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Дом*</span>
          <input
            type="text"
            v-model="addressState.building"
            name="addr-house"
            placeholder="Введите номер дома"
            required
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Квартира</span>
          <input
            type="text"
            v-model="addressState.flat"
            name="addr-apartment"
            placeholder="Введите № квартиры"
          />
        </label>
      </div>
      <div class="address-form__input">
        <label class="input">
          <span>Комментарий</span>
          <input
            type="text"
            v-model="addressState.comment"
            name="addr-comment"
            placeholder="Введите комментарий"
          />
        </label>
      </div>
    </div>

    <div class="address-form__buttons">
      <button
        v-if="addressState.id"
        type="button"
        class="button button--transparent"
        @click="onDeleteClick"
      >
        Удалить
      </button>
      <button type="submit" class="button" @click.prevent="onSaveClick">
        Сохранить
      </button>
    </div>
  </form>
</template>

<script>
const createEmptyState = () => ({
  name: "",
  street: "",
  comment: "",
  building: "",
  flat: "",
});

//TODO сделать проверки на заполненность полей, убрать возможность отправки пустого объекта
export default {
  name: "ProfileAddressEdit",
  props: {
    address: {
      type: Object,
      default: createEmptyState,
    },
  },
  data() {
    return {
      addressState: { ...this.address },
    };
  },
  methods: {
    onDeleteClick() {
      this.$emit("delete");
    },
    onSaveClick() {
      this.$emit("save", this.addressState);
    },
  },
};
</script>

<style scoped></style>
