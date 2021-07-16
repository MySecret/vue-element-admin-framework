<!--
 * @Author: gqf
 * @Date: 2021-06-10 14:53:22
 * @LastEditTime: 2021-06-11 15:42:52
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
                  <el-button type="primary" @click="queryUser">查询</el-button>
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
            </CustomTable>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="checked-list">
            <h3>已选人员</h3>
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
                <template v-slot:action="{ scope }">
                  <div class="operate">
                    <el-button @click="removeUser(scope.row)" type="text">
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
  data() {
    return {
      uCheckList: [],
      uRecordList: [],
      userData: [],
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
  props: {
    mode: {
      type: Number,
      default: 0,
    },
    initUserList: {
      //初始化选中用户
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  mounted() {
    this.uCheckList = JSON.parse(JSON.stringify(this.initUserList));
    this.uRecordList = JSON.parse(JSON.stringify(this.initUserList));
    this.queryUser();
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
    removeUser(row) {
      this.uCheckList = this.uCheckList.filter((item) => {
        return item.user_code != row.user_code;
      });
      this.uRecordList = this.uRecordList.filter((item) => {
        return item.user_code != row.user_code;
      });
      this.syncUserCheck();
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