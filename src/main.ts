import Vue from "vue";
import App from "@/App.vue";
import "@/registerServiceWorker";
import router from "@/router";
import store from "@/store";
import "@/assets/css/styles.scss";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@forevolve/bootstrap-dark/dist/css/bootstrap-dark.min.css";
Vue.prototype.$mapFields = Vue;

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
