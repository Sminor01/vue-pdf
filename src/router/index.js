import { createRouter, createWebHistory } from "vue-router";
import Docsboard from "../views/Docsboard.vue";
import Docs from "../views/Docs.vue";
import Documents from "../views/Documents.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/reader-doc",
  },
  {
    path: "/Documents",
    name: "Documents",
    component: Documents,
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
