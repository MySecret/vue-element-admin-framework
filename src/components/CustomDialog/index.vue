<template>
  <el-dialog
    custom-class="custom-dialog"
    :close-on-click-modal="closeOnClickModal"
    :show-close="false"
    :visible.sync="visible"
    :width="width"
    :modal-append-to-body="modalAppendToBody"
    :append-to-body="appendToBody"
    :destroy-on-close="destroyOnClose"
    @open="open"
    @opened="opened"
    @close="close"
    @closed="closed"
  >
    <div slot="title" class="title">
      {{ title }}
      <i class="iconfont iconcha-" @click="cancel"></i>
    </div>
    <slot></slot>
    <div slot="footer" v-if="showFooter">
      <el-button
        v-if="showSave"
        type="primary"
        @click="save"
        size="small"
        style="margin-right: 12px"
        >保存</el-button
      >
      <el-button @click="cancel" size="small" style="margin-left: 0"
        >退出</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "CustomDialog",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    showSave:{
      type: Boolean,
      default: true,
    },
    modal: {
      type: Boolean,
      default: true,
    },

    modalAppendToBody: {
      type: Boolean,
      default: true,
    },

    appendToBody: {
      type: Boolean,
      default: false,
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
    lockScroll: {
      type: Boolean,
      default: true,
    },

    closeOnClickModal: {
      type: Boolean,
      default: false,
    },

    closeOnPressEscape: {
      type: Boolean,
      default: true,
    },

    showClose: {
      type: Boolean,
      default: true,
    },

    width: String,

    fullscreen: Boolean,

    customClass: {
      type: String,
      default: "",
    },

    top: {
      type: String,
      default: "15vh",
    },
    beforeClose: Function,
    center: {
      type: Boolean,
      default: false,
    },

    destroyOnClose: Boolean,
  },
  computed: {},
  methods: {
    open() {
      this.$emit("open");
    },
    opened() {
      this.$emit("opened");
    },
    close() {
      this.$emit("close");
    },
    closed() {
      this.$emit("closed");
    },
    cancel() {
      this.$emit("cancel");
    },
    save() {
      this.$emit("save");
    },
  },
};
</script>

<style lang="scss">
.custom-dialog {
  border-radius: 5px;
  .el-dialog__header {
    height: 48px;
    text-align: center;
    line-height: 48px;
    border-bottom: 1px solid #ebebeb;
    box-sizing: content-box;
    padding: 0;
    color: #666666;
  }
  .title {
    &:before {
      content: "";
      width: 2px;
      height: 20px;
      background-color: #fff;
      position: absolute;
      right: 20px;
      top: -20px;
    }
    position: relative;
    i {
      position: absolute;
      right: 11px;
      top: -38px;
      color: #fff;
      line-height: 1;
      cursor: pointer;
      font-size: 20px;
    }
  }
}
</style>
