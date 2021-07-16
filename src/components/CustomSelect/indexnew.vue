<!--
 * @Author: sxt
 * @Date: 2021-06-04 11:01:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-17 11:30:54
 * @Description: file content
-->
<template>
  <el-select
    v-bind="$attrs"
    :placeholder="placeholder"
    :multiple="multiple"
    @change="selectChange"
    :value-key="valueKey"
    ref="select"
    :collapse-tags="collapseTags"
    :value="value"
  >
    <el-tree
      :data="options"
      :node-key="nodeKey"
      ref="treeSelect"
      highlight-current
      :props="defaultProps"
      @node-click="handleNodeClick"
      :show-checkbox="multiple"
    >
      <!-- @check-change="handleCheckChange" -->
      <span
        class="custom-tree-node"
        slot-scope="{ node, data }"
      >

        <el-option
          :label="data[defaultProps.label]"
          :value="data[customValue]"
        >

        </el-option>
      </span>
    </el-tree>
  </el-select>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Array],
      require: true,
    },
    isObject: {
      type: Boolean,
      default: false,
    },
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
    customValue: {
      type: String,
      default: "id",
    },
  },
  data() {
    return {
      selectValue: this.value,
      mineStatusValue: [],
    };
  },
  watch: {
    value(newVal) {
      this.selectValue = newVal;
    },
    selectValue(newV, oldV) {
      if (newV !== oldV) {
        this.$emit("input", newV);
      }
    },
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
        if (this.isObject) {
          arr.push(item);
        } else {
          arr.push(item[this.customValue]);
        }
      });

      this.mineStatusValue = arr;
      this.selectValue = arrLabel;
      // this.$emit("checkChange", arr); //获取选中的选项
    },
    // 节点点击事件（单选）
    handleNodeClick(data) {
      console.log(data);
      // this.selectValue = data[this.customValue];
      // // this.$emit("change", this.mineStatus);
      // this.$refs.select.blur();
    },
  },
};
</script>

<style>
</style>