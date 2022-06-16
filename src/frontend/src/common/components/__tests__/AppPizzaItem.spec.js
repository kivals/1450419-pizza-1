import { createLocalVue, mount } from "@vue/test-utils";
import AppPizzaItem from "@/common/components/AppPizzaItem";
import { generateMockStore } from "@/store/mocks";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AppPizzaItem", () => {
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(AppPizzaItem, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });


  it("is rendered", () => {
    let propsData = {
      name: "name",
      sizeId: 1,
      sauceId: 2,
      doughId: 4,
      ingredients: [],
    };
    createComponent({ propsData, localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("is rendered2", () => {
    let propsData = {
      name: "name",
      sizeId: 1,
      sauceId: 2,
      doughId: 1,
      ingredients: [],
    };

    createComponent({ propsData, localVue, store });
    const name = wrapper.find('[data-test="name"]');
    const doughInfo = wrapper.find('[data-test="dough-info"]');
    const sauceInfo = wrapper.find('[data-test="sauce-info"]');
    expect(name.html()).toContain(propsData.name);
    expect(doughInfo.html()).toContain("23 см, на тонком тесте");
    expect(sauceInfo.html()).toContain("Сливочный");
  });
});
