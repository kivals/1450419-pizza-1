import { createLocalVue, mount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import Vuex from "vuex";
import Index from "@/views/Index";

const localVue = createLocalVue();
localVue.use(Vuex);

const mockSelectedPizza = {
  name: "mock-name",
  doughId: 2,
  sizeId: 2,
  ingredients: [
    { id: 1, count: 10 },
    { id: 2, count: 20 },
    { id: 3, count: 30 },
    { id: 4, count: 40 },
  ],
  sauceId: 1,
};

const fillSelectedPizzaStore = (store) => {
  store.dispatch("Builder/changePizzaName", mockSelectedPizza.name);
  store.dispatch("Builder/selectDough", mockSelectedPizza.doughId);
  store.dispatch("Builder/selectSize", mockSelectedPizza.sizeId);
  mockSelectedPizza.ingredients.forEach((ing) =>
    store.dispatch("Builder/selectIngredient", ing)
  );
  store.dispatch("Builder/selectSauce", mockSelectedPizza.sauceId);
};

describe("Index", () => {
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(Index, options);
  };

  beforeEach(async () => {
    store = generateMockStore();
    fillSelectedPizzaStore(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("check change selected pizza name", () => {
    createComponent({ localVue, store });
    const nameInput = wrapper.find('[data-set="change-name"]');
    const newInputValue = "alice";
    nameInput.setValue(newInputValue);
    expect(store.state.Builder.selectedPizza.name).toEqual(newInputValue);
  });

  it("check add pizza to cart", () => {
    createComponent({ localVue, store });
    wrapper.find('[data-set="change-name"]').setValue("alice");
    const button = wrapper.find('[data-set="button"]');
    button.trigger("click");
    expect(store.state.Cart.clientPizzas).toHaveLength(1);
  });
});
