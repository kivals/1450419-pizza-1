import {
  SET_SELECTED_PIZZA,
  SET_SELECTED_PIZZA_ENTITY,
} from "@/store/mutations-types";
import { uniqueId } from "lodash";

export default {
  namespaced: true,
  state: {
    selectedPizza: {
      name: "",
      doughId: null,
      sizeId: null,
      ingredients: [],
      sauceId: null,
    },
  },
  actions: {
    /**
     * Инициализирует начальное состояние сущности выбранной пиццы
     * @param initial заданное начальное состояние
     */
    initSelectedPizza({ commit, rootGetters }, initial = false) {
      const defaultPizza = {};
      if (!initial) {
        defaultPizza.id = uniqueId();
        defaultPizza.name = "";
        defaultPizza.doughId = rootGetters.dough[0].id;
        defaultPizza.sizeId = rootGetters.sizes[0].id;
        defaultPizza.ingredients = [];
        defaultPizza.sauceId = rootGetters.sauces[0].id;
        defaultPizza.count = 1;
      }
      commit(SET_SELECTED_PIZZA, initial || defaultPizza);
    },
    selectDough({ commit }, doughId) {
      commit(SET_SELECTED_PIZZA_ENTITY, {
        entity: "doughId",
        value: doughId,
      });
    },
    selectSize({ commit }, sizeId) {
      commit(SET_SELECTED_PIZZA_ENTITY, {
        entity: "sizeId",
        value: sizeId,
      });
    },
    selectSauce({ commit }, sauceId) {
      commit(SET_SELECTED_PIZZA_ENTITY, {
        entity: "sauceId",
        value: sauceId,
      });
    },
    selectIngredient({ state, dispatch }, { id, count }) {
      if (count < 1) {
        dispatch("deleteIngredient", { id });
        return;
      }

      const existIndex = state.selectedPizza.ingredients.findIndex(
        (ing) => ing.id === id
      );
      ~existIndex
        ? dispatch("updateIngredient", { id, count })
        : dispatch("addIngredient", { id, count });
    },
    addIngredient({ state, commit }, { id, count }) {
      commit(SET_SELECTED_PIZZA_ENTITY, {
        entity: "ingredients",
        value: [...state.selectedPizza.ingredients, { id, count }],
      });
    },
    updateIngredient({ state, commit }, { id, count }) {
      const selectedIngredients = state.selectedPizza.ingredients.filter(
        (ing) => ing.id !== id
      );
      commit(SET_SELECTED_PIZZA_ENTITY, {
        entity: "ingredients",
        value: [...selectedIngredients, { id, count }],
      });
    },
    deleteIngredient({ state, commit }, { id }) {
      const selectedIngredients = state.selectedPizza.ingredients.filter(
        (ing) => ing.id !== id
      );
      commit(SET_SELECTED_PIZZA_ENTITY, {
        entity: "ingredients",
        value: selectedIngredients,
      });
    },
    changePizzaName({ commit }, name) {
      commit(SET_SELECTED_PIZZA_ENTITY, {
        entity: "name",
        value: name,
      });
    },
  },
  mutations: {
    [SET_SELECTED_PIZZA](state, selectedPizza) {
      state.selectedPizza = selectedPizza;
    },

    [SET_SELECTED_PIZZA_ENTITY](state, { entity, value }) {
      state.selectedPizza[entity] = value;
    },
  },

  getters: {
    selectedDoughId: ({ selectedPizza }) => selectedPizza.doughId,
    selectedDough: (state, getters, rootState, rootGetters) =>
      rootGetters.doughEnum[getters.selectedDoughId],

    selectedSizeId: ({ selectedPizza }) => selectedPizza.sizeId,
    selectedSize: (state, getters, rootState, rootGetters) =>
      rootGetters.sizeEnum[getters.selectedSizeId],

    selectedSauceId: ({ selectedPizza }) => selectedPizza.sauceId,
    selectedSauce: (state, getters, rootState, rootGetters) =>
      rootGetters.sauceEnum[getters.selectedSauceId],

    selectedIngredientsIds: ({ selectedPizza }) => selectedPizza.ingredients,
    selectedIngredients: (state, getters, rootState, rootGetters) =>
      getters.selectedIngredientsIds.map(({ id, count }) => ({
        ...rootGetters.ingredientsEnum[id],
        count,
      })),

    pizzaName: ({ selectedPizza }) => selectedPizza.name,
    hasPizzaName: ({ selectedPizza }) => selectedPizza.name.length > 0,
    hasIngredients: ({ selectedPizza }) => selectedPizza.ingredients.length > 0,
  },
};
