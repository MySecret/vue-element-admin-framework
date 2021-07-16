<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img v-if="logomini" :src="logomini" class="sidebar-logo" />
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
      </router-link>
    </transition>
  </div>
</template>

<script>
import logo from "@/assets/images/logo.png";
import logomini from "@/assets/images/logo-min.png";
export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      logo,
      logomini,
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
#app .sidebar-logo-link {
  display: flex;
  align-items: center;
  justify-content: center;
}
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 100px;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 180px;
      height: 48px;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      width: 48px;
      height: 48px;
    }
  }
}
</style>
