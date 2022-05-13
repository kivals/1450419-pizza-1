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
    return this._prepareResponse(data);
  }

  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }

  /**
   * Готовим сущность-ответа для клиентской части
   * @param orderResponse сырой объект из бекэнда
   * @returns
   * {
   *     id: '',
   *     client: {
   *       userId: '',
   *       //TODO тут пока не понятно, что приходит
   *       address: {},
   *       phone: ''
   *     },
   *     pizzas: [
   *       {
   *         id: '',
   *         name: '',
   *         doughId: '',
   *         sizeId: '',
   *         sauceId: '',
   *         count: '',
   *         ingredients: [
   *           {
   *             id: '',
   *             count: '',
   *           }
   *         ]
   *       }
   *     ],
   *     extraProducts: [
   *       {
   *         id: '',
   *         count: '',
   *       }
   *     ]
   *   }
   * @private
   */
  _prepareResponse(orderResponse) {
    return orderResponse.map((serverOrder) => ({
      id: serverOrder.id,
      user: this._getUserDataFromResponse(serverOrder),
      pizzas: this._getPizzasFromResponse(serverOrder),
      orderMisc: this._getExtraProductsFromResponse(serverOrder),
    }));
  }

  _getUserDataFromResponse(orderData) {
    return {
      id: orderData.userId,
      address: orderData.addressId,
      phone: orderData.phone,
    };
  }

  _getPizzasFromResponse(orderData) {
    return orderData.orderPizzas.map((serverPizza) => ({
      id: serverPizza.id,
      name: serverPizza.name,
      doughId: serverPizza.doughId,
      sizeId: serverPizza.sizeId,
      sauceId: serverPizza.sauceId,
      count: serverPizza.quantity,
      ingredients: serverPizza.ingredients.map(
        ({ ingredientId, quantity }) => ({
          id: ingredientId,
          count: quantity,
        })
      ),
    }));
  }

  _getExtraProductsFromResponse(orderData) {
    return (
      orderData.orderMisc?.map(({ miscId, quantity }) => ({
        id: miscId,
        count: quantity,
      })) || []
    );
  }

  _prepareRequest({ userId = null, phone, address, pizzas, misc }) {
    return {
      userId,
      phone,
      address: this._prepareAddress(address),
      pizzas: pizzas.map((pizza) => ({
        name: pizza.name,
        sauceId: pizza.sauceId,
        doughId: pizza.doughId,
        sizeId: pizza.sizeId,
        quantity: pizza.count,
        ingredients: pizza.ingredients.map(({ id, count }) => ({
          ingredientId: id,
          quantity: count,
        })),
      })),
      misc: misc.map(({ id, count }) => ({
        miscId: id,
        quantity: count,
      })),
    };
  }

  _prepareAddress(address) {
    return !address?.street || !address?.building || !address?.flat
      ? null
      : address;
  }
}
