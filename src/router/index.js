import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Docsboard from "../views/Docsboard.vue";
import Docs from "../views/Docs.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/reader-doc",
  },
  {
    path: "/dashboard-default",
    name: "Reader",
    component: Dashboard,
  },
  {
    path: "/Docs",
    name: "Docs",
    component: Docs,
  },
  {
    path: "/Docsboard",
    name: "Docsboard",
    component: Docsboard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
