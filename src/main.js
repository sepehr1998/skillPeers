import Vue from "vue";

import App from "./App";
import store from "./store";
import router from "./router";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "./permission"; // permission control

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";

import CustomDashboard from "./plugins/custom-dashboard";

Vue.config.productionTip = false;
Vue.use(CustomDashboard);

Vue.use(ElementUI);
import JwPagination from "jw-vue-pagination";
Vue.component("jw-pagination", JwPagination);

new Vue({
  el: "#app",
  router,
  store,
  data: function() {
    return {
      switch1: true,
      switch2: false,
      switch3: false,
      switch4: false
    };
  },
  // vuetify,
  render: (h) => h(App),
});
