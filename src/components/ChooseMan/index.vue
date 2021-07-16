<!--
 * @Author: gqf
 * @Date: 2021-06-10 14:53:22
 * @LastEditTime: 2021-06-11 16:54:52
 * @LastEditors: Please set LastEditors
 * @Description: 选择人员组件  mode:0-全部   1-用户   2-用户组 
 * @FilePath: \运动员管理前端v2e:\SVN\前端源码\业务系统\src\components\ChooseMan\index.vue
-->
<template>
  <CustomDialog
    @cancel="cancel"
    @save="save"
    :visible="true"
    class="choose-man-dialog"
    width="1440px"
    title="选择人员"
    :appendToBody="true"
  >
    <div class="cmd-main">
      <el-row :gutter="40">
        <el-col :span="12">
          <el-tabs v-model="activeName">
            <el-tab-pane label="用户" name="user">
              <div class="search-panel">
                <el-row :gutter="20">
                  <el-col :span="-1">
                    <CustomInput
                      placeholder="请输入人员名称"
                      clearable
                      v-model="uQuery.user_name"
                      @keyup.enter.native="queryUser"
                      style="width: 160px"
                    >
                    </CustomInput>
                  </el-col>
                  <el-col :span="-1">
                    <CustomInput
                      placeholder="请输入标签"
                      clearable
                      v-model="uQuery.tag_names"
                      @keyup.enter.native="queryUser"
                      style="width: 160px"
                    >
                    </CustomInput>
                  </el-col>
                  <el-col :span="-1">
                    <CustomInput
                      placeholder="请输入技能"
                      clearable
                      v-model="uQuery.skillnames"
                      @keyup.enter.native="queryUser"
                      style="width: 160px"
                    >
                    </CustomInput>
                  </el-col>
                  <el-col :span="-1">
                    <div class="btns">
                      <el-button type="primary" @click="queryUser"
                        >查询</el-button
                      >
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
                        upage.pageSize * (upage.currentPage - 1) +
                        scope.$index +
                        1
                      }}
                    </span>
                  </template>
                </CustomTable>
              </div>
            </el-tab-pane>
            <el-tab-pane label="用户组" name="usergroup">
              <div class="search-panel">
                <el-row :gutter="20">
                  <el-col :span="-1">
                    <CustomInput
                      placeholder="请输入人员组名"
                      clearable
                      v-model="ugQuery.group_name"
                      @keyup.enter.native="queryUserGroup"
                      style="width: 160px"
                    >
                    </CustomInput>
                  </el-col>
                  <el-col :span="-1">
                    <CustomInput
                      placeholder="请输入组描述"
                      clearable
                      v-model="ugQuery.group_remark"
                      @keyup.enter.native="queryUserGroup"
                      style="width: 160px"
                    >
                    </CustomInput>
                  </el-col>
                  <el-col :span="-1">
                    <CustomInput
                      placeholder="请输入组标签"
                      clearable
                      v-model="ugQuery.group_tag_names"
                      @keyup.enter.native="queryUserGroup"
                      style="width: 160px"
                    >
                    </CustomInput>
                  </el-col>
                  <el-col :span="-1">
                    <div class="btns">
                      <el-button type="primary" @click="queryUserGroup"
                        >查询</el-button
                      >
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="table-panel">
                <CustomTable
                  :data="userGroupData"
                  :columns="userGroupColumns"
                  :total="ugpage.total"
                  :current-page="ugpage.currentPage"
                  :page-size="ugpage.pageSize"
                  @current-change="ugpageChangeCurrent"
                  @size-change="ugpageSizeChange"
                  @selection-change="ugpageSelectionChange"
                  tableContainer=".table-panel"
                  :paddingSpace="40"
                  :needMaxHeight="true"
                  :needSelection="true"
                  :reserveSelection="true"
                  rowKey="id"
                  ref="usergrouptable"
                >
                  <template v-slot:xh="{ scope }">
                    <span class="xh">
                      {{
                        ugpage.pageSize * (ugpage.currentPage - 1) +
                        scope.$index +
                        1
                      }}
                    </span>
                  </template>
                </CustomTable>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="12">
          <div class="checked-list">
            <h3>已选人员</h3>
            <div class="checked-table" v-show="activeName == 'user'">
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
                <template v-slot:action="{ scope }">
                  <div class="operate">
                    <el-button @click="removeUser(scope.row)" type="text">
                      删除
                    </el-button>
                  </div>
                </template>
              </CustomTable>
            </div>
            <div class="checked-table" v-show="activeName == 'usergroup'">
              <CustomTable
                :data="uGroupCheckList"
                :columns="userGroupCheckColumns"
                tableContainer=".checked-table"
                :paddingSpace="0"
                :needPagination="false"
                :needMaxHeight="true"
                ref="ugctable"
              >
                <template v-slot:xh="{ scope }">
                  <span class="xh">
                    {{ scope.$index + 1 }}
                  </span>
                </template>
                <template v-slot:action="{ scope }">
                  <div class="operate">
                    <el-button @click="removeUserGroup(scope.row)" type="text">
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
import { getUserGroupPageList } from "@/api/basedata.js";
export default {
  data() {
    return {
      activeName: "user",
      uCheckList: [],
      uGroupCheckList: [],
      uRecordList:[],
      gRecordList:[],
      userData: [],
      userGroupData: [],
      userColumns: [
        {
          prop: "xh",
          minWidth: 60,
          label: "序号",
          diy: true,
        },
        {
          prop: "user_name",
          label: "名称",
          align: "center",
        },
        {
          prop: "tag_names",
          label: "标签",
          align: "center",
        },
        {
          prop: "skillnames",
          label: "技能",
          align: "center",
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
          prop: "user_name",
          label: "名称",
          align: "center",
        },
        {
          prop: "tag_names",
          label: "标签",
          align: "center",
        },
        {
          prop: "skillnames",
          label: "技能",
          align: "center",
        },
        {
          prop: "action",
          label: "操作",
          align: "center",
          width: 80,
          diy: true,
        },
      ],
      userGroupColumns: [
        {
          prop: "xh",
          minWidth: 60,
          label: "序号",
          diy: true,
        },
        {
          prop: "group_name",
          label: "人员组名",
          align: "center",
        },
        {
          prop: "group_remark",
          label: "组描述",
          align: "center",
        },
        {
          prop: "group_tag_names",
          label: "组标签",
          align: "center",
        },
      ],
      userGroupCheckColumns: [
        {
          prop: "xh",
          minWidth: 60,
          label: "序号",
          diy: true,
        },
        {
          prop: "group_name",
          label: "人员组名",
          align: "center",
        },
        {
          prop: "group_remark",
          label: "组描述",
          align: "center",
        },
        {
          prop: "group_tag_names",
          label: "组标签",
          align: "center",
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
      ugQuery: {
        group_name: "",
        group_remark: "",
        group_tag_names: "",
      },
      upage: {
        total: 0,
        currentPage: 1,
        pageSize: 20,
      },
      ugpage: {
        total: 0,
        currentPage: 1,
        pageSize: 20,
      },
    };
  },
  props: {
    mode: {
      type: Number,
      default: 0,
    },
    initUserList: {//初始化选中用户
      type: Array,
      default: () => {
        return [];
      },
    },
    initUserGroupList: {//初始化选中用户组
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  mounted() {
    this.uCheckList = JSON.parse(JSON.stringify(this.initUserList));
    this.uGroupCheckList = JSON.parse(JSON.stringify(this.initUserGroupList));
    this.uRecordList =  JSON.parse(JSON.stringify(this.initUserList));
    this.gRecordList = JSON.parse(JSON.stringify(this.initUserGroupList));
    this.queryUser();
    this.queryUserGroup();
  },
  methods: {
    cancel() {
      this.$emit("close");
    },
    queryUser() {
      var params = Object.assign({entry_status:1,status:1}, this.uQuery, {
        pageIndex: this.upage.currentPage,
        pageSize: this.upage.pageSize,
      });
      getUserPageList(params).then((res) => {
        this.userData = res.data.dtData;
        this.upage.total = res.data.recordCount;
        //更新uRecordList，去掉当前id所在的项
        this.uRecordList = this.uRecordList.filter((item) => {
          return !this.userData.some((t) => {
            t.user_code == item.user_code;
          });
        });

        this.$nextTick(() => {
          this.syncUserCheck();
        });
      });
    },
    queryUserGroup() {
      var params = Object.assign({}, this.ugQuery, {
        pageIndex: this.ugpage.currentPage,
        pageSize: this.ugpage.pageSize,
      });
      getUserGroupPageList(params).then((res) => {
        this.userGroupData = res.data.dtData;
        this.ugpage.total = res.data.recordCount;
        //更新gRecordList，去掉当前id所在的项
        this.gRecordList = this.gRecordList.filter((item) => {
          return !this.userGroupData.some((t) => {
            t.id == item.id;
          });
        });
        this.$nextTick(() => {
          this.syncUserGroupCheck();
        });
      });
    },
    upageChangeCurrent(page) {
      this.upage.currentPage = page;
      this.queryUser();
    },
    upageSizeChange(pagesize) {
      this.upage.pageSize = pagesize;
      this.queryUser();
    },
    upageSelectionChange(val) {
      this.uCheckList = val;
    },
    ugpageChangeCurrent(page) {
      this.ugpage.currentPage = page;
      this.queryUserGroup();
    },
    ugpageSizeChange(pagesize) {
      this.ugpage.pageSize = pagesize;
      this.queryUserGroup();
    },
    ugpageSelectionChange(val) {
      this.uGroupCheckList = val;
    },
    syncUserCheck() {
      let ids = this.uCheckList.map((item) => {
        return item.user_code;
      });
      for (var i = 0; i < this.userData.length; i++) {
        if (ids.includes(this.userData[i].user_code)) {
          this.$refs.usertable.toggleRowSelection(this.userData[i], true);
        } else {
          this.$refs.usertable.toggleRowSelection(this.userData[i], false);
        }
      }
      //矫正uCheckList列表
      this.uCheckList = this.uCheckList.filter((item) => {
        return ids.includes(item.user_code);
      });
      if (this.uRecordList.length) {
        let spare = this.uRecordList.filter((t) => {
          return !this.uCheckList.some((k) => {
            return k.user_code == t.user_code;
          });
        });
        this.uCheckList = this.uCheckList.concat(spare);
      }
    },
    syncUserGroupCheck() {
      let ids = this.uGroupCheckList.map((item) => {
        return item.id;
      });
      for (var i = 0; i < this.userGroupData.length; i++) {
        if (ids.includes(this.userGroupData[i].id)) {
          this.$refs.usergrouptable.toggleRowSelection(
            this.userGroupData[i],
            true
          );
        } else {
          this.$refs.usergrouptable.toggleRowSelection(
            this.userGroupData[i],
            false
          );
        }
      }
      //矫正uGroupCheckList列表
      this.uGroupCheckList = this.uGroupCheckList.filter((item) => {
        return ids.includes(item.id);
      });
      if (this.gRecordList.length) {
        let spare = this.gRecordList.filter((t) => {
          return !this.uGroupCheckList.some((k) => {
            return k.id == t.id;
          });
        });
        this.uGroupCheckList = this.uGroupCheckList.concat(spare);
      }
    },
    removeUser(row) {
      this.uCheckList = this.uCheckList.filter((item) => {
        return item.user_code != row.user_code;
      });
      this.uRecordList = this.uRecordList.filter((item) => {
        return item.user_code != row.user_code;
      });
      this.syncUserCheck();
    },
    removeUserGroup(row) {
      this.uGroupCheckList = this.uGroupCheckList.filter((item) => {
        return item.id != row.id;
      });
       this.gRecordList = this.gRecordList.filter((item) => {
        return item.id != row.id;
      });
      this.syncUserGroupCheck();
      // this.$refs.usergrouptable.toggleRowSelection(row, false);
    },
    save() {
      this.$emit("save", [this.uCheckList, this.uGroupCheckList]);
      this.cancel();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>