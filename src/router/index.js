import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import homeRouter from "./modules/home";
import profileRouter from "./modules/userProfile";
import registrationRouter from "./modules/registration";
import dashboardRouter from "./modules/dashboard";
import usersRouter from "./modules/users";
import termAndConditionsRouter from "./modules/terms";
import policyRouter from "./modules/policy";
import disclaimersRouter from "./modules/disclaimers";

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      ...homeRouter,
      ...registrationRouter,
      ...dashboardRouter,
      ...profileRouter,
      ...usersRouter,
      ...termAndConditionsRouter,
      ...policyRouter,
      ...disclaimersRouter,
      {
        path: "*",
        redirect: "/home",
      },
    ],
  });

const router = createRouter();
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;

