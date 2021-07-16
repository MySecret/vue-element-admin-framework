<!--
 * @Author: your name
 * @Date: 2021-04-22 13:57:05
 * @LastEditTime: 2021-07-15 17:43:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \运动员管理前端v2e:\SVN\前端源码\业务系统\src\components\Breadcrumb\index.vue
-->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
        >
          {{ generateTitle(item.meta.title) }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{
          generateTitle(item.meta.title)
        }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { generateTitle } from "@/utils/i18n";
import pathToRegexp from "path-to-regexp";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith("/redirect/")) {
        return;
      }
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  computed: {
    ...mapGetters(["permission_routes"]),
  },
  methods: {
    generateTitle,
    getBreadcrumb() {
      // only show routes with meta.title
      //匹配的所有路径

      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      let fatername = matched[0].name; //匹配的第一项一定是顶级路由对象
      let routeName = this.$route.name;
      let father = null; //顶级路由项
      //寻找当前路由所在的顶级路由项
      for (var i = 0; i < this.permission_routes.length; i++) {
        if (this.permission_routes[i].name == fatername) {
          father = this.permission_routes[i];
          break;
        }
      }
      let tempList = [father];
      function lookForChild(child, list = []) {
        list.push(child);
        let len = list.length;
        if (child.name == routeName) {
          return list;
        }
        if (child.children && child.children.length > 0) {
          for (let i = 0; i < child.children.length; i++) {
            lookForChild(child.children[i], list);
            if (list.length != len) {//说明已经找到name所在
              return list;
            }
          }
        }
        list.pop();
        return list;
      }

      for (let i = 0; i < father.children.length; i++) {
        let child = lookForChild(father.children[i]);
        if (child.length > 0) {
          tempList = tempList.concat(child);//this.$route所在层级，从父级开始一层层插入数组tempList里面，模拟this.$route.matched,解决拍平路由后，面包屑导航的问题
          break;
        }
      }
      // let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      // const first = matched[0]

      // if (!this.isDashboard(first)) {
      //   matched =[].concat(matched) // [{ path: '/dashboard', meta: { title: 'dashboard' }}].concat(matched)
      // }

      // this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      this.levelList = tempList.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    isDashboard(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return (
        name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase()
      );
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route;
      var toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(this.pathCompile(path));
    },
  },
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 15px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
