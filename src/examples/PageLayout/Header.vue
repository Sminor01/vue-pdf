<script>
  import {mapActions, mapGetters, mapMutations} from "vuex";
//   import Header from "@/components/global/Header";
  import OptionsList from "../../components/global/OptionsList.vue"
  
  export default {
    name: "EditPage",
  
    components: {
    //   Header,
      OptionsList,
    //   InputModal,
    //   OptionsModal,
    //   PageBlocks
    },
  
    data () {
      return {
        optionsOpen: false,
        pagesOptionsOpen: false,
  
        titleError: false,
        urlError: false,
  
        activeImage: "",
  
        titleInputValue: "",
        descriptionInputValue: "",
        urlInputValue: "",
  
        activeOptionsModalSection: 1,
  
        blocks: [],
        currentAddButton: Number,
      }
    },
  
    computed: {
      ...mapGetters( [
        'getEditData',
        'getProjectData',
        'getTabs',
        'getSettingsModalState',
        'getSettingsModalContent',
        'getImageLibrary',
        'getOptionsModalState',
        'getOptionsModalSections',
        'getOptionsModalOptions',
        'getSelectedBlock',
      ] ),
    },
  
    watch: {
      $route(to) {
        if (to.name === "EditPage") {
          this.fetchPageData({
            projectId: Number(to.params.projectId),
            pageId: Number(to.params.pageId)
          })
  
          this.blocks = this.getEditData.pageData.blocks;
        }
      },
      getEditData: function () {
        this.titleInputValue = this.getEditData.pageData.title;
        this.descriptionInputValue = this.getEditData.pageData.description;
        this.urlInputValue = this.getEditData.pageData.url;
        this.activeImage = this.getEditData.pageData.img;
      }
    },
  
    mounted() {
      let object = {
        projectId: Number(this.$route.params.projectId),
        pageId: Number(this.$route.params.pageId)
      }
      this.fetchPageData( object );
  
      this.blocks = this.getEditData.pageData.blocks;
    },
  
    methods: {
      ...mapActions( ['fetchPageData'] ),
      ...mapMutations( [
          'updatePageData',
          'addNewPage',
          'setActiveTab',
          'changeSettingsModalState',
          'setSettingsModalContent',
          'savePageDataChanges',
          'setOptionsModalSections',
          'setOptionsModalOptions',
          'changeOptionsModalState',
          'addNewBlock',
          'removeBlock',
          'moveBlock',
          'changeBlockVisibility',
          'changeBlockContentModalState'
      ] ),
  
      addNewPageButtonHandler() {
        this.addNewPage();
        this.fetchPageData({
          projectId: Number(this.$route.params.projectId),
          pageId: Number(this.$route.params.pageId)
        })
      },
  
      settingsButtonHandler() {
        this.setSettingsModalContent(this.getEditData.pageData);
        this.changeSettingsModalState();
      },
  
      checkTitleInputValue( inputValue, currentValue ) {
        for (let pageItem of this.getEditData.projectData.pages) {
          let pageTitle = pageItem.title.toLowerCase().split(" ").join("");
          let newPageTitle = inputValue.toLowerCase().split(" ").join("");
  
          if (
              (pageTitle === newPageTitle) && (newPageTitle !== currentValue.toLowerCase().split(" ").join(""))
              ||
              (newPageTitle.length === 0)
          ) {
            this.titleError = true;
            break;
          }
          else {
            this.titleError = false;
          }
        }
      },
  
      checkUrlInputValue( inputValue, currentValue ) {
        for (let pageItem of this.getEditData.projectData.pages) {
          let pageUrl = pageItem.url.toLowerCase().split(" ").join("");
          let newPageUrl = inputValue.toLowerCase().split(" ").join("");
  
          if (
              (pageUrl === newPageUrl) && (newPageUrl !== currentValue.toLowerCase().split(" ").join(""))
              ||
              (newPageUrl.length < 3)
          ) {
            this.urlError = true;
            break;
          }
          else {
            this.urlError = false;
          }
        }
      },
  
      closeSettingsModal() {
        this.error = false;
        this.changeSettingsModalState();
      },
  
      saveChangesButtonHandler( id ) {
        this.savePageDataChanges({
          id: id,
          title: this.titleInputValue,
          description: this.descriptionInputValue,
          url: this.urlInputValue,
          img: this.activeImage,
          main: this.getEditData.pageData.main,
          blocks: this.getEditData.pageData.blocks,
        });
        this.closeSettingsModal();
      },
  
      closeOptionsModal() {
        this.activeOptionsModalSection = 1;
        this.changeOptionsModalState();
      },
  
      sectionButtonHandler( section ) {
        this.activeOptionsModalSection = section.code;
        this.setOptionsModalOptions( section.options );
      },
  
      optionButtonHandler( code, duplicateBlock = {} ) {
        this.addNewBlock( {
          code: code,
          index: this.getSelectedBlock,
          duplicateBlock: duplicateBlock
        } );
  
        if (this.getOptionsModalState) this.closeOptionsModal();
      },
  
      updateBlocks() {
        this.blocks = this.getEditData.pageData.blocks;
      }
    },
  }
</script>

<template>
    <Header class="header header_inversion">
        <template #leftItems>
          <div class="left-items col-12 col-md-4">
            <div class="left-items__breadcrumbs">
              <router-link
                class="breadcrumb link"
                to="/"
                aria-label="Go to homepage"
              >
                <svg
                  class="link__icon"
                  width="14"
                  height="14"
                  aria-hidden="true"
                  role="img"
                >
                  <use href="#home-icon" />
                </svg>
                Мои сайты
              </router-link>
              <span class="breadcrumb">⟶</span>
              <router-link
                class="breadcrumb link"
                :to="'/project/' + getEditData.projectData.id"
                aria-label="Return to project settings"
              >
                {{ getEditData.projectData.title }}
              </router-link>
            </div>
            <div class="left-items__pages-list">
              <button
                :class="{ 'pages-list-button_opened': pagesOptionsOpen }"
                class="pages-list-button"
                aria-label="Select page"
                @click="pagesOptionsOpen = true"
              >
                <svg
                  id="more-card-options"
                  class="icon"
                  width="24"
                  height="24"
                  aria-hidden="true"
                  role="img"
                >
                  <use href="#arrow-down" />
                </svg>
              </button>
    
              <OptionsList
                :options-open="pagesOptionsOpen"
                class="options_pages"
                @mouseleave="pagesOptionsOpen = false"
              >
                <template #optionsHead>
                  <button
                    class="button apply"
                    @click="addNewPageButtonHandler()"
                  >
                    Создать новую страницу
                  </button>
                </template>
    
                <template #optionsBody>
                  <ul class="options-list">
                    <li
                      v-for="page in getEditData.projectData.pages"
                      :key="page.id"
                      class="options-list__item"
                    >
                      <router-link
                        :to="'/project/'+ getEditData.projectData.id + '/edit/' + page.id"
                        :class="{'active': page.id === getEditData.pageData.id}"
                        class="link"
                        @click="optionsOpen = false"
                      >
                        <svg
                          v-if="page.main"
                          class="link__icon"
                          width="14"
                          height="14"
                          aria-hidden="true"
                          role="img"
                        >
                          <use href="#home-icon" />
                        </svg>
                        {{ page.title }}
                      </router-link>
                    </li>
                  </ul>
                </template>
              </OptionsList>
            </div>
          </div>
        </template>
        <template #rightItems>
          <div class="right-items col-12 col-md-8">
            <ul class="nav-list">
              <li class="nav-list__item">
                <router-link
                  :to="'/project/'+ $route.params.projectId"
                  class="link"
                >
                  Отменить
                </router-link>
              </li>
              <li class="nav-list__item">
                <router-link
                  :to="`/project/${$route.params.projectId}/preview/${$route.params.pageId}`"
                  :class="{ 'link_disabled': blocks.length === 0 }"
                  class="link link_action"
                >
                  Предпросмотр
                </router-link>
              </li>
              <li class="nav-list__item">
                <button
                  class="link"
                  @click="settingsButtonHandler"
                >
                  Настройки
                </button>
              </li>
              <li class="nav-list__item nav-list__item-options">
                <button
                  :class="{ 'pages-list-button_opened': optionsOpen }"
                  class="nav-list-item-button"
                  aria-label="Select page"
                  @click="optionsOpen = true"
                >
                  Ещё
                  <svg
                    id="more-card-options"
                    :class="{ 'icon__active': optionsOpen }"
                    class="icon"
                    width="20"
                    height="20"
                    aria-hidden="true"
                    role="img"
                  >
                    <use href="#arrow-down" />
                  </svg>
                </button>
    
                <OptionsList
                  :options-open="optionsOpen"
                  class="options_pages"
                  @mouseleave="optionsOpen = false"
                >
                  <template #optionsBody>
                    <ul class="options-list">
                      <li class="options-list__item">
                        <button
                          class="link"
                          @click="settingsButtonHandler"
                        >
                          Настройки страницы
                        </button>
                      </li>
                      <li class="options-list__item">
                        <router-link
                          to="/"
                          class="link"
                        >
                          Мои сайты
                        </router-link>
                      </li>
                      <li class="options-list__item">
                        <router-link
                          to="/profile"
                          class="link"
                        >
                          Профиль
                        </router-link>
                      </li>
                    </ul>
                  </template>
                </OptionsList>
              </li>
            </ul>
          </div>
        </template>
      </Header>
</template>