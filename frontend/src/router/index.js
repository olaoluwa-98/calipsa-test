import Vue from "vue";
import Router from "vue-router";

import Login from "@/views/login";
// import Alarms from "@/views/alarms";
// import Alarm from "@/views/alarms/_id";

import { isUserLoggedIn } from "@/utils/auth";
import * as ROUTES from "./routes";

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((error) => {
    if (error && error.name != "NavigationDuplicated") throw error;
  });
};

Vue.use(Router);

// Separated into const so as to put route guards
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: ROUTES.ALARMS,
    },
    {
      path: ROUTES.LOGIN,
      name: "login",
      component: Login,
      meta: {
        title: "Login",
        requiresAuth: false,
      },
    },
    // {
    //   path: ROUTES.ALARMS,
    //   name: "alarms",
    //   component: Alarms,
    //   meta: {
    //     title: "View Alarms",
    //     requiresAuth: true,
    //   },
    // },
    // {
    //   path: ROUTES.ALARM,
    //   name: "alarm",
    //   component: Alarm,
    //   meta: {
    //     title: "View Alarm",
    //     requiresAuth: true,
    //   },
    // },
  ],
});

// Route Guards before every navigation
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth === true && !isUserLoggedIn()) {
    next(`/login?next=${to.path}`);
  } else if (requiresAuth === false && isUserLoggedIn()) {
    next({
      name: "alarms",
    });
  } else {
    next();
  }
});

router.afterEach((to) => {
  document.title = `${to.meta.title || "App"} | Calipsa Alarm Monitoring`;
});

export default router;
