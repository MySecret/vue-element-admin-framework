/*
 * @Author: sxt 
 * @Date: 2021-05-25 09:20:50 
 * @Last Modified by: sxt
 * @Last Modified time: 2021-05-25 09:24:41
 */
<template>
  <el-tooltip
    effect="dark"
    content="设置列"
  >
    <el-popover
      placement="bottom"
      width="190"
      trigger="manual"
      v-model="visible"
      popper-class="custom_pop"
      style="padding: 0"
      ref="customPop"
    >
      <div class="pop-container">
        <el-input
          v-model="filterText"
          placeholder="请搜索"
          suffix-icon="el-icon-search"
        ></el-input>
        <div class="pop-main">
          <el-scrollbar style="height: 100%">
            <vuedraggable
              class="wrapper"
              v-model="allCols"
              ghostClass="ghostClass"
            >
              <transition-group>
                <div
                  v-for="item in filterCols"
                  :key="item.prop"
                  class="pop-item"
                  v-show="
                  item.prop !== 'operate' &&
                  item.prop !== 'action' &&
                  item.prop !== 'xh'
                "
                >
                  <i class="iconfont icondrag"></i>
                  <!-- <el-tooltip
                  class="item"
                  effect="dark"
                  :content="item.label"
                  placement="top-start"
                > -->
                  <!-- <span class="inner">{{ item.label }}</span> -->
                  <TextTooltip
                    :content="item.label "
                    class="inner"
                  ></TextTooltip>
                  <!-- </el-tooltip> -->
                  <el-switch
                    :width="28"
                    v-model="item.show"
                    class="pop-switch"
                    @change="handleSwitch($event, item)"
                  ></el-switch>
                </div>
              </transition-group>
            </vuedraggable>
          </el-scrollbar>
        </div>
        <div class="pop-ft">
          <el-button
            type="text"
            @click="resetCols"
          >重置</el-button>
          <el-button
            type="text"
            @click="confirm"
          >确定</el-button>
        </div>
      </div>
      <el-button
        slot="reference"
        @click="handlePop"
        style="width:32px;padding-left:0;padding-right:0;"
      >
        <svg-icon icon-class="filter" />
      </el-button>
    </el-popover>
  </el-tooltip>

</template>
<script>
import { getUserId } from "@/utils/auth";
import vuedraggable from "vuedraggable";
import TextTooltip from "@/components/TextTooltip";
import _ from "lodash";
export default {
  name: "CustomCols",
  components: {
    vuedraggable,
    TextTooltip,
  },

  props: {
    //所有的筛选列
    columns: {
      type: Array,
      default: [],
    },
    //localstorage存储的名称
    keyName: String,
  },
  data() {
    return {
      filterText: "",
      visible: false,
      allCols: [],
      initCols: [],
    };
  },
  watch: {
    columns: {
      handler(val) {
        this.allCols = _.cloneDeep(val);
        this.initData();
      },
      deep: true,
    },
  },
  computed: {
    filterCols: function () {
      return this.initCols.filter(
        (i) => i.label.indexOf(this.filterText) !== -1
      );
    },
  },

  mounted() {
    this.allCols = _.cloneDeep(this.columns);
    this.initData();
  },
  activated() {},
  deactivated() {
    this.visible = false;
    this.filterText = "";
  },
  methods: {
    initData() {
      this.allCols.map((item) => {
        if (item.hidden) {
          item.show = !item.hidden;
        } else {
          item.show = true;
        }
      });
      this.initCols = _.cloneDeep(this.allCols);
    },
    resetCols() {
      this.allCols = _.cloneDeep(this.columns);
      this.initData();
    },
    confirm() {
      this.$emit("changeCols", this.allCols);
      if (this.keyName) {
        localStorage.setItem(
          this.keyName + "_filter_" + getUserId(),
          JSON.stringify(this.allCols)
        );
      }
      this.closePop();
    },
    handlePop() {
      this.visible = !this.visible;
      this.resetCols();
    },
    openPop() {
      this.visible = true;
    },
    closePop() {
      this.visible = false;
      this.filterText = "";
    },
    handleSwitch(value, data) {
      let index = this.allCols.findIndex((i) => {
        return i.prop == data.prop;
      });

      if (index !== -1) {
        this.allCols[index].show = value;
        this.allCols[index].hidden = !value;
        this.$forceUpdate();
      }
      this.initCols = _.cloneDeep(this.allCols);
    },
  },
};
</script>
<style lang="scss">
.custom_pop {
  padding: 0 !important;
}
</style>
<style lang="scss" scoped>
.pop-container {
  width: 100%;
  height: 322px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .el-input {
    width: calc(100% - 16px);
    margin: 8px;
  }

  .pop-main {
    height: calc(100% - 80px); //16+32+32
    width: 100%;
    .pop-item {
      padding: 0 10px 0 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 32px;
      cursor: move;
      .inner {
        margin: 0 6px;
        text-align: left;
        width: 114px;
      }
      ::v-deep .el-switch__core {
        // width: 12px;
        height: 16px;

        border-radius: 8px;
      }
      ::v-deep .el-switch__core::after {
        width: 12px;
        height: 12px;
        border-radius: 6px;
        // margin-left: -13px !important;
      }
      ::v-deep .el-switch__core .is-checked::after {
        width: 12px;
        height: 12px;
        border-radius: 6px;
      }
    }
    ::v-deep .el-switch.is-checked .el-switch__core::after {
      margin-left: -13px;
    }
  }
  .pop-ft {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px;
    padding: 0 8px;
    height: 32px;
    border-top: 1px solid rgba(0, 0, 0, 0.09);
  }
}
.ghostClass {
  border-bottom: 1px dashed #1890ff;
}
</style>
