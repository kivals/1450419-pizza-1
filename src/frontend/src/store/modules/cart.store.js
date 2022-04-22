import {
  ADD_CLIENT_PIZZA,
  CHANGE_CLIENT_PIZZA_COUNT,
  CHANGE_EXTRA_PRODUCT_COUNT,
  DELETE_CLIENT_PIZZA,
  SET_EXTRA_PRODUCTS,
  UPDATE_CLIENT_PIZZA,
} from "@/store/mutations-types";
import { createIdEntryEnum } from "@/common/helpers/common.helper";

export default {
  namespaced: true,
  state: {
    clientPizzas: [],
    extraProducts: [],
  },
  actions: {
    async fetchExtraProducts({ commit }) {
      const products = await this.$api.fetchMisc();
      commit(SET_EXTRA_PRODUCTS, products);
    },

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

    changeProductCount({ commit }, { id, count }) {
      if (count >= 0) {
        commit(CHANGE_EXTRA_PRODUCT_COUNT, { id, count });
      }
    },
  },
  mutations: {
    [SET_EXTRA_PRODUCTS](state, extraProducts) {
      state.extraProducts = extraProducts;
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
    [CHANGE_EXTRA_PRODUCT_COUNT](state, { id, count }) {
      const product = state.extraProducts.find((p) => p.id === id);
      product.count = count;
    },
  },
  getters: {
    totalPrice({ clientPizzas, extraProducts }) {
      const pizzasPrice = clientPizzas.reduce(
        (acc, pizza) => acc + Number(pizza.price) * Number(pizza.count),
        0
      );
      const extraProductsPrice = extraProducts.reduce(
        (acc, product) => acc + Number(product.price) * Number(product.count),
        0
      );

      return pizzasPrice + extraProductsPrice;
    },
    hasClientPizzas: ({ clientPizzas }) => clientPizzas.length > 0,
    extraProductsEnum: ({ extraProducts }) => createIdEntryEnum(extraProducts),
  },
};
