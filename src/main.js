import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import routes from "./Routes";
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import "./httpService";
import store from "./Store/Vuex";

Vue.use(BootstrapVue);
Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history", // to removes # from url
  routes: routes
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store
}).$mount("#app");
