import Vue from "vue";
import apiInstance from "@/api";
const api = {
  install(Vue) {
    Vue.prototype.$api = Vue.api = apiInstance;
  }
};

Vue.use(api);
