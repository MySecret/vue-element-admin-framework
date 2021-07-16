<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <div class="menus">
      <div class="level1">
        <div class="edge">
          <img src="../../../assets/images/edge.png" alt="" />
        </div>
        <div class="super-menu">
          <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
              :default-active="activeSuperMenu"
              @select="switchMenu"
              class="headbar-menu"
              :background-color="variables.menuBg"
              :active-text-color="variables.menuActiveText"
              mode="vertical"
            >
              <template v-for="route in permission_routes">
                <el-menu-item
                  v-if="!route.hidden"
                  :index="route.path == '/' ? '/dashboard' : route.path"
                  :key="route.path"
                  class="headbar-menu-item"
                  style="padding: 0"
                >
                  <div>
                    <div class="hdb-menu-icon">
                      <svg-icon :icon-class="route.meta.icon" />
                    </div>
                    <div class="hdb-menu-text">
                      {{
                        generateTitle(
                          route.meta
                            ? route.meta.title
                            : route.children[0].meta.title
                        )
                      }}
                    </div>
                  </div>
                  <!-- <app-link :to="route.path">
                    <div class="hdb-menu-icon">
                      <svg-icon :icon-class="route.meta.icon" />
                    </div>
                    <div class="hdb-menu-text">
                      {{
                        generateTitle(
                          route.meta
                            ? route.meta.title
                            : route.children[0].meta.title
                        )
                      }}
                    </div>
                  </app-link> -->
                </el-menu-item>
              </template>
            </el-menu>
          </el-scrollbar>
        </div>
        <div class="hamburger">
          <hamburger
            id="hamburger-container"
            :is-active="sidebar.opened"
            class="hamburger-container"
            @toggleClick="toggleSideBar"
          />
        </div>
      </div>
      <div class="level2">
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-menu
            :default-active="activeMenu"
            :collapse="isCollapse"
            :background-color="variables.menuBg"
            :text-color="variables.menuText"
            :unique-opened="true"
            :active-text-color="variables.menuActiveText"
            :collapse-transition="false"
            mode="vertical"
          >
            <sidebar-item
              v-for="route in secRoutes"
              :key="route.path"
              :item="route"
              :base-path="basePath + '/' + route.path"
            />
          </el-menu>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
import AppLink from "../Sidebar/Link";
import { generateTitle } from "@/utils/i18n";
import Hamburger from "@/components/Hamburger";
export default {
  components: {
    SidebarItem,
    Logo,
    AppLink,
    Hamburger,
  },
  data() {
    return {
      activeSuperMenu: "",
    };
  },
  computed: {
    ...mapGetters(["permission_routes", "sidebar"]),
    basePath() {
      let basepath = "";
      for (let i = 0; i < this.permission_routes.length; i++) {
        if (this.permission_routes[i].path == this.activeSuperMenu) {
          basepath = this.permission_routes[i].path;
          break;
        }
      }
      return basepath;
    },
    // basePath() {
    //   const route = this.$route;
    //   const { meta, path } = route;
    //   let paths = path.split("/");
    //   let fatherRoutePath = "/" + paths[1];
    //   let basepath = "";
    //   for (let i = 0; i < this.permission_routes.length; i++) {
    //     if (
    //       this.permission_routes[i].path == fatherRoutePath ||
    //       this.permission_routes[i].redirect == fatherRoutePath
    //     ) {
    //       basepath = this.permission_routes[i].path;
    //       break;
    //     }
    //   }
    //   return basepath;
    // },
    //第二层路由，用于遍历菜单
    secRoutes() {
      let routes = [];
      for (let i = 0; i < this.permission_routes.length; i++) {
        if (this.permission_routes[i].path == this.activeSuperMenu) {
          routes = this.permission_routes[i].children;
          break;
        }
      }
      return routes;
    },
    // secRoutes() {
    //   const route = this.$route;
    //   const { meta, path } = route;
    //   let paths = path.split("/");
    //   let fatherRoutePath = "/" + paths[1];
    //   let routes = [];
    //   for (let i = 0; i < this.permission_routes.length; i++) {
    //     if (
    //       this.permission_routes[i].path == fatherRoutePath ||
    //       this.permission_routes[i].redirect == fatherRoutePath
    //     ) {
    //       routes = this.permission_routes[i].children;
    //       break;
    //     }
    //   }
    //   return routes;
    // },
    /**二级菜单得选中项 */
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    /**一级菜单得选中项 */
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  watch: {
    $route: {
      handler: function (route) {
        const { meta, path } = route;
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu;
        }
        let paths = path.split("/");
        this.activeSuperMenu = "/" + paths[1];
      },
      immediate: true,
    },
  },
  methods: {
    generateTitle,
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    switchMenu(index, indexpath) {
      this.activeSuperMenu = index;
    },
  },
};
</script>
<style lang="scss" scoped>
#app {
  .menus {
    height: calc(100% - 100px);
    position: relative;
    padding-left: 60px;
  }

  .level1 {
    width: 60px;
    height: 100%;
    box-shadow: 1px 0px 5px 0px rgba(0, 0, 0, 0.2);
    border-radius: 0px 20px 0px 0px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    background-color: #4b5563;

    .edge {
      img {
        width: 100%;
        display: block;
      }
    }

    .super-menu {
      height: calc(100% - 84px);

      ul {
        background-color: #4b5563 !important;

        li {
          background-color: #4b5563 !important;
        }
      }
    }

    .hamburger {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .level2 {
    width: 200px;
    height: 100%;
  }

  .headbar-menu {
    .headbar-menu-item {
      padding: 0;
      height: auto;
      line-height: 1;
      color: #fff;
      margin-bottom: 30px;
      position: relative;

      .hdb-menu-icon {
        width: 30px;
        height: 30px;
        margin: 0 auto 6px;
        background-color: #64748b;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;

        .svg-icon {
          margin: 0;
        }
      }

      .hdb-menu-text {
        font-size: 12px;
        text-align: center;
        /* transform: scale(0.9); */
      }
    }

    .is-active {
      .hdb-menu-icon {
        background-color: #1890ff;
        .svg-icon {
          color: white;
        }
      }

      /* &::before {
          content: "";
          width: 4px;
          height: 30px;
          background-color: #1890ff;
          position: absolute;
          left: 0;
          top: 0;
        } */
    }
  }
}
</style>
