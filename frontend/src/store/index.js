import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth.module";
import alarm from "./modules/alarm.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    alarm,
  },
});
