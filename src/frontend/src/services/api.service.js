import axios from "@/plugins/axios";
import { normalizeDough } from "@/common/helpers";

export const getDough = async () => {
  const { data } = await axios.get("dough");
  return data.map(normalizeDough);
};
