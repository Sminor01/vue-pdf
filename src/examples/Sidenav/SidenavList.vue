<script setup>
//import { computed } from "vue";
import { useRoute } from "vue-router";
//import { useStore } from "vuex";

import SidenavItem from "./SidenavItem.vue";


//const store = useStore();
//const isRTL = computed(() => store.state.isRTL);

const getRoute = () => {
  const route = useRoute();
  const routeArr = route.path.split("/");
  return routeArr[1];
};
</script>
<template>
  <div
    class="collapse navbar-collapse w-auto h-auto h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">

      <li class="nav-item">
        <sidenav-item
          to="/ProjectPage"
          :class="getRoute() === 'ProjectPage' ? 'active' : ''"
          :navText="'Задачи / Проекты'"
        >
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/EmployeesList"
          :class="getRoute() === 'EmployeesList' ? 'active' : ''"
          :navText="'Список сотрудников'"
        >
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/DocsEditor"
          :class="getRoute() === 'Editor' ? 'active' : ''"
          :navText="' Аналитика '"
        >
          <template v-slot:icon>
            <i
              class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>
    </ul>
  </div>
</template>
