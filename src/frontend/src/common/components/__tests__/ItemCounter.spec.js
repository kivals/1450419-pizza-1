import { shallowMount } from "@vue/test-utils";
import ItemCounter from "@/common/components/ItemCounter";

describe("ItemCounter", () => {
  let propsData = {
    counter: 1,
    maxCount: 10,
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(ItemCounter, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("button plus emit change event", async () => {
    createComponent({ propsData });
    const button = wrapper.find(".counter__button--plus");
    await button.trigger("click");
    expect(wrapper.emitted().change).toBeTruthy();
  });

  it("button minus emit change event", async () => {
    createComponent({ propsData });
    const button = wrapper.find(".counter__button--minus");
    await button.trigger("click");
    expect(wrapper.emitted().change).toBeTruthy();
  });

  it("button minus is disabled", async () => {
    let propsData = {
      counter: 0,
      maxCount: 10,
    };
    createComponent({ propsData });
    const button = wrapper.find(".counter__button--minus");
    expect(button.attributes("disabled")).toEqual("disabled");
    await button.trigger("click");
    expect(wrapper.emitted().change).not.toBeTruthy();
  });

  it("button plus is disabled", async () => {
    let propsData = {
      counter: 10,
      maxCount: 10,
    };
    createComponent({ propsData });
    const button = wrapper.find(".counter__button--plus");
    expect(button.attributes("disabled")).toEqual("disabled");
    await button.trigger("click");
    expect(wrapper.emitted().change).not.toBeTruthy();
  });
});
