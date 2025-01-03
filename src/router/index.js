import AnaliticsPage from "../../src/views/pages/AnaliticsPage.vue"
import EmploeeysPage from "@/views/pages/EmploeeysPage.vue";
import ProjectPage from "@/views/pages/ProjectPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/ProjectPage",
  },
  {
    path: "/ProjectPage",
    name: "Задачи и проекты",
    component: ProjectPage,
  },
  {
    path: "/AnaliticsPage",
    name: "Аналитика",
    component: AnaliticsPage,
  },
  {
    path: "/EmploeeysPage",
    name: "Список сотрудников",
    component: EmploeeysPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
