import AppSheet from "@/common/components/AppSheet";
import { shallowMount } from "@vue/test-utils";
import AppTitle from "@/common/components/AppTitle";

describe("AppSheet", () => {
  const slots = { content: "slot content" };
  const stubs = {
    AppTitle,
  };
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppSheet, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("It has slot content", () => {
    createComponent({ stubs, slots });
    expect(wrapper.find(".sheet__content").html()).toContain(slots.content);
  });
});
