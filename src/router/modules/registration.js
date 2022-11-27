import Registration from "@/layouts/registration";
import Account from "@/layouts/registration/components/account";
import Confirm from "@/layouts/registration/components/confirm";
import ForgotPassword from "@/layouts/registration/components/forgotPass";

const registrationRouter = [
  {
    path: "/registration",
    redirect: "/registration/account/login",
    component: Registration,
    children: [
      {
        path: "account/:regType",
        props: true,
        component: Account,
      },
      {
        path: "confirm",
        component: Confirm,
      },
      {
        path: "forgot-password",
        component: ForgotPassword,
      },
    ],
  },
];
export default registrationRouter;
