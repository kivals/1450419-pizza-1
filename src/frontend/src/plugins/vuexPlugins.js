import apiService from "@/services/api.service";
import JwtService from "@/services/jwt.service";
import { ApiOrderService } from "@/services/api.order.service";

export default function (store) {
  store.$api = apiService;
  store.$api.orders = new ApiOrderService("orders");
  store.$jwt = JwtService;
}
