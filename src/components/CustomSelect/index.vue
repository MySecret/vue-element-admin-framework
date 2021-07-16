<!--
 * @Author: sxt
 * @Date: 2021-06-04 11:01:31
 * @LastEditors: sxt
 * @LastEditTime: 2021-06-04 17:54:36
 * @Description: file content
-->
<template>
  <el-select
    v-bind="$attrs"
    v-model="mineStatus"
    :placeholder="placeholder"
    :multiple="multiple"
    @change="selectChange"
    :value-key="valueKey"
    ref="select"
    :collapse-tags="collapseTags"
  >
    <el-option
      :value="mineStatusValue"
      style="height: auto;padding:0;"
      v-if="multiple"
    >
      <el-tree
        :data="options"
        show-checkbox
        :node-key="nodeKey"
        ref="treeSelect"
        highlight-current
        :props="defaultProps"
        @check-change="handleCheckChange"
      ></el-tree>
    </el-option>
    <template v-else>

      <el-tree
        :data="options"
        :props="defaultProps"
        :expand-on-click-node="false"
        :check-on-click-node="true"
        @node-click="handleNodeClick"
        highlight-current
      >
        <span
          class="custom-tree-node"
          slot-scope="{ node, data }"
        >
          <el-option
            :label="data[defaultProps.label]"
            :value="data[value]"
          ></el-option>
        </span>
      </el-tree>
    </template>
  </el-select>
</template>

<script>
export default {
  props: {
    //选项
    options: {
      type: Array,
      default: () => [],
    },
    //树的配置选项
    defaultProps: {
      type: Object,
      default: {
        children: "children",
        label: "label",
      },
    },
    //当value值为对象时使用
    valueKey: {
      type: String,
    },

    placeholder: {
      type: String,
      default: "请选择",
    },
    //是否只获取子节点数据
    onlyLeaf: {
      type: Boolean,
      default: true,
    },
    //是否多选
    multiple: {
      type: Boolean,
      default: true,
    },

    nodeKey: {
      type: String,
    },

    //多选，多的话收起来
    collapseTags: {
      type: Boolean,
      default: true,
    },
    //option对应的value
    value: {
      type: String,
    },
  },
  data() {
    return {
      mineStatus: "",
      mineStatusValue: [],
    };
  },
  methods: {
    selectChange(e) {
      if (this.multiple) {
        var arrNew = [];
        var dataLength = this.mineStatusValue.length;
        var eleng = e.length;
        for (let i = 0; i < dataLength; i++) {
          for (let j = 0; j < eleng; j++) {
            if (e[j] === this.mineStatusValue[i][this.defaultProps.label]) {
              arrNew.push(this.mineStatusValue[i]);
            }
          }
        }
        this.$refs.treeSelect.setCheckedNodes(arrNew); //设置勾选的值
      }
    },
    handleCheckChange() {
      let res = this.$refs.treeSelect.getCheckedNodes(this.onlyLeaf, true); //这里两个true，1. 是否只是叶子节点 2. 是否包含半选节点（就是使得选择的时候不包含父节点）
      let arrLabel = [];
      let arr = [];
      res.forEach((item) => {
        arrLabel.push(item[this.defaultProps.label]);
        arr.push(item);
      });
      this.mineStatusValue = arr;
      this.mineStatus = arrLabel;
      this.$emit("checkChange", arr); //获取选中的选项
    },
    // 节点点击事件（单选）
    handleNodeClick(data) {
      this.mineStatus = data[this.value];
      this.$emit("change", this.mineStatus);
      this.$refs.select.blur();
    },
  },
};
</script>

<style>
</style>