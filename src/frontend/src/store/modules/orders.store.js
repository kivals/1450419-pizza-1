import { ADD_ORDER, DELETE_ORDER, SET_ORDERS } from "@/store/mutations-types";

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  actions: {
    async fetchOrders({ commit }) {
      const orders = await this.$api.orders.getOrders();
      commit(SET_ORDERS, orders);
    },

    async post(_, order) {
      const data = await this.$api.orders.post(order);
      return data;
    },

    async delete({ commit }, id) {
      await this.$api.orders.delete(id);
      commit(DELETE_ORDER, id);
    },
  },
  mutations: {
    [SET_ORDERS](state, orders) {
      state.orders = orders;
    },
    [ADD_ORDER](state, order) {
      state.orders.push(order);
    },
    [DELETE_ORDER](state, id) {
      state.orders = state.orders.filter((o) => o.id !== id);
    },
  },
  getters: {
    getOrderById:
      ({ orders }) =>
      (id) =>
        orders.find((o) => o.id === id),
  },
};
