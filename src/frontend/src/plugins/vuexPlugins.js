import { getDough } from "@/services/api.service";

export default function (store) {
  store.$api = {
    getDough: getDough,
  };
}
