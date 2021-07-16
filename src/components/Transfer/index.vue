<template>
  <CustomDialog
    :title="headerTitle"
    :visible.sync="showDialog"
    :modalAppendToBody="modalAppendToBody"
    :append-to-body="appendToBody"
    width="750px"
    @cancel="cancel"
    @save="save"
  >
    <div
      class="transfer"
      ref="transfer"
    >
      <div class="transfer-container">
        <div class="transfer-left">
          <div class="input">
            <!-- 左侧输入框-->
            <el-input
              placeholder="请输入"
              suffix-icon="el-icon-search"
              v-model="inputText"
            >
            </el-input>
          </div>
          <div class="left-list">
            <!-- 左侧内容 -->
            <el-scrollbar class="v-scroll">
              <div class="inner-tree">
                <el-tree
                  ref="tree"
                  class="filter-tree"
                  :data="leftList"
                  :props="defaultProps"
                  :expand-on-click-node="false"
                  :filter-node-method="filterNode"
                  default-expand-all
                  @node-click="pickItem"
                >
                  <span
                    class="custom-tree-node"
                    slot-scope="{ node, data }"
                  >
                    <div class="node-group">
                      <svg-icon
                        v-if="iconClass"
                        :icon-class="iconClass"
                        style="width: 20px; height: 20px; margin-right: 8px"
                      />
                      <template v-if="hasAvatar">
                        <div
                          class="head-box"
                          v-if="!onlyLeaf || node.isLeaf"
                        >
                          <el-image :src="data.headimage || defaultHead">
                            <div
                              slot="error"
                              class="image-slot"
                            >
                              <img
                                :src="errorHead"
                                alt="加载失败"
                              />
                            </div>
                          </el-image>
                        </div>
                      </template>
                      <span class="text">{{ data[filterText] }}</span>
                    </div>
                    <i
                      v-if="setChecked(data)"
                      class="el-icon-check"
                    ></i>
                  </span>
                </el-tree>
              </div>
            </el-scrollbar>
          </div>
        </div>
        <div class="transfer-right">
          <div class="transfer-right-header">
            <span>{{ innnerTitle }}</span>
          </div>
          <!-- 右侧内容 -->
          <el-scrollbar
            class="v-scroll"
            style="height: 325px"
          >
            <div
              class="list-item"
              v-for="(item, k) in pickList"
              :key="k"
            >
              <div class="list-item-left row-center-flex">
                <div
                  class="head-box"
                  v-if="hasAvatar"
                >
                  <el-image :src="item.headimage || defaultHead">
                    <div
                      slot="error"
                      class="image-slot"
                    >
                      <img
                        :src="errorHead"
                        alt="加载失败"
                      />
                    </div>
                  </el-image>
                </div>
                <span class="text">{{ item[filterText] }}</span>
              </div>
              <i
                class="el-icon-close"
                @click="
                  () => {
                    removeItem(item);
                  }
                "
              ></i>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </CustomDialog>
</template>
<script>
import _ from "lodash";
import CustomDialog from "@/components/CustomDialog";
let defaultHead = require("@/assets/images/avatar.png");
let errorHead = require("@/assets/images/breakimg.png");
export default {
  name: "transfer",
  data() {
    return {
      inputText: "",
      pickList: [],
      defaultHead,
      errorHead,
    };
  },
  components: {
    CustomDialog,
  },
  props: {
    defaultProps: {
      type: Object,
      default() {
        return {
          children: "child",
        };
      },
    },
    modalAppendToBody: {
      type: Boolean,
      default: true,
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
    onlyLeaf: {
      type: Boolean,
      default: false,
    },
    headerTitle: {
      type: String,
      default: "",
    },
    showDialog: {
      type: Boolean,
    },
    innnerTitle: {
      type: String,
      default: "",
    },
    leftList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    //按照什么来过滤
    filterText: {
      type: String,
      default: "",
    },
    choiceType: {
      type: String,
      default: "multiple", //多选：multiple 单选：single
    },
    //树状图节点icon
    iconClass: {
      type: String,
    },
    // 是否有头像
    hasAvatar: {
      type: Boolean,
    },
    initList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    needToFilter: {
      type: Boolean,
      default: false,
    },
    unique: {
      type: String,
      default: "",
    },
  },
  watch: {
    //机构过滤监听
    inputText(val) {
      this.$refs.tree.filter(val);
    },
    initList(val) {
      this.pickList = val.slice();
    },
  },
  methods: {
    //筛选机构（前端）
    filterNode(value, data) {
      if (!value) return true;
      return data[this.filterText].indexOf(value) !== -1;
    },
    //选择左侧数据到右侧
    pickItem(item, node) {
      if (this.onlyLeaf && !node.isLeaf) {
        return false;
      }
      let index = this.pickList.findIndex((i) => {
        if (this.unique) {
          return i[this.unique] == item[this.unique];
        } else {
          return i[this.filterText] == item[this.filterText];
        }
      });
      //右侧不存在
      if (index == -1) {
        if (this.choiceType == "single") {
          this.pickList = [
            {
              ...item,
            },
          ];
        } else {
          if (!this.needToFilter) {
            this.pickList.push(item);
          } else {
            if (this.filterData(item)) {
              this.$confirm(
                `该队员已在 ${item.groupname},是否继续添加？`,
                "提示",
                {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning",
                }
              )
                .then(() => {
                  this.pickList.push(item);
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消添加",
                  });
                });
            } else {
              this.pickList.push(item);
            }
          }
        }
      } else {
        this.pickList.splice(index, 1);
      }
    },
    //删除角色
    removeItem(item) {
      this.pickItem(item, { isLeaf: true });
    },
    reset() {
      this.pickList = [];
    },
    //给左侧选中数据打勾
    setChecked(item) {
      let index = this.pickList.findIndex((i) => {
        if (this.unique) {
          return i[this.unique] == item[this.unique];
        } else {
          return i[this.filterText] == item[this.filterText];
        }
      });
      if (index !== -1) {
        return true;
      } else {
        return false;
      }
    },
    //取消
    cancel() {
      this.reset();
      this.$emit("cancel");
    },
    //保存
    save() {
      this.$emit("save", this.pickList);
      this.cancel();
    },
    filterData(item) {
      if (item.groupname) {
        return true; //在别的组
      } else {
        return false; //不在别的组
      }
    },
  },
};
</script>
<style lang="scss" scoped>
$border: 1px solid #e2e2e2;
.list {
  height: calc(100% - 50px);
}
.list-item {
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  span {
    font-size: 14px;
  }
}
.list-item:hover {
  background-color: #e5f1fc;
}
.head-box {
  width: 24px;
  height: 24px;
  border-radius: 12px;
  overflow: hidden;
  margin-right: 10px;
  img {
    width: 24px;
    height: 24px;
  }
}
.transfer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
.transfer-container {
  height: 380px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .transfer-left {
    width: 50%;
    margin-right: 40px;
    height: 100%;
    border: $border;

    .input {
      height: 60px;
      width: 100%;
      padding: 15px 20px 10px;
    }
    .left-list {
      height: calc(100% - 60px);
    }
    ::v-deep .el-tree-node__content {
      display: flex;
      .custom-tree-node {
        width: calc(100% - 24px);
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
        .node-group {
          width: calc(100% - 20px);
          display: flex;
          .text {
            overflow: hidden; /*超出部分隐藏*/
            text-overflow: ellipsis; /* 超出部分显示省略号 */
            white-space: nowrap;
            width: calc(100% - 24px);
          }
        }
      }
    }
  }

  .transfer-right {
    width: 50%;
    height: 100%;
    border: $border;
    .transfer-right-header {
      height: 50px;
      padding-left: 20px;
      line-height: 50px;
      border-bottom: $border;
      background-color: #f5f7f9;
      span {
        font-size: 14px;
      }
    }
    .list-item {
      .list-item-left {
        width: calc(100% - 30px);
        display: flex;
        align-items: center;
        span.text {
          width: calc(100% - 34px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
.transfer-footer {
  height: calc(100% - 380px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .button-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 165px;
    .el-button {
      width: 70px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
::v-deep .inner-tree {
  //树节点
  .el-tree-node__content {
    padding: 4px 4px 4px 0;
    box-sizing: content-box;
  }
}
.el-image {
  width: 100%;
  height: 100%;
}
.el-icon-check,
.el-icon-close {
  font-size: 18px;
}
.el-icon-check {
  color: #67c23a;
}
.el-icon-close {
  color: #f56c6c;
}
</style>
