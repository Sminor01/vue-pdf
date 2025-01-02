import EmployeesList from "@/views/components/EmployeesList.vue";
import DocsEditor from "@/views/DocsEditor.vue";
import ProjectPage from "@/views/ProjectPage.vue";
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
    path: "/DocsEditor",
    name: "Editor",
    component: DocsEditor,
  },
  {
    path: "/EmployeesList",
    name: "Список сотрудников",
    component: EmployeesList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
