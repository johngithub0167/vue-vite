import router from "./index";

// import { useUserStore } from "@/store/user";

import pinia from "@/store";
import { useUserStore } from "@/store/user";
const userStroe = useUserStore(pinia);

// const userStroe = useUserStore();

const DynamicRoute = [
  {
    path: "/",
    name: "container",
    component: () => import("@/views/layout.vue"),
    redirect: "/home",
    meta: {
      auth: true,
      name: "结构",
    },
    children: [
      {
        path: "/home",
        component: () => import("@/views/home.vue"),
        name: "home",
        meta: {
          name: "首页",
          icon: "icon-name",
        },
      },
      {
        path: "/about",
        name: "about",
        component: () => import("@/views/about.vue"),
      },
    ],
  },
];

const dynamicRouter = (routes: any[]) => {
  const list: any[] = [];
  routes.forEach((itemRouter, index) => {
    list.push({
      ...itemRouter,
      component: itemRouter.component,
    });
    // 是否存在子集
    if (itemRouter.children && itemRouter.children.length > 0) {
      list[index].children = dynamicRouter(itemRouter.children);
    }
  });

  return list;
};

let registerRouteFresh: boolean = true;
router.beforeEach((to, from, next) => {
  console.log(router.options.routes, "routesroutes");
  if (!userStroe.token && to.name != "login") {
    next("/login");
  } else if (to.name == "login") {
    next();
  } else {
    if (to.name != "login") {
      if (userStroe.authList.length > 0) {
        next();
      } else {
        userStroe
          .getAuth()
          .then(() => {
            if (registerRouteFresh) {
              dynamicRouter(DynamicRoute).forEach((item) => {
                router.addRoute(item);
              });
              // console.log(router.options, "routesroutes");
              router.options.routes =
                router.options.routes.concat(DynamicRoute);
              next({ ...to, replace: true });
              registerRouteFresh = false;
            } else {
              next();
            }
          })
          .catch((e) => {
            next("/");
            console.log(e);
          });
      }
    } else {
      next();
    }
  }
});
