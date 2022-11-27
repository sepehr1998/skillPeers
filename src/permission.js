import router from "./router";
import store from "./store";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const regPaths = [
  "/registration",
  "/registration/forgot-password",
  "/registration/confirm",
  "/registration/account/login",
  "/registration/account/signup",
  "/terms",
  "/policy",
  "/disclaimers",
  "/privacy",
];
const globalWhitelist = [...regPaths, "/home"];
const globalStartWithList = ["/search-result", "/users"];

router.beforeEach(async (to, from, next) => {
  console.log("Start Routing", to);
  NProgress.start();
  document.title = "SkillPeers";

  const hasToken = getToken();

  // if (hasToken == "ali") next();
  // else next();

  if (hasToken) {
    console.log("redirect",to);
    console.log("redirect2",from);
    if (regPaths.indexOf(to.path) > 0 && to.path != "/registration/confirm"
        && to.path != "/terms"  && to.path != "/policy" && to.path != "/disclaimers"/*on confirm mode*/) {
      next("/home");
    } else {
      try {
        await store.dispatch("user/getInfo");
        if (store.getters.userConfirmed) {
          if (to.path == "/registration/confirm") {
            next("/home");
          } else {
            next();
          }
        } else {
          if (
            globalWhitelist.length == 0 ||
            globalWhitelist.indexOf(to.path) !== -1 ||
            globalStartWithList.filter((path) => to.path.startsWith(path))
              .length > 0
          ) {
            next();
          } else {
            if (to.path.startsWith("/registration/confirm")) {
              next();
            } else {
              next(`/registration/confirm?redirect=${to.path}`);
            }
            NProgress.done();
          }
        }
      } catch (err) {
        console.warn("problem while getting user info: ", err);
        await store.dispatch("user/resetToken");
        console.error(err || "Has Error");
        next("/home");
      }
    }
  } else {
    if (
      globalWhitelist.length == 0 ||
      globalWhitelist.indexOf(to.path) !== -1 ||
      globalStartWithList.filter((path) => to.path.startsWith(path)).length > 0
    ) {
      next();
    } else {
      next(`/registration/account/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
