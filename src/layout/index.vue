<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <!-- <headbar /> -->
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { AppMain, Navbar, Sidebar, TagsView, Headbar } from "./components";
import Breadcrumb from "@/components/Breadcrumb";
import ResizeMixin from "./mixin/ResizeHandler";
import { mapState } from "vuex";

export default {
  name: "Layout",
  components: {
    AppMain,
    Navbar,
    Sidebar,
    TagsView,
    Headbar,
    Breadcrumb,
  },
  data() {
    return {};
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
      needTagsView: (state) => state.settings.tagsView,
      fixedHeader: (state) => state.settings.fixedHeader,
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        // mobile: this.device === "mobile",
      };
    },
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
