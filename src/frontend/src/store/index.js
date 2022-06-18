import Vue from "vue";
import Vuex from "vuex";
import Auth from "@/store/modules/auth.store";
import Builder from "@/store/modules/builder.store";
import Cart from "@/store/modules/cart.store";
import Orders from "@/store/modules/orders.store";
import Address from "@/store/modules/address.store";
import VuexPlugins from "@/plugins/vuexPlugins";
import { SET_APP_DATA, SET_LOADING } from "@/store/mutations-types";
import { resources } from "@/common/enums/resources.enum";
import getResourceEnum from "@/common/enums/resource-storage.enum";

Vue.use(Vuex);

const state = {
  loading: true,
  appData: {
    dough: [],
    sauces: [],
    ingredients: [],
    sizes: [],
    misc: [],
  },
};

const actions = {
  async init({ commit, dispatch }) {
    await dispatch("fetchBuilder");
    dispatch("Builder/initSelectedPizza");

    commit(SET_LOADING, false);
  },

  async fetchBuilder({ commit }) {
    const [dough, sizes, sauces, ingredients, misc] = await Promise.all([
      this.$api.fetchDough(),
      this.$api.fetchSizes(),
      this.$api.fetchSauces(),
      this.$api.fetchIngredients(),
      this.$api.fetchMisc(),
    ]);
    commit(SET_APP_DATA, {
      dough,
      sauces,
      ingredients,
      sizes,
      misc,
    });
  },
};

export const mutations = {
  [SET_LOADING](state, loading) {
    state.loading = loading;
  },
  [SET_APP_DATA](state, appData) {
    state.appData = appData;
  },
};

export const getters = {
  dough: ({ appData }) => appData.dough,
  sizes: ({ appData }) => appData.sizes,
  sauces: ({ appData }) => appData.sauces,
  ingredients: ({ appData }) => appData.ingredients,
  misc: ({ appData }) => appData.misc,
  doughEnum: (_, { dough }) => getResourceEnum(resources.DOUGH, dough),
  sizeEnum: (_, { sizes }) => getResourceEnum(resources.SIZES, sizes),
  sauceEnum: (_, { sauces }) => getResourceEnum(resources.SAUCES, sauces),
  ingredientsEnum: (_, { ingredients }) =>
    getResourceEnum(resources.INGREDIENTS, ingredients),
  miscEnum: (_, { misc }) => getResourceEnum(resources.MISC, misc),
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  plugins: [VuexPlugins],
  modules: {
    Auth,
    Builder,
    Cart,
    Orders,
    Address,
  },
});
