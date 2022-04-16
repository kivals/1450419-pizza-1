export default [
  {
    path: "/",
    name: "IndexHome",
    component: () => import("@/views/Index"),
    meta: { layout: "AppLayoutMain" },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/Cart"),
    meta: { layout: "AppLayoutMain" },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("@/views/Orders"),
    meta: { layout: "AppLayoutUser", title: "История заказов" },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile"),
    meta: { layout: "AppLayoutUser", title: "Мои данные" },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login"),
    meta: { layout: "AppLayoutLogin" },
  },
  {
    path: "/success",
    name: "SuccessPopup",
    component: () => import("@/views/SuccessPopup.vue"),
    meta: { layout: "AppLayoutEmpty" },
  },
];
