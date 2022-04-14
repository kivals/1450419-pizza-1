import { SET_AUTH, SET_AUTH_USER } from "@/store/mutations-types";

export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
    user: null,
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
  },

  mutations: {
    [SET_AUTH](state, value) {
      state.isAuthenticated = value;
    },
    [SET_AUTH_USER](state, user) {
      state.user = user;
    },
  },
  getters: {
    getUserId({ user }) {
      return user?.id;
    },
  },
};
