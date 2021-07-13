import Vue from "vue";
import App from "./App.vue";

import "@/styles/main.scss";

import router from "@/router";
import store from "@/store";
import "@/plugins";

// VUE CONFIGURATION
Vue.config.productionTip = false;
const token = localStorage.getItem("authToken");
Vue.api.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

window.onunhandledrejection = (event) => {
  if (event.reason) {
    const { name, data } = event.reason;
    if (name === "NetworkException") {
      return;
    } else if (name === "NotAuthorizedException") {
      // TODO: cancel all axios requests.
      if (data && data.redirect_route) {
        app.$router
          .replace({
            path: data.redirect_route,
          })
          .catch(() => {});
      }
      return;
    } else if (name === "BadRequestException") {
      return;
    }
  }
  console.error("Error not handled properly", event.reason);
};

export default app;
