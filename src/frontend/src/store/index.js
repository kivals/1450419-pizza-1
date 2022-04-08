import Vue from "vue";
import Vuex from "vuex";
import Auth from "@/store/modules/auth.store";
import Builder from "@/store/modules/builder.store";
import Cart from "@/store/modules/cart.store";
import Orders from "@/store/modules/orders.store";
import VuexPlugins from "@/plugins/vuexPlugins";
import { SET_LOADING } from "@/store/mutations-types";

Vue.use(Vuex);

const state = {
  pizzaConfig: {},
  loading: true,
};

const actions = {
  async init({ commit, dispatch }) {
    await dispatch("Builder/fetchBuilder");
    await dispatch("Cart/fetchExtraProducts");
    dispatch("Builder/initSelectedPizza");

    commit(SET_LOADING, false);
  },
};

const mutations = {
  [SET_LOADING](state, loading) {
    state.loading = loading;
  },
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  plugins: [VuexPlugins],
  modules: {
    Auth,
    Builder,
    Cart,
    Orders,
  },
});
