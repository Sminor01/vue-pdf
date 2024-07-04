import { createRouter, createWebHistory } from "vue-router";
import DocsReader from "../views/DocsReader.vue";
import DocsEditor from "../views/DocsEditor.vue";
import Documents from "../views/Documents.vue";
import DocsEditorView from "../views/components/DocsEditorView.vue";
import EditorEditPage from "../views/components/EditorEditPage.vue";
import EditorPagesView from "../views/components/EditorPagesView.vue";
import EditorPreviewPage from "../views/components/EditorPreviewPage.vue";
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
  {
    path: "/DocsEditorView",
    name: "DocsEditorView",
    component: DocsEditorView,
  },
  {
      path: "/project/:projectId",
      name: "EditorPagesView",
      params: { projectId: 'public' },
      component: EditorPagesView,
  },
  {
      path: "/project/:projectId/edit/:pageId",
      name: "EditorEditPage",
      params: { pageId: 'public' },
      component: EditorEditPage,
  },
  {
      path: "/project/:projectId/preview/:pageId",
      name: "EditorPreviewPage",
      component: EditorPreviewPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
