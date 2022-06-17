import { createLocalVue, mount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import BuilderIngredientItem from "@/modules/builder/components/BuilderIngredientItem";
import Vuex from "vuex";
import AppDrag from "@/common/components/AppDrag";
import ItemCounter from "@/common/components/ItemCounter";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("AppDrag", AppDrag);
localVue.component("ItemCounter", ItemCounter);

describe("BuilderIngredientItem", () => {
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientItem, options);
  };

  beforeEach(async () => {
    store = generateMockStore();
    await store.dispatch("Builder/initSelectedPizza");
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("check right class for span element", () => {
    const propsData = {
      ingredient: { ...store.state.appData.ingredients[0] },
    };
    createComponent({ propsData, localVue, store });
    const span = wrapper.find("[data-test='span']");
    expect(span.attributes("class")).toContain(
      `filling--${store.state.appData.ingredients[0].type}`
    );
  });

  it("add new ingredient to selected", () => {
    const ingredient = { ...store.state.appData.ingredients[0] };
    const propsData = {
      ingredient,
    };

    createComponent({ propsData, localVue, store });
    const itemCounter = wrapper.findComponent(ItemCounter);
    itemCounter.vm.$emit("change", 10);
    expect(store.state.Builder.selectedPizza.ingredients[0]).toEqual({
      id: ingredient.id,
      count: 10,
    });
  });

  it("update exist count ingredient", () => {
    const ingredient = { ...store.state.appData.ingredients[0] };
    const propsData = {
      ingredient,
    };

    createComponent({ propsData, localVue, store });
    const itemCounter = wrapper.findComponent(ItemCounter);
    // Add new ingredient
    itemCounter.vm.$emit("change", 10);
    // Update
    itemCounter.vm.$emit("change", 100);
    expect(store.state.Builder.selectedPizza.ingredients[0]).toEqual({
      id: ingredient.id,
      count: 100,
    });
  });

  it("delete exist ingredient if count equal 0", () => {
    const ingredient = { ...store.state.appData.ingredients[0] };
    const propsData = {
      ingredient,
    };

    createComponent({ propsData, localVue, store });
    const itemCounter = wrapper.findComponent(ItemCounter);
    // Add new ingredient
    itemCounter.vm.$emit("change", 10);
    // Update
    itemCounter.vm.$emit("change", 0);
    expect(store.state.Builder.selectedPizza.ingredients).toHaveLength(0);
  });
});
