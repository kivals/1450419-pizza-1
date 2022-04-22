import {
  SET_BUILDER,
  SET_SELECTED_PIZZA,
  SET_SELECTED_PIZZA_ENTITY,
} from "@/store/mutations-types";
import { uniqueId } from "lodash";
import { createIdEntryEnum } from "@/common/helpers/common.helper";

export default {
  namespaced: true,
  state: {
    builder: {
      dough: [],
      sauces: [],
      ingredients: [],
      sizes: [],
    },
    selectedPizza: {
      name: "",
      dough: null,
      size: null,
      ingredients: [],
      sauce: null,
    },
  },
  actions: {
    async fetchBuilder({ commit }) {
      const [dough, sizes, sauces, ingredients] = await Promise.all([
        this.$api.fetchDough(),
        this.$api.fetchSizes(),
        this.$api.fetchSauces(),
        this.$api.fetchIngredients(),
      ]);
      commit(SET_BUILDER, {
        dough,
        sauces,
        ingredients,
        sizes,
      });
    },
    /**
     * Инициализирует начальное состояние сущности выбранной пиццы
     * @param commit
     * @param state
     * @param initial заданное начальное состояние
     */
    initSelectedPizza({ commit, state }, initial) {
      const defaultPizza = {};
      if (!initial) {
        defaultPizza.id = uniqueId();
        defaultPizza.name = "";
        defaultPizza.dough = state.builder.dough[0].id;
        defaultPizza.size = state.builder.sizes[0].id;
        defaultPizza.ingredients = [];
        defaultPizza.sauce = state.builder.sauces[0].id;
        defaultPizza.count = 1;
      }
      commit(SET_SELECTED_PIZZA, initial || defaultPizza);
    },
    selectDough({ commit }, doughId) {
      commit(SET_SELECTED_PIZZA_ENTITY, {
        entity: "dough",
        value: doughId,
      });
    },
    selectSize({ commit }, sizeId) {
      commit(SET_SELECTED_PIZZA_ENTITY, {
        entity: "size",
        value: sizeId,
      });
    },
    selectSauce({ commit }, sauceId) {
      commit(SET_SELECTED_PIZZA_ENTITY, {
        entity: "sauce",
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
    [SET_BUILDER](state, builder) {
      state.builder = builder;
    },

    [SET_SELECTED_PIZZA](state, selectedPizza) {
      state.selectedPizza = selectedPizza;
    },

    [SET_SELECTED_PIZZA_ENTITY](state, { entity, value }) {
      state.selectedPizza[entity] = value;
    },
  },

  getters: {
    dough: ({ builder }) => builder.dough,
    sizes: ({ builder }) => builder.sizes,
    sauces: ({ builder }) => builder.sauces,
    ingredients: ({ builder }) => builder.ingredients,

    selectedDoughId: ({ selectedPizza }) => selectedPizza.dough,
    selectedDough: (_, { dough, selectedDoughId }) =>
      dough.find((d) => d.id === selectedDoughId),

    selectedSizeId: ({ selectedPizza }) => selectedPizza.size,
    selectedSize: (_, { sizes, selectedSizeId }) =>
      sizes.find((s) => s.id === selectedSizeId),

    selectedSauceId: ({ selectedPizza }) => selectedPizza.sauce,
    selectedSauce: (_, { sauces, selectedSauceId }) =>
      sauces.find((s) => s.id === selectedSauceId),

    selectedIngredientsIds: ({ selectedPizza }) => selectedPizza.ingredients,
    selectedIngredients: (_, { ingredients, selectedIngredientsIds }) =>
      ingredients
        .filter((ing) => selectedIngredientsIds.some((s) => s.id === ing.id))
        .map((selected) => ({
          ...selected,
          count: selectedIngredientsIds.find((s) => s.id === selected.id).count,
        })),

    pizzaName: ({ selectedPizza }) => selectedPizza.name,
    hasPizzaName: ({ selectedPizza }) => selectedPizza.name.length > 0,
    hasIngredients: ({ selectedPizza }) => selectedPizza.ingredients.length > 0,
    sizeEnum: (_, { sizes }) => createIdEntryEnum(sizes),
    sauceEnum: (_, { sauces }) => createIdEntryEnum(sauces),
    doughEnum: (_, { dough }) => createIdEntryEnum(dough),
    ingredientsEnum: (_, { ingredients }) => createIdEntryEnum(ingredients),
  },
};
