import { ADD_ORDER, DELETE_ORDER, SET_ORDERS } from "@/store/mutations-types";
import { calculatePizzaPrice } from "@/common/helpers/pizza.helper";

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  actions: {
    async fetchOrders({ commit }) {
      let orders = await this.$api.orders.getOrders();
      //TODO слишком сложно
      orders = orders.map((order) => ({
        ...order,
        pizzas: order.pizzas.map((pizza) => ({
          ...pizza,
          price: calculatePizzaPrice(this, pizza),
        })),
      }));
      commit(SET_ORDERS, orders);
    },

    async post(_, order) {
      return await this.$api.orders.post(order);
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
