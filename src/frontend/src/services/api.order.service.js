import axios from "@/plugins/axios";

export class ApiOrderService {
  #resource;
  constructor(resource) {
    this.#resource = resource;
  }

  async post({ userId, phone, address, pizzas, misc }) {
    const { data: newOrder } = await axios.post(
      this.#resource,
      this._prepareRequest({ userId, phone, address, pizzas, misc })
    );
    return newOrder;
  }

  async getOrders() {
    const { data } = await axios.get(this.#resource);
    return data;
  }

  _prepareRequest({ userId = null, phone, address, pizzas, misc }) {
    return {
      userId,
      phone,
      address: this._prepareAddress(address),
      pizzas: pizzas.map((pizza) => ({
        name: pizza.name,
        sauceId: pizza.sauce,
        doughId: pizza.dough,
        sizeId: pizza.size,
        quantity: pizza.count,
        ingredients: pizza.ingredients.map((ing) => ({
          ingredientId: ing.id,
          quantity: ing.count,
        })),
      })),
      misc: misc.map((m) => ({
        miscId: m.id,
        quantity: m.count,
      })),
    };
  }
  _prepareAddress(address) {
    return !address?.street || !address?.building || !address?.flat
      ? null
      : address;
  }
}
