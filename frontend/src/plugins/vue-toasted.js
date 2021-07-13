import Vue from "vue";
import Toasted from "vue-toasted";

const options = {
  position: "top-center",
  duration: 5000,
  fitToScreen: true,
  className: "toast",
  theme: "bubble",
  keepOnHover: true,
  singleton: true,
};
Vue.use(Toasted, options);
