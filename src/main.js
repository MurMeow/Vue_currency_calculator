import Vue from "vue";
import "materialize-css/dist/js/materialize.min";
import "./registerServiceWorker";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import localizeFilter from "./filters/localize.filter";
import Loader from "./components/Loader";
import Paginate from "vuejs-paginate";

Vue.config.productionTip = false;

Vue.filter("localize", localizeFilter);
Vue.component("Loader", Loader);
Vue.component("Paginate", Paginate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
