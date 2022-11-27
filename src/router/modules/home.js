import Home from "@/layouts/home";

const homeRouter = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
];

export default homeRouter;
