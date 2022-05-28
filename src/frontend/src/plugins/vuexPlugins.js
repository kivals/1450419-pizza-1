import apiService from "@/services/api.service";
import JwtService from "@/services/jwt.service";
import { ApiOrderService } from "@/services/api.order.service";
import { ApiAddressService } from "@/services/api.address.service";
import apiAuthService from "@/services/api.auth.service";

export default function (store) {
  store.$api = apiService;
  store.$api.auth = apiAuthService;
  store.$api.orders = new ApiOrderService("orders");
  store.$api.address = new ApiAddressService("addresses");
  store.$jwt = JwtService;
}
