import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import OrderItem from "@/modules/orders/components/OrderItem";
import { authenticateUser } from "@/common/helpers/common.helper";
import { SET_ORDERS } from "@/store/mutations-types";
import OrderHeader from "@/modules/orders/components/OrderHeader";
import flushPromises from "flush-promises";

const localVue = createLocalVue();
localVue.use(Vuex);

const mockOrders = [
  {
    id: 1,
    user: {
      id: "5809941f-dd51-4cae-b947-da842bd516cd",
      address: null,
      phone: "123",
    },
    pizzas: [
      {
        id: 1,
        name: "11111",
        doughId: 1,
        sizeId: 2,
        sauceId: 1,
        count: 1,
        ingredients: [
          { id: 1, count: 1 },
          { id: 2, count: 1 },
          { id: 3, count: 1 },
        ],
        price: 460,
      },
    ],
    orderMisc: [],
  },
  {
    id: 2,
    pizzas: [
      {
        id: 2,
        name: "22222",
        doughId: 1,
        sizeId: 3,
        sauceId: 1,
        count: 2,
        ingredients: [
          { id: 1, count: 1 },
          { id: 5, count: 1 },
        ],
        price: 836,
      },
    ],
    orderMisc: [],
  },
];

const mocks = {
  $router: {
    push: jest.fn(),
  },
  $route: {
    params: { id: 1 },
  },
};

const fillOrderStore = (store) => {
  store.commit(`Orders/${SET_ORDERS}`, mockOrders);
};

describe("OrderItem", () => {
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(OrderItem, options);
  };

  beforeEach(async () => {
    store = generateMockStore();
    store.$api.orders.deleteOrder = jest.fn(() => Promise.resolve());
    fillOrderStore(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("component rendered", () => {
    authenticateUser(store);
    const propsData = {
      orderId: mockOrders[0].id,
    };
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('[data-test="name"]').html()).toContain(
      mockOrders[0].pizzas[0].name
    );
  });

  it("redirect to cart", () => {
    authenticateUser(store);
    const propsData = {
      orderId: mockOrders[0].id,
    };
    createComponent({ localVue, store, propsData, mocks });
    const orderHeader = wrapper.findComponent(OrderHeader);
    orderHeader.vm.$emit("repeat-order");
    expect(mocks.$router.push).toHaveBeenCalledWith("/cart");
  });

  it("repeating order", () => {
    authenticateUser(store);
    const propsData = {
      orderId: mockOrders[0].id,
    };
    createComponent({ localVue, store, propsData, mocks });
    const orderHeader = wrapper.findComponent(OrderHeader);
    orderHeader.vm.$emit("repeat-order");
    expect(store.state.Cart.clientPizzas).toEqual(mockOrders[0].pizzas);
    expect(store.state.Cart.selectedMisc).toEqual(mockOrders[0].orderMisc);
  });

  it("delete order", async () => {
    authenticateUser(store);
    const propsData = {
      orderId: mockOrders[0].id,
    };
    createComponent({ localVue, store, propsData, mocks });
    const orderHeader = wrapper.findComponent(OrderHeader);
    orderHeader.vm.$emit("delete-order");
    await flushPromises();
    expect(store.state.Orders.orders).toHaveLength(1);
  });
});

// Протестировать
/*
return this.getOrderById(this.orderId);
      @delete-order="deleteOrderHandler"
      @repeat-order="repeatOrderHandler"
      return this.getOrderById(this.orderId);
      this.backToCart
      this.$router.push("/cart");
 */
