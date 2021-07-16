<template>
  <div class="navbar">
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <div class="notification right-menu-item hover-effect">
          <el-popover placement="bottom" width="486" trigger="click" @show="showMsgPanel" @after-enter="enterMsgPanel">
            <i slot="reference" class="el-icon-bell">
              <el-badge :is-dot="unRead > 0" class="item" />
            </i>
            <div slot="" class="float-panel">
              <el-tabs v-model="activeName">
                <el-tab-pane
                  v-for="item in msgLevelOption"
                  :key="item.name"
                  :label="item.name"
                  :name="item.value"
                >
                  <div v-for="msg in messages" :key="msg.id" class="msg-item">
                    <div class="msg-header">
                      <span>{{ msg.message_title }}</span>
                      <span class="head-ext">{{ msg.create_date }}</span>
                    </div>
                    <div class="msg-body">
                      <p>{{ msg.message_content }}</p>
                    </div>
                  </div>
                  <div v-if="unRead <= 0" class="nodata">暂无新通知</div>
                </el-tab-pane>
              </el-tabs>
              <div class="panel-operates">
                <el-row :gutter="30">
                  <el-col :span="12">
                    <el-button type="text" @click="clearAll()"
                      >清空全部</el-button
                    >
                  </el-col>
                  <el-col :span="12">
                    <el-button type="text" @click="viewAll()"
                      >查看全部</el-button
                    >
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-popover>
        </div>

        <screenfull id="screenfull" class="right-menu-item hover-effect" />
        <lang-select class="right-menu-item hover-effect" />
      </template>

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <el-image :src="avatar || defaultHead" class="user-avatar">
            <div slot="error" class="image-slot">
              <img :src="errorHead" alt="加载失败" />
            </div>
          </el-image>
          <!-- <img
            :src="avatar + '?imageView2/1/w/80/h/80'"
            class="user-avatar"
          /> -->
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <router-link to="/profile/index">
            <el-dropdown-item>
              {{ $t("navbar.profile") }}
            </el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>
              {{ $t("navbar.dashboard") }}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">{{ $t("navbar.logOut") }}</span>
          </el-dropdown-item> -->
          <el-dropdown-item @click.native="logout" class="out">
            <span style="display: block">{{ $t("navbar.logOut") }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import Screenfull from "@/components/Screenfull";
import LangSelect from "@/components/LangSelect";
import Search from "@/components/HeaderSearch";

import * as signalR from "@aspnet/signalr";

import Headbar from "./Headbar";
let defaultHead = require("@/assets/images/avatar.png");
let errorHead = require("@/assets/images/breakimg.png");

import { getBMessageList } from "@/api/message";

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    LangSelect,
    Search,
    Headbar,
  },
  data() {
    return {
      defaultHead,
      errorHead,
      activeName: "all",
      currentActiveName: '',
      msgLevelOption: [
        { name: "全部", value: "all" },
        { name: "通知", value: "xxlb_tz" },
        { name: "待办", value: "xxlb_db" },
        { name: "预警", value: "xxlb_tx" },
      ],
      connection: "",
      messages: [],
      unRead: 0,
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device", "infos"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      window.location.reload();
      //this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    showMsgPanel() {
      console.log('show message panel')
      this.currentActiveName = this.activeName
      this.activeName = ''
    },
    enterMsgPanel() {
      console.log('enter message panel')
      this.activeName = this.currentActiveName
    },
    clearAll() {
      this.messages = [];
      this.unRead = this.messages.length;
    },
    viewAll() {
      this.$router.push("/system/message");
    },
    loadMessage() {
      const params = {
        read_status: 0,
        pageSize: 5
      };
      getBMessageList(params).then((res) => {
        this.messages = res.data.dtData;
        this.unRead = this.messages.length;
      });
    },
    readMessage(id) {
      this.messages.splice(
        this.messages.findIndex((e) => e.id === id),
        1
      );
      this.unRead = this.messages.length;
    },
    readAllMessage() {
      this.messages = [];
      this.unRead = this.messages.length;
    },
  },
  mounted: function () {
    const _this = this;
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(process.env.VUE_APP_Notification_URI + "/noticeHub", {})
      .build();
    this.connection.on("Notify", function (message) {
      console.log("Notify", message);
      //_this.messages.push(message)
      _this.messages.unshift(message);
      _this.unRead++;
    });
    this.connection.start().then(function () {
      console.log("sendLogin infos", _this.infos);
      _this.connection
        .invoke("SendLogin", _this.infos.user_code)
        .catch(function (err) {
          return console.error("SendLogin error", err.toString());
        });
    });

    this.loadMessage();

    this.$root.$on("read:message", this.readMessage);
    this.$root.$on("read:all:message", this.readAllMessage);
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.breadcrumb {
  display: inline-block;
  padding: 0 8px;
  font-size: 18px;
  height: 100%;
  vertical-align: text-bottom;
  cursor: pointer;
}
.breadcrumb:hover {
  background: rgba(0, 0, 0, 0.025);
}

.notification {
  .el-icon-bell {
    position: relative;

    .item {
      position: absolute;
      top: -6px;
      right: -4px;
    }
  }
}
.float-panel {
  padding: 0 20px;
  .msg-item {
    line-height: 22px;
    padding: 8px 0;
    border-bottom: 1px solid #dedede;
    .msg-header {
      color: #000000;
      .head-ext {
        font-size: 13px;
        float: right;
        color: #999999;
      }
    }
  }
  .msg-item:last-child {
    border-bottom: none;
  }

  .panel-operates {
    padding: 6px 6px 0;
    border-top: 1px solid #dedede;
    .el-row {
      .el-col-12:last-child {
        text-align: right;
      }
    }
  }
  .nodata {
    padding: 20px;
    font-size: 14px;
    color: #5a5e66;
    text-align: center;
  }
}
</style>
