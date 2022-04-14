import {
  ADD_ORDER,
  CHANGE_ADDRESS,
  SET_ORDERS,
  SET_PHONE,
} from "@/store/mutations-types";

export default {
  namespaced: true,
  state: {
    orders: [],
    address: {
      street: "",
      building: "",
      flat: "",
    },
    phone: "",
  },
  actions: {
    async getOrders({ commit }) {
      const orders = await this.$api.fetchOrders();
      commit(SET_ORDERS, orders);
    },

    async post({ commit }, order) {
      const data = await this.$api.orders.post(order);
      commit(ADD_ORDER, data);
      return data;
    },
  },
  mutations: {
    [SET_ORDERS](state, orders) {
      state.orders = orders;
    },
    [SET_PHONE](state, phone) {
      state.phone = phone;
    },
    [ADD_ORDER](state, order) {
      state.orders.push(order);
    },
    [CHANGE_ADDRESS](state, { entity, value }) {
      this._vm.$set(state.address, entity, value);
    },
  },
};
