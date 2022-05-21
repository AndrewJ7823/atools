import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/GCal",
  },
  {
    path: "/GCal",
    name: "GCal",
    component: () => import(/* webpackChunkName: "gcal" */ "@/pages/GCal.vue"),
  },
  {
    path: "/atools/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/pages/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
