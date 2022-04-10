import apiService from "@/services/api.service";

export default function (store) {
  store.$api = apiService;
}
