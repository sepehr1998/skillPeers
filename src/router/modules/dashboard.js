import Dashboard from "@/layouts/dashboard";

const dashboardRouter = [
    {
        path: "/dashboard",
        name: "Dashboard",
        redirect: "/profile",
        component: Dashboard,
        children: [
            {
                path: "/profile",
                name: "profile",
                props: true,
                component: () => import("@/views/Dashboard/UserProfile"),
            },
            {
                path: "/management",
                name: "Management",
                component: () => import("@/views/Dashboard/Management"),
            },
            {
                path: "/friends",
                name: "friends",
                component: () => import("@/views/Dashboard/Friends"),
            },
            {
                path: "/projects",
                name: "projects",
                component: () => import("@/views/Dashboard/Projects"),
            },
            {
                path: "/security",
                name: "security",
                component: () => import("@/views/Dashboard/Security"),
            },
            {
                path: "/how-to-use",
                name: "HowToUse",
                component: () => import("@/views/Dashboard/HowToUse"),
            },
            {
                path: "/foundation",
                name: "Foundation",
                component: () => import("@/views/Dashboard/Foundation"),
            },
            {
                path: "/about-us",
                name: "About Us",
                component: () => import("@/views/Dashboard/AboutUs"),
            },
            {
                path: "/messages",
                name: "messages",
                component: () => import("@/views/Dashboard/Messages"),
            },
        ],
    },
];

export default dashboardRouter;
