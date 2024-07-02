<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import ProjectList from '@/components/ProjectPages/PagesList.vue';
import InputModalLayout from "@/components/modals/InputModal.vue";
export default {
  name: 'EditorView',

  components: {
    ProjectList,
    InputModalLayout,
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
      <div class = "">
        <div id="app">
          <button v-on:click="increase(3, $event)">Создать новый документ</button>
          <div>{{modalwindow}}</div>
          </div>
      </div>
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

            <ProjectList :all-projects="allProjects" />

            <InputModalLayout
              id="modal"
              :class="{'modal': getModalState, 'visually-hidden': !getModalState}">
            </InputModalLayout>
          
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
