import {
  ADD_ADDRESS,
  DELETE_ADDRESS,
  SET_ADDRESSES,
  UPDATE_ADDRESS,
} from "@/store/mutations-types";

export default {
  namespaced: true,
  state: {
    addresses: [],
  },
  actions: {
    async fetchAddresses({ commit }) {
      let addresses = await this.$api.address.getAddresses();
      commit(SET_ADDRESSES, addresses);
    },

    async saveUserAddress({ commit, rootGetters }, address) {
      const userId = rootGetters["Address/getUserId"];
      const savedAddress = await this.$api.address.createAddress({
        ...address,
        userId,
      });
      commit(ADD_ADDRESS, savedAddress);
    },

    async updateAddress({ commit }, address) {
      await this.$api.address.editAddress(address);
      commit(UPDATE_ADDRESS, address);
    },

    async deleteAddress({ commit }, id) {
      await this.$api.address.delete(id);
      commit(DELETE_ADDRESS, id);
    },
  },

  mutations: {
    [SET_ADDRESSES](state, addresses) {
      state.addresses = addresses;
    },
    [ADD_ADDRESS](state, address) {
      state.addresses.push(address);
    },
    [UPDATE_ADDRESS](state, address) {
      const index = state.addresses.findIndex(({ id }) => address.id === id);
      if (~index) {
        state.addresses.splice(index, 1, address);
      }
    },
    [DELETE_ADDRESS](state, id) {
      state.addresses = state.addresses.filter(
        (address) => +address.id !== +id
      );
    },
  },
};
