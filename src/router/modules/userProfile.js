import UserProfile from "@/layouts/userProfile";

const userProfileRouter = [
  {
    path: "/userprofile/:userId",
    name: "userprofile",
    props: true,
    component: UserProfile,
  },
];

export default userProfileRouter;
