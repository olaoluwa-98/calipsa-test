import Vue from "vue";

import { renderDate } from "@/utils/time";

const Utils = {
  install(Vue) {
    Vue.prototype.$utils = {
      renderDate,
    };
  },
};
Vue.use(Utils);
