import { createStore } from "vuex";
import ProjectsStore from './modules/Projects';
import ProjectPagesStore from './modules/ProjectPages';
import EditPageStore from './modules/EditPage';
import InputModalStore from './modules/modals/inputModal';
import OptionsModalStore from './modules/modals/optionsModal';
import PreviewPage from "./modules/PreviewPage";

export default createStore({
  modulas: {
    EditPageStore,
    PreviewPage,
    ProjectPagesStore,
    ProjectsStore,

    OptionsModalStore,
    InputModalStore
  },
  state: {
    hideConfigButton: false,
    isPinned: false,
    showConfig: false,
    sidebarType: "bg-white",
    isRTL: false,
    mcolor: "",
    darkMode: false,
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    layout: "default",
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    sidebarMinimize(state) {
      let sidenav_show = document.querySelector("#app");
      if (state.isPinned) {
        sidenav_show.classList.add("g-sidenav-hidden");
        sidenav_show.classList.remove("g-sidenav-pinned");
        state.isPinned = false;
      } else {
        sidenav_show.classList.add("g-sidenav-pinned");
        sidenav_show.classList.remove("g-sidenav-hidden");
        state.isPinned = true;
      }
    },
    sidebarType(state, payload) {
      state.sidebarType = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
  },
  getters: {},
});
