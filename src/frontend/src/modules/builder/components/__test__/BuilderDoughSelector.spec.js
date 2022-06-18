import { generateMockStore } from "@/store/mocks";
import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import AppSheet from "@/common/components/AppSheet";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("AppSheet", AppSheet);

describe("BuilderDoughSelector", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderDoughSelector, options);
  };

  beforeEach(async () => {
    store = generateMockStore();
    await store.dispatch("Builder/initSelectedPizza");
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("check right class name for label", () => {
    createComponent({ localVue, store });
    const firstLabel = wrapper.findAll("[data-test='label']").at(0);
    const secondLabel = wrapper.findAll("[data-test='label']").at(1);
    expect(firstLabel.attributes("class")).toContain("dough__input--light");
    expect(secondLabel.attributes("class")).toContain("dough__input--large");
  });

  it("check update selected dough in store", async () => {
    createComponent({ localVue, store });
    const firstInput = wrapper.findAll("[data-test='input']").at(0);
    const secondInput = wrapper.findAll("[data-test='input']").at(1);
    firstInput.trigger("click");
    expect(store.state.Builder.selectedPizza.doughId).toEqual(1);
    secondInput.trigger("click");
    expect(store.state.Builder.selectedPizza.doughId).toEqual(2);
  });
});

// Протестировать
/*
:class="`dough__input--${type}`"
@click="selectDough(id)"
 */
