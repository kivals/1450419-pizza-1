import apiService from "@/services/api.service";
import JwtService from "@/services/jwt.service";

export default function (store) {
  store.$api = apiService;
  store.$jwt = JwtService;
}
