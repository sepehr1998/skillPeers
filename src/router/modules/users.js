import Users from "@/layouts/users";

const usersRouter = [
  {
    path: "/users/:type/:like",
    name: "searchUser",
    props: true,
    component: Users,
  },
  {
    path: "/users",
    name: "usersList",
    component: Users,
  },
];

export default usersRouter;
