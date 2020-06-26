import Vue from "vue";
import Router from "vue-router";
import Currencies from "../views/Currencies.vue";
import Converter from "../views/Converter.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Currencies",
      component: () => import("../views/Currencies")
    },
    {
      path: "/converter",
      name: "Converter",
      component: () => import("../views/Converter")
    }
  ]
});

export default router;
