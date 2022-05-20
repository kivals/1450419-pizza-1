import {
  ADD_CLIENT_PIZZA,
  ADD_SELECTED_MISC_COUNT,
  CHANGE_CLIENT_PIZZA_COUNT,
  CHANGE_SELECTED_MISC_COUNT,
  CLEAR_CART,
  DELETE_CLIENT_PIZZA,
  SET_CLIENT_PIZZAS,
  SET_SELECTED_MISC,
  UPDATE_CLIENT_PIZZA,
} from "@/store/mutations-types";

export default {
  namespaced: true,
  state: {
    clientPizzas: [],
    selectedMisc: [],
  },
  actions: {
    addToCart({ commit, state, dispatch }, pizza) {
      const index = state.clientPizzas.findIndex((p) => p.id === pizza.id);

      ~index
        ? commit(UPDATE_CLIENT_PIZZA, { index, pizza })
        : commit(ADD_CLIENT_PIZZA, pizza);

      // Обнуляем форму конфигурирования пиццы
      dispatch("Builder/initSelectedPizza", null, { root: true });
    },

    changePizzaCount({ commit }, { id, count }) {
      count !== 0
        ? commit(CHANGE_CLIENT_PIZZA_COUNT, { id, count })
        : commit(DELETE_CLIENT_PIZZA, id);
    },

    changeMiscCount({ commit, state }, { id, count }) {
      const selectedIndex = state.selectedMisc.findIndex(
        (misc) => misc.id === id
      );

      ~selectedIndex
        ? commit(CHANGE_SELECTED_MISC_COUNT, { id, count })
        : commit(ADD_SELECTED_MISC_COUNT, { id });
    },
    clearCart({ commit }) {
      commit(CLEAR_CART);
    },
    backToCart({ commit }, { pizzas, orderMisc }) {
      commit(SET_CLIENT_PIZZAS, pizzas);
      commit(SET_SELECTED_MISC, orderMisc);
    },
  },
  mutations: {
    [SET_SELECTED_MISC](state, selectedMisc) {
      state.selectedMisc = selectedMisc;
    },
    [SET_CLIENT_PIZZAS](state, pizzas) {
      state.clientPizzas = pizzas;
    },
    [ADD_CLIENT_PIZZA](state, clientPizza) {
      state.clientPizzas.push(clientPizza);
    },
    [DELETE_CLIENT_PIZZA](state, id) {
      state.clientPizzas = state.clientPizzas.filter((p) => p.id !== id);
    },
    [UPDATE_CLIENT_PIZZA](state, { index, pizza }) {
      state.clientPizzas.splice(index, 1, pizza);
    },
    [CHANGE_CLIENT_PIZZA_COUNT](state, { id, count }) {
      const pizza = state.clientPizzas.find((p) => p.id === id);
      pizza.count = count;
    },
    [CHANGE_SELECTED_MISC_COUNT](state, { id, count }) {
      state.selectedMisc.find((p) => p.id === id).count = count;
    },
    [ADD_SELECTED_MISC_COUNT](state, { id }) {
      state.selectedMisc.push({ id, count: 1 });
    },
    [CLEAR_CART](state) {
      state.clientPizzas = [];
      state.selectedMisc = [];
    },
  },
  getters: {
    hasClientPizzas: ({ clientPizzas }) => clientPizzas.length > 0,
  },
};
