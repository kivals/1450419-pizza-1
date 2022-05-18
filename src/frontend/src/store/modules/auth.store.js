import {
  ADD_ADDRESS,
  DELETE_ADDRESS,
  SET_ADDRESSES,
  SET_AUTH,
  SET_AUTH_USER,
  UPDATE_ADDRESS,
} from "@/store/mutations-types";

//TODO Возможно стоит вынести адрес в отдельный модуль
export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
    user: null,
    addresses: [],
  },
  actions: {
    async login({ dispatch }, credentials) {
      const data = await this.$api.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.setAuthHeader();
      dispatch("getMe");
    },

    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.getMe();
        commit(SET_AUTH, true);
        commit(SET_AUTH_USER, data);
      } catch (e) {
        dispatch("logout");
      }
    },

    async logout({ commit }) {
      await this.$api.logout();
      this.$jwt.destroyToken();
      this.$api.setAuthHeader();
      commit(SET_AUTH, false);
      commit(SET_AUTH_USER, null);
    },

    async fetchAddresses({ commit }) {
      let addresses = await this.$api.address.getAddresses();
      commit(SET_ADDRESSES, addresses);
    },

    async saveUserAddress({ commit, getters }, address) {
      const userId = getters.getUserId;
      const savedAddress = await this.$api.address.post({
        ...address,
        userId,
      });
      commit(ADD_ADDRESS, savedAddress);
    },

    async updateAddress({ commit }, address) {
      await this.$api.address.put(address);
      commit(UPDATE_ADDRESS, address);
    },

    async deleteAddress({ commit }, id) {
      await this.$api.address.delete(id);
      commit(DELETE_ADDRESS, id);
    },
  },

  mutations: {
    [SET_AUTH](state, value) {
      state.isAuthenticated = value;
    },
    [SET_AUTH_USER](state, user) {
      state.user = user;
    },
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
  getters: {
    getUserId({ user }) {
      return user?.id;
    },
  },
};
