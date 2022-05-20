import { ApiBaseService } from "@/services/api.base.service";

export class ApiAddressService extends ApiBaseService {
  constructor(resource) {
    super(resource);
  }

  async getAddresses() {
    return await super.fetch();
  }

  async createAddress(address) {
    return await super.post(address);
  }

  async editAddress(address) {
    return await super.put(address.id, address);
  }

  async delete(id) {
    await super.delete(id);
  }
}
