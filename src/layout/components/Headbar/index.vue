<template>
  <div class="headbar">
    <el-menu
      :default-active="activeMenu"
      mode="horizontal"
      class="headbar-menu"
      :active-text-color="variables.menuActiveText"
    >
      <template v-for="route in permission_routes">
        <el-menu-item
          v-if="!route.hidden"
          :index="route.path=='/'?'/dashboard':route.path"
          :key="route.path"
          class="headbar-menu-item"
        >
          <app-link :to="route.path">
            {{ generateTitle(route.meta?route.meta.title:route.children[0].meta.title) }}
          </app-link>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { generateTitle } from "@/utils/i18n";
import { isExternal } from "@/utils/validate";
import AppLink from "../Sidebar/Link";
import variables from "@/styles/variables.scss";
export default {
  name: "Headbar",
  components: { AppLink },
  computed: {
    ...mapGetters(["permission_routes"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      let paths = path.split("/");
      return "/" + paths[1];
    },
    variables() {
      return variables;
    },
  },
  methods:{
    generateTitle
  }
};
</script>

<style lang="scss" scoped>
.headbar {
  float:left;
}
.headbar .headbar-menu-item{
  padding:0;
  height:50px;
  line-height:50px;
}
.headbar .headbar-menu-item a{
  display: block;
  padding:0 20px;
  height:100%;
}
</style>