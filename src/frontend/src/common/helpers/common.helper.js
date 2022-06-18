import users from "@/static/user";
import { SET_AUTH, SET_AUTH_USER } from "@/store/mutations-types";

export const getFileNameFromPath = (path) => {
  return path.split("/").pop();
};

export const authenticateUser = (store) => {
  store.commit(`Auth/${SET_AUTH_USER}`, users[0]);
  store.commit(`Auth/${SET_AUTH}`, true);
};
