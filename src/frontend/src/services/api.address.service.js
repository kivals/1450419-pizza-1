import axios from "@/plugins/axios";

// TODO подумать над наследованием или абстрактным классом
export class ApiAddressService {
  #resource;
  constructor(resource) {
    this.#resource = resource;
  }

  async getAddresses() {
    const { data } = await axios.get(this.#resource);
    return data;
  }

  async post(address) {
    const { data } = await axios.post(this.#resource, address);
    return data;
  }

  async put(address) {
    const { data } = await axios.put(
      `${this.#resource}/${address.id}`,
      address
    );
    return data;
  }

  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }
}
