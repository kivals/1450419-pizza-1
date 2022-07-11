<template>
  <div>
    <ProfileUser />

    <div
      v-for="{ address, componentName } in addressData"
      :key="address.id"
      class="layout__address"
    >
      <component
        :is="componentName"
        :address="address"
        @edit="onEditClick(address.id)"
        @save="onSaveClick"
        @delete="onDeleteClick(address.id)"
      />
    </div>

    <div
      class="layout__address"
      v-if="isOpenedForm"
    >
      <ProfileAddressEdit
        @delete="onFormCloseClick"
        @save="onSaveClick"
      />
    </div>

    <div class="layout__button">
      <button
        type="button"
        class="button button--border"
        @click="onAddNewAddressClick"
      >
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import ProfileUser from "@/modules/profile/components/ProfileUser";
import { mapActions, mapState } from "vuex";
import ProfileAddress from "@/modules/profile/components/ProfileAddress";
import ProfileAddressEdit from "@/modules/profile/components/ProfileAddressEdit";

export default {
  name: "Profile",
  components: { ProfileUser, ProfileAddress, ProfileAddressEdit },
  data() {
    return {
      isOpenedForm: false,
      editComponentId: null,
    };
  },
  computed: {
    ...mapState("Address", ["addresses"]),
    addressData() {
      return this.addresses.map((address) => ({
        address,
        componentName:
          address.id === this.editComponentId
            ? "ProfileAddressEdit"
            : "ProfileAddress",
      }));
    },
  },
  methods: {
    ...mapActions("Address", [
      "fetchAddresses",
      "saveUserAddress",
      "updateAddress",
      "deleteAddress",
    ]),
    onAddNewAddressClick() {
      // закроем другие открытые формы редактирования
      this.editComponentId = null;
      this.isOpenedForm = true;
    },
    onFormCloseClick() {
      this.isOpenedForm = false;
    },
    onEditClick(id) {
      // закроем другие открытые формы редактирования
      this.isOpenedForm = false;
      this.editComponentId = id;
    },
    async onSaveClick(payload) {
      if (!payload.id) {
        await this.saveUserAddress(payload);
        this.isOpenedForm = false;
      } else {
        await this.updateAddress(payload);
        this.editComponentId = null;
      }
    },
    async onDeleteClick(id) {
      await this.deleteAddress(id);
    },
  },
  async created() {
    await this.fetchAddresses();
  },
};
</script>

<style lang="scss" scoped>
.layout__button {
  margin-top: 40px;

  button {
    padding: 12px 23px;
  }
}
.layout__address {
  margin-top: 16px;
}
</style>
