<!--
@author:gqf
@date:2021/01/23
@desc:自定义表格
#doc 文档参照element-ui table与pagination部分 https://element.eleme.cn/#/zh-CN/component/table  https://element.eleme.cn/#/zh-CN/component/pagination
table的current-change事件改成监听currrent-page-change事件，原因是current-change事件与pagination的current-change重名了。
-->
<template>
  <div class="custom-table">
    <div class="filter-column" v-if="filterColumn">
      <el-dropdown trigger="click" :hide-on-click="false">
        <span class="el-dropdown-link">
          <i class="el-icon-s-grid i-handle"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(column, index) in columns" :key="index">
            <el-checkbox v-model="column.isShow">{{
              column["label"]
            }}</el-checkbox>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="table-main">
      <el-table
        ref="customTable"
        :data="data"
        :size="size"
        :width="width"
        :height="height"
        :maxHeight="maxHeight"
        :fit="fit"
        :stripe="stripe"
        :border="border"
        :rowKey="rowKey"
        :showHeader="showHeader"
        :showSummary="showSummary"
        :sumText="sumText"
        :summaryMethod="summaryMethod"
        :rowClassName="rowClassName"
        :rowStyle="rowStyle"
        :cellClassName="cellClassName"
        :cellStyle="cellStyle"
        :headerRowClassName="headerRowClassName"
        :headerRowStyle="headerRowStyle"
        :headerCellClassName="headerCellClassName"
        :headerCellStyle="headerCellStyle"
        :highlightCurrentRow="highlightCurrentRow"
        :currentRowKey="currentRowKey"
        :emptyText="emptyText"
        :expandRowKeys="expandRowKeys"
        :defaultExpandAll="defaultExpandAll"
        :defaultSort="defaultSort"
        :tooltipEffect="tooltipEffect"
        :spanMethod="spanMethod"
        :selectOnIndeterminate="selectOnIndeterminate"
        :indent="indent"
        :treeProps="treeProps"
        :lazy="lazy"
        :load="load"
        @select="select"
        @select-all="selectAll"
        @selection-change="selectionChange"
        @cell-mouse-enter="cellMouseEnter"
        @cell-mouse-leave="cellMouseLeave"
        @cell-click="cellClick"
        @cell-dblclick="cellDblclick"
        @row-click="rowClick"
        @row-contextmenu="rowContextmenu"
        @row-dblclick="rowDblclick"
        @header-click="headerClick"
        @header-contextmenu="headerContextmenu"
        @sort-change="sortChange"
        @filter-change="filterChange"
        @current-change="currentRowChange"
        @header-dragend="headerDragend"
        @expand-change="expandChange"
      >
        <el-table-column
          type="selection"
          v-if="needSelection"
          :width="selectionWidth"
          :reserve-selection="reserveSelection"
          :selectable="selectable"
        >
        </el-table-column>

        <template v-for="(column, index) in columns">
          <el-table-column v-bind="column" :key="index" v-if="!column.hidden">
            <template slot="header" slot-scope="scope">
              <slot
                v-if="column.diyHead"
                :name="column.prop + 'Head'"
                v-bind:scope="scope"
              />
              <span v-else>{{ scope["column"].label }}</span>
            </template>
            <template slot-scope="scope">
              <slot
                v-if="column.diy"
                :name="column.prop"
                v-bind:scope="scope"
              />
              <span v-else>{{
                column.formatter
                  ? column.formatter(scope.row, column)
                  : scope.row[column.prop]
              }}</span>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div style="display: flex">
      <div class="control">
        <slot name="control"></slot>
      </div>
      <div class="pagination" v-if="needPagination">
        <el-pagination
          background
          :page-sizes="[10, 20, 30, 40, 50, 100, 200]"
          :page-size="pageSize"
          :pager-count="5"
          :current-page="currentPage"
          :total="total"
          layout="total,sizes,prev,pager,next,jumper"
          :hide-on-single-page="false"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          @prev-click="handlePrevClick"
          @next-click="handleNextClick"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "CustomTable",
  props: {
    //包含表格的一个dom 选择器
    tableContainer: {
      type: String,
    },
    //需要减去的高度，包裹层内除了table以外空间占据得高度
    paddingSpace: {
      type: Number,
      default: 0,
    },
    //是否具有列过滤
    filterColumn: {
      type: Boolean,
      default: false,
    },
    //列得定义
    columns: {
      type: Array,
      default: [],
    },
    //是否需要过滤
    needPagination: {
      type: Boolean,
      default: true,
    },
    //分页-总页数
    total: {
      type: Number,
      default: 0,
    },
    //分页-当前页
    currentPage: {
      type: Number,
      default: 1,
    },
    //分页-每页条目数
    pageSize: {
      type: Number,
      default: 10,
    },
    //----Table相关属性start----
    //数据
    data: {
      type: Array,
      default: function () {
        return [];
      },
    },
    //Table 的尺寸
    size: String,

    //table 宽度
    width: [String, Number],

    //table是否需要固定高度
    needHeight: {
      type: Boolean,
      default: false,
    },
    //table是否需要提供最大高度
    needMaxHeight: {
      type: Boolean,
      default: false,
    },
    //列的宽度是否自撑开
    fit: {
      type: Boolean,
      default: true,
    },
    //是否为斑马纹 table
    stripe: Boolean,
    //是否带有纵向边框
    border: Boolean,
    //行数据的 Key
    rowKey: [String, Function],
    //是否显示表头
    showHeader: {
      type: Boolean,
      default: true,
    },
    //是否在表尾显示合计行
    showSummary: Boolean,
    //合计行第一列的文本
    sumText: String,
    //自定义的合计计算方法
    summaryMethod: Function,
    //行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
    rowClassName: [String, Function],
    //行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style
    rowStyle: [Object, Function],
    //单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。
    cellClassName: [String, Function],
    //单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
    cellStyle: [Object, Function],
    //表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
    headerRowClassName: [String, Function],
    //表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。
    headerRowStyle: [Object, Function],
    //表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。
    headerCellClassName: [String, Function],
    //表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。
    headerCellStyle: [Object, Function],
    //是否要高亮当前行
    highlightCurrentRow: Boolean,
    //当前行的 key，只写属性
    currentRowKey: [String, Number],
    //空数据时显示的文本内容，也可以通过 slot="empty" 设置
    emptyText: String,
    //可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。
    expandRowKeys: Array,
    //是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效
    defaultExpandAll: Boolean,
    //默认的排序列的 prop 和顺序。它的prop属性指定默认的排序的列，order指定默认排序的顺序
    defaultSort: Object,
    //tooltip effect 属性
    tooltipEffect: String,
    //合并行或列的计算方法
    spanMethod: Function,
    //在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。若为 true，则选中所有行；若为 false，则取消选择所有行
    selectOnIndeterminate: {
      type: Boolean,
      default: true,
    },
    //展示树形数据时，树节点的缩进
    indent: {
      type: Number,
      default: 16,
    },
    //渲染嵌套数据的配置选项
    treeProps: {
      type: Object,
      default() {
        return {
          hasChildren: "hasChildren",
          children: "children",
        };
      },
    },
    //是否懒加载子节点数据
    lazy: Boolean,
    //加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息
    load: Function,
    showTip: {
      type: Boolean,
      default: false,
    },
    //是否需要checkbox
    needSelection: {
      type: Boolean,
      default: false,
    },
    //是否在数据更新之后保留之前选中的数据（需指定 row-key）
    reserveSelection: {
      type: Boolean,
      default: false,
    },
    //选中框所在单元格的宽度
    selectionWidth: {
      type: Number,
      dafault: 55,
    },
    selectable: Function,
    //----table相关属性end----
  },
  data() {
    return {
      height: undefined,
      maxHeight: undefined,
      _height: undefined,
    };
  },
  mounted() {
    this.calcTableHeight();
  },
  beforeUpdate() {
    // 重新布局表格
    this.$nextTick(() => {
      this.doLayout();
    });
  },
  methods: {
    handleSizeChange(pagesize) {
      this.$emit("size-change", pagesize);
    },
    handleCurrentChange(page) {
      this.$emit("current-change", page);
    },
    handlePrevClick(page) {
      this.$emit("prev-click", page);
    },
    handleNextClick(page) {
      this.$emit("next-click", page);
    },
    select(selection, row) {
      this.$emit("select", selection, row);
    },
    selectAll(selection) {
      this.$emit("select-all", selection);
    },
    selectionChange(selection) {
      this.$emit("selection-change", selection);
    },
    cellMouseEnter(row, column, cell, event) {
      this.$emit("cell-mouse-enter", row, column, cell, event);
    },
    cellMouseLeave(row, column, cell, event) {
      this.$emit("cell-mouse-leave", row, column, cell, event);
    },
    cellClick(row, column, cell, event) {
      this.$emit("cell-click", row, column, cell, event);
    },
    cellDblclick(row, column, cell, event) {
      this.$emit("cell-dbclick", row, column, cell, event);
    },
    rowClick(row, column, event) {
      this.$emit("row-click", row, column, event);
    },
    rowContextmenu(row, column, event) {
      this.$emit("row-contextmenu", row, column, event);
    },
    rowDblclick(row, column, event) {
      this.$emit("row-dblclick", row, column, event);
    },
    headerClick(column, event) {
      this.$emit("header-click", column, event);
    },
    headerContextmenu(column, event) {
      this.$emit("header-contextmenu", column, event);
    },
    sortChange(params) {
      this.$emit("sort-change", params);
    },
    filterChange(filters) {
      this.$emit("filter-change", filters);
    },
    currentRowChange(currentRow, oldCurrentRow) {
      this.$emit("current-row-change", currentRow, oldCurrentRow);
    },
    headerDragend(newWidth, oldWidth, column, event) {
      this.$emit("header-dragend", newWidth, oldWidth, column, event);
    },
    expandChange(row, params) {
      this.$emit("expand-change", row, params);
    },
    clearSelection() {
      this.$refs.customTable.clearSelection();
    },
    toggleRowSelection(row, selected) {
      this.$refs.customTable.toggleRowSelection(row, selected);
    },
    toggleAllSelection() {
      this.$refs.customTable.toggleAllSelection();
    },
    toggleRowExpansion(row, expanded) {
      this.$refs.customTable.toggleRowExpansion(row, expanded);
    },
    setCurrentRow(row) {
      this.$refs.customTable.setCurrentRow(row);
    },
    clearSort() {
      this.$refs.customTable.clearSort();
    },
    clearFilter(columnKey) {
      this.$refs.customTable.clearFilter(columnKey);
    },
    doLayout() {
      if (this.$refs.customTable) {
        this.$refs.customTable.doLayout();
      }
    },
    sort(prop, order) {
      this.$refs.customTable.sort(prop, order);
    },
    //计算表格的高度
    calcTableHeight() {
      this.$nextTick(() => {
        this._height = $(this.tableContainer).height() - this.paddingSpace;
        if (this.needHeight) {
          this.height = this._height;
        }
        if (this.needMaxHeight) {
          this.maxHeight = this._height;
        }
      });

      $(window).resize(() => {
        this._height = $(this.tableContainer).height() - this.paddingSpace;
        if (this.needHeight) {
          this.height = this._height;
        }
        if (this.needMaxHeight) {
          this.maxHeight = this._height;
        }
        this.doLayout();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-table {
  .control {
    padding-top: 8px;
    .control-main {
      align-items: center;
      color: #666;
      display: flex;
      font-size: 14px;
      .checkAll {
        padding-left: 14px;
        width: 55px;
      }
      > span {
        margin: 0 10px;
      }
    }
  }
  .pagination {
    padding-top: 8px;
    flex: 1;
    text-align: right;
    .el-pagination {
      ::v-deep .el-pagination__total,
      ::v-deep .el-pagination__jump,
      ::v-deep .el-input__inner {
        font-size: 14px !important;
      }
      ::v-deep .number,
      ::v-deep button {
        width: 28px;
        height: 28px;
        background-color: #fff !important;
        color: #334155 !important;
        border-radius: 4px !important;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
      }
      ::v-deep .active {
        background-color: #1890ff !important;
        color: #ffffff !important;
      }
    }
  }
  .filter-column {
    text-align: right;
    padding: 12px 0 13px 0;
    .i-handle {
      font-size: 24px;
    }
  }
  .custon-table {
    .action {
      button {
        padding-top: 0;
        padding-bottom: 0;
      }
    }
  }
  ::v-deep th.el-table-column--selection {
    .el-checkbox {
      display: none;
    }
  }
}
</style>
