import { shallowMount } from "@vue/test-utils";
import AppTitle from "@/common/components/AppTitle";
import { titleSizes } from "@/common/constants";

describe("AppTitle", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppTitle, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Title has h2 tag", () => {
    let propsData = {
      size: titleSizes.SMALL,
    };
    createComponent({ propsData });
    expect(wrapper.element.tagName).toEqual("H2");
  });

  it("Title has h1 tag", () => {
    let propsData = {
      size: titleSizes.BIG,
    };
    createComponent({ propsData });
    expect(wrapper.element.tagName).toEqual("H1");
  });

  it("Title set default tag h2", () => {
    let propsData = {};
    createComponent({ propsData });
    expect(wrapper.element.tagName).toEqual("H2");
  });
});
