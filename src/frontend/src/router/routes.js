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
    meta: { layout: "AppLayoutMain" },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile"),
    meta: { layout: "AppLayoutMain" },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login"),
    meta: { layout: "AppLayoutLogin" },
  },
];
