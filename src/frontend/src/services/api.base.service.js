import axios from "@/plugins/axios";

export class ApiBaseService {
  #resource;
  constructor(resource) {
    this.#resource = resource;
  }

  async fetch() {
    const { data } = await axios.get(this.#resource);
    return data;
  }

  async post(body) {
    const { data } = await axios.post(this.#resource, body);
    return data;
  }

  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }

  async put(id, body) {
    const { data } = await axios.put(`${this.#resource}/${id}`, body);
    return data;
  }
}
