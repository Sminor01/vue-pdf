import { createRouter, createWebHistory } from "vue-router";
import DocsReader from "../views/pages/DocsReader.vue"
import DocsEditor from "../views/pages/DocsEditor.vue";
import Documents from "../views/pages/Documents.vue";
import DocumentsEditPage from "../views/pages/DocumentsEditPage.vue";
import DocumentsPagesView from "../views/pages/DocumentsPagesView.vue";
import DocumentsPreviewPage from "../views/pages/DocumentsPreviewPage.vue";
import DocumentsView from "../views/pages/DocumentsView.vue";

const routes = [
  {
    path: "/DocumentsView",
    name: "DocumentsView",
    component: DocumentsView,
  },
  {
    path: "/project/:projectId/edit/:pageId",
    name: "EditPage",
    redirect: "/DocumentsEditPage",
    params: { pageId: 'public' },
    component: DocumentsEditPage,
  },
  {
    path: "/project/:projectId/edit/:pageId",
    name: "PagesView",
    redirect: "/DocumentsPagesView",
    component: DocumentsPagesView,
  },
  {
    path: "/project/:projectId/preview/:pageId",
    name: "PreviewPage",
    redirect: "/DocumentsPreviewPage",
    component: DocumentsPreviewPage,
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
