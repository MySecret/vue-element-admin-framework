<!--
 * @Author: gqf
 * @Date: 2021-06-10 14:53:22
 * @LastEditTime: 2021-07-15 13:41:35
 * @LastEditors: Please set LastEditors
 * @Description: 选择人员组件  mode:0-全部   1-用户   2-用户组 
 * @FilePath: \运动员管理前端v2e:\SVN\前端源码\业务系统\src\components\ChooseMan\index.vue
-->
<template>
  <CustomDialog
    @cancel="cancel"
    @save="save"
    :visible="true"
    class="choose-prod-dialog"
    width="1440px"
    :title="title"
    :appendToBody="true"
  >
    <div class="cmd-main">
      <el-row :gutter="40">
        <el-col :span="12">
          <div class="search-panel">
            <el-row :gutter="20">
              <el-col :span="-1">
                <CustomInput
                  placeholder="请输入物料编码/名称"
                  clearable
                  v-model="uQuery.name"
                  @keyup.enter.native="queryProd"
                  style="width: 160px"
                >
                </CustomInput>
              </el-col>
              <el-col :span="-1">
                <CustomInput
                  placeholder="请输入规格型号"
                  clearable
                  v-model="uQuery.model"
                  @keyup.enter.native="queryProd"
                  style="width: 160px"
                >
                </CustomInput>
              </el-col>
              <el-col :span="-1">
                <el-select
                  v-model="uQuery.type"
                  placeholder="请选择类别"
                >
                  <el-option value=""></el-option>
                </el-select>
              </el-col>
              <el-col :span="-1">
                <div class="btns">
                  <el-button
                    type="primary"
                    @click="queryProd"
                  >查询</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="table-panel">
            <CustomTable
              :data="userData"
              :columns="userColumns"
              :total="upage.total"
              :current-page="upage.currentPage"
              :page-size="upage.pageSize"
              @current-change="upageChangeCurrent"
              @size-change="upageSizeChange"
              @selection-change="upageSelectionChange"
              tableContainer=".table-panel"
              :paddingSpace="40"
              :needMaxHeight="true"
              :needSelection="true"
              :reserveSelection="true"
              rowKey="user_code"
              ref="usertable"
            >
              <template v-slot:xh="{ scope }">
                <span class="xh">
                  {{
                    upage.pageSize * (upage.currentPage - 1) + scope.$index + 1
                  }}
                </span>
              </template>
              <template v-slot:count="{ scope }">
                <div>
                  <el-input
                    v-model="scope.row.count"
                    @keydown.native="countKeyDown($event, scope.row, scope)"
                    @blur="countBlur($event, scope.row)"
                    placeholder="请输入"
                  >
                    <template slot="append">台</template>
                  </el-input>
                </div>
              </template>
            </CustomTable>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="checked-list">
            <h3>{{subTitle}}</h3>
            <div class="checked-table">
              <CustomTable
                :data="uCheckList"
                :columns="userCheckColumns"
                tableContainer=".checked-table"
                :paddingSpace="0"
                :needPagination="false"
                :needMaxHeight="true"
                ref="uctable"
              >
                <template v-slot:xh="{ scope }">
                  <span class="xh">
                    {{ scope.$index + 1 }}
                  </span>
                </template>
                <template v-slot:count="{ scope }">
                  <span>{{scope.row.count}}台</span>
                </template>
                <template v-slot:action="{ scope }">
                  <div class="operate">
                    <el-button
                      @click="removeProd(scope.row)"
                      type="text"
                    >
                      删除
                    </el-button>
                  </div>
                </template>
              </CustomTable>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </CustomDialog>
</template>
<script>
import { getUserPageList } from "@/api/system.js";
export default {
  props: {
    title: {
      type: String,
      default: "选择产品",
    },
    subTitle: {
      type: String,
      default: "已选产品",
    },
  },
  data() {
    return {
      uCheckList: [],
      userData: [],
      userColumns: [
        {
          prop: "xh",
          minWidth: 60,
          label: "序号",
          diy: true,
        },
        {
          prop: "code",
          label: "物料编码",
          align: "center",
        },
        {
          prop: "name",
          label: "物料名称",
          align: "center",
        },
        {
          prop: "model",
          label: "规格型号",
          align: "center",
        },
        {
          prop: "count",
          label: "数量",
          align: "center",
          diy: true,
        },
      ],
      userCheckColumns: [
        {
          prop: "xh",
          minWidth: 60,
          label: "序号",
          diy: true,
        },
        {
          prop: "code",
          label: "物料编码",
          align: "center",
        },
        {
          prop: "name",
          label: "物料名称",
          align: "center",
        },
        {
          prop: "model",
          label: "规格型号",
          align: "center",
        },
        {
          prop: "count",
          label: "数量",
          align: "center",
          diy:true
        },
        {
          prop: "action",
          label: "操作",
          align: "center",
          width: 80,
          diy: true,
        },
      ],
      uQuery: {
        user_name: "",
        tag_names: "",
        skillnames: "",
      },
      upage: {
        total: 0,
        currentPage: 1,
        pageSize: 20,
      },
    };
  },
  mounted() {
    this.userData = [
      {
        id: 1,
        code: "111",
        name: "TYHW-0025",
        model: "跑步机",
        count: 1,
        sum: 0,
        price: "",
        taxrate: "",
        discount: "",
        remark: "",
      },
      {
        id: 2,
        code: "222",
        name: "TYHW-0025",
        model: "跑步机",
        count: 1,
        sum: 0,
        price: "",
        taxrate: "",
        discount: "",
        remark: "",
      },
      {
        id: 1,
        code: "333",
        name: "TYHW-0025",
        model: "跑步机",
        count: 1,
        sum: 0,
        price: "",
        taxrate: "",
        discount: "",
        remark: "",
      },
      {
        id: 2,
        code: "444",
        name: "TYHW-0025",
        model: "跑步机",
        count: 1,
        sum: 0,
        price: "",
        taxrate: "",
        discount: "",
        remark: "",
      },
      {
        id: 1,
        code: "555",
        name: "TYHW-0025",
        model: "跑步机",
        count: 1,
        sum: 0,
        price: "",
        taxrate: "",
        discount: "",
        remark: "",
      },
      {
        id: 2,
        code: "666",
        name: "TYHW-0025",
        model: "跑步机",
        count: 1,
        sum: 0,
        price: "",
        taxrate: "",
        discount: "",
        remark: "",
      },
      {
        id: 1,
        code: "777",
        name: "TYHW-0025",
        model: "跑步机",
        count: 1,
        sum: 0,
        price: "",
        taxrate: "",
        discount: "",
        remark: "",
      },
      {
        id: 2,
        code: "888",
        name: "TYHW-0025",
        model: "跑步机",
        count: 1,
        sum: 0,
        price: "",
        taxrate: "",
        discount: "",
        remark: "",
      },
      {
        id: 1,
        code: "999",
        name: "TYHW-0025",
        model: "跑步机",
        count: 1,
        sum: 0,
        price: "",
        taxrate: "",
        discount: "",
        remark: "",
      },
      {
        id: 2,
        code: "000",
        name: "TYHW-0025",
        model: "跑步机",
        count: 1,
        sum: 0,
        price: "",
        taxrate: "",
        discount: "",
        remark: "",
      },
    ];
    //this.queryProd();
  },
  methods: {
    cancel() {
      this.$emit("close");
    },
    queryProd() {
      // var params = Object.assign({entry_status:1,status:1}, this.uQuery, {
      //   pageIndex: this.upage.currentPage,
      //   pageSize: this.upage.pageSize,
      // });
      // getUserPageList(params).then((res) => {
      //   this.userData = res.data.dtData;
      //   this.upage.total = res.data.recordCount;
      //   this.$nextTick(() => {
      //     this.syncUserCheck();
      //   });
      // });
    },
    upageChangeCurrent(page) {
      this.upage.currentPage = page;
      this.queryProd();
    },
    upageSizeChange(pagesize) {
      this.upage.pageSize = pagesize;
      this.queryProd();
    },
    upageSelectionChange(val) {
      this.uCheckList = val;
    },
    syncUserCheck() {
      let ids = this.uCheckList.map((item) => {
        return item.id;
      });
      for (var i = 0; i < this.userData.length; i++) {
        if (ids.includes(this.userData[i].id)) {
          this.$refs.usertable.toggleRowSelection(this.userData[i], true);
        } else {
          this.$refs.usertable.toggleRowSelection(this.userData[i], false);
        }
      }
      //矫正uCheckList列表
      this.uCheckList = this.uCheckList.filter((item) => {
        return ids.includes(item.id);
      });
    },
    removeProd(row) {
      this.uCheckList = this.uCheckList.filter((item) => {
        return item.id != row.id;
      });
      this.syncUserCheck();
    },
    countKeyDown(event, row, scope) {
      console.log(scope);
      var key = event.key;
      var keyCode = event.keyCode;
      var reg = /^[0-9]$/;
      if (keyCode == 8) {
        event.returnValue = true;
      } else if (reg.test(key)) {
        event.returnValue = true;
      } else {
        event.returnValue = false;
      }
    },
    countBlur(event, row) {
      let count = parseInt(row.count);
      row.count = isNaN(count) || count < 1 ? 1 : count;
    },
    save() {
      this.$emit("save", this.uCheckList);
      this.cancel();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>