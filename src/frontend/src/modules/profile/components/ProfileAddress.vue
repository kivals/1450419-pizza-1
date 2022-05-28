<template>
  <div class="sheet address-form">
    <div class="address-form__header">
      <b>{{ preparedAddress.name }}</b>
      <div class="address-form__edit">
        <button type="button" class="icon" @click="onEditClick">
          <span class="visually-hidden">Изменить адрес</span>
        </button>
      </div>
    </div>
    <p>{{ preparedAddress.fullAddress }}</p>
    <small>{{ preparedAddress.comment }}</small>
  </div>
</template>

<script>
export default {
  name: "ProfileAddress",
  props: {
    address: {
      type: Object,
      required: true,
    },
  },
  computed: {
    preparedAddress() {
      return {
        name: this.address.name,
        fullAddress: `${this.address.street}, д. ${this.address.building}, кв. ${this.address.flat}`,
        comment: this.address.comment,
      };
    },
  },
  methods: {
    onEditClick() {
      this.$emit("edit");
    },
  },
};
</script>

<style scoped></style>
