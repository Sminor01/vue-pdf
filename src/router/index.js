import { createRouter, createWebHistory } from "vue-router";
import DocsReader from "../views/pages/DocsReader.vue"
import DocsEditor from "../views/pages/DocsEditor.vue";
import Documents from "../views/pages/Documents.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/Documents",
  },
  {
    path: "/Documents",
    name: "Documents",
    component: Documents,
  },
  {
    path: "/DocsEditor",
    name: "Editor",
    component: DocsEditor,
  },
  {
    path: "/DocsReader",
    name: "Reader",
    component: DocsReader,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
