import { ApiBaseService } from "@/services/api.base.service";

export class ApiOrderService extends ApiBaseService {
  constructor(resource) {
    super(resource);
  }

  async createOrder({ userId, phone, address, pizzas, misc }) {
    return await super.post(
      this._prepareRequest({ userId, phone, address, pizzas, misc })
    );
  }

  async getOrders() {
    const orders = await super.fetch();
    return this._prepareResponse(orders);
  }

  async deleteOrder(id) {
    await super.delete(id);
  }

  /**
   * Готовим сущность-ответа для клиентской части
   * @param orderResponse сырой объект из бекэнда
   * @returns
   * {
   *     id: '',
   *     client: {
   *       userId: '',
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
      address: address && this._prepareAddress(address),
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

  _prepareAddress({ street, building, flat }) {
    return {
      street,
      building,
      flat,
    };
  }
}
