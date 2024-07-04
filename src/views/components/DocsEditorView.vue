<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import InputModalLayout from '../../components/modals/InputModal.vue';
import ProjectsList from '../../components/ProjectsView/ProjectsList.vue';
export default {
  name: 'EditorView',

  components: {
    InputModalLayout,
    ProjectsList,
  },

  data() {
    return {
      inputValue: "",
      error: false
    }
  },

  computed: {
    ...mapGetters( [
      'allProjects',
      'getModalContent',
      'getModalState'
    ] ),
  },

  watch: {
    getModalContent: function () {
      this.inputValue = this.getModalContent.projectTitle;
    }
  },

  mounted() {
    this.fetchProjects();
  },

  methods: {
    ...mapActions( ['fetchProjects'] ),
    ...mapMutations( [
      'updateProjects',
      'addProject',
      'renameProject',
      'changeModalState'
    ] ),

    checkInputValue( inputValue, currentValue ) {
      for (let projectItem of this.allProjects) {
        let projectTitle = projectItem.title.toLowerCase().split(" ").join("");
        let newProjectTitle = inputValue.toLowerCase().split(" ").join("");

        if ((projectTitle === newProjectTitle) && (newProjectTitle !== currentValue.toLowerCase().split(" ").join(""))) {
          this.error = true;
          break;
        }
        else {
          this.error = false;
        }
      }
    },

    applyButtonHandler( inputValue, id ) {
      if (this.getModalContent.action === "Create") {
        this.addProject(inputValue);
      }
      else if (this.getModalContent.action === "Rename") {
        this.renameProject({
          newTitle: inputValue,
          id: id,
        });
      }
      this.closeModal();
    },

    closeModal() {
      this.inputValue = "";
      this.error = false;
      this.changeModalState();
    }
  },
}
</script>

<template>

  <div class="card">
    <div class="card-header card-position pb-0">
      <h6>Список документов</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Наименование документа
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Тема
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Состояние
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Дата
              </th>
              <th class="text-center text-uppercase text-xxs font-weight-border opacity-7 text-secondary opacity-7">
              </th>
            </tr>
          </thead>
          <tbody>
            
            <ProjectsList :all-projects="allProjects" /> 
      
            <InputModalLayout
              id="modal"
              :class="{'modal': getModalState, 'visually-hidden': !getModalState}">
            </InputModalLayout>
          
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <Header class="header">
    <template #leftItems>
      <div class="left-items col-10 col-md-6">
        <div class="left-items__logo">
          <router-link
            to="/"
            aria-label="Go to homepage"
          >
            <img
              class="icon"
              src="@/assets/svg/logo.svg"
              alt="Logotype"
            >
          </router-link>
        </div>

        <nav class="nav">
          <ul class="nav-list">
            <li class="nav-list__item">
              <router-link
                to="/"
                class="link"
              >
                Мои сайты
              </router-link>
            </li>
            <li class="nav-list__item">
              <router-link
                to="/profile"
                class="link"
              >
                Профиль
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </template>
    <template #rightItems>
      <div class="right-items col-2 col-md-6">
        <ul class="nav-list">
          <li class="nav-list__item">
            <a
              href="javascript:void(0);"
              class="link"
            >Выйти</a>
          </li>
        </ul>
      </div>
    </template>
  </Header>
  <ProjectList :all-projects="allProjects" />
  <Footer />

    <InputModalLayout
      id="modal"
      :class="{'modal': getModalState, 'visually-hidden': !getModalState}"
    >
    <template #modalHead>
      <h6>{{ getModalContent.title }}</h6>
      <button
        class="close"
        aria-label="Close modal"
        @click="closeModal"
      />
    </template>
    <template #modalBody>
      <label for="text-input">Название</label>
      <input
        id="text-input"
        v-model="inputValue"
        placeholder="Project 1"
        class="modal-input_js"
        :class="{'error': error}"
        type="text"
        @input="checkInputValue(inputValue, getModalContent.projectTitle )"
      >
      <p>
        Используется только внутри Тильды.
      </p>
    </template>
    <template #modalFooter>
      <button
        class="button cancel"
        @click="closeModal"
      >
        Отмена
      </button>

      <button
        :class="{'error': error}"
        class="button apply"
        @click="applyButtonHandler( inputValue, getModalContent.id )"
      >
        {{ getModalContent.actionButton }}
      </button>
    </template>
  </InputModalLayout>
</template>