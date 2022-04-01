import Vue from "vue";
import Vuex from "vuex";
import Auth from "@/store/modules/auth.store";
import Builder from "@/store/modules/builder.store";
import Cart from "@/store/modules/cart.store";
import Orders from "@/store/modules/orders.store";

Vue.use(Vuex);

const state = {
  pizzaConfig: {},
};

const actions = {
  init({ dispatch }) {
    dispatch("Builder/fetchBuilder");
    dispatch("Builder/initSelectedPizza");
    dispatch("Cart/fetchExtraProducts");
  },
};

export default new Vuex.Store({
  state,
  actions,
  modules: {
    Auth,
    Builder,
    Cart,
    Orders,
  },
});
