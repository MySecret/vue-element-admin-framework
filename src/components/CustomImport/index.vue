<!--
 * @Author: sxt
 * @Date: 2021-05-28 14:36:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-26 09:57:19
 * @Description: 导入excel
-->
<template>
  <CustomDialog
    title="导入"
    :visible.sync="visible"
    :showFooter="false"
    width="535px"
    @cancel="cancel"
  >
    <div class="import">
      <p>操作步骤</p>
      <p>
        1.下载
        <el-button @click="downloadTemp" type="text"
          >《{{ moduleName }}》</el-button
        >
      </p>
      <p>2.打开下载表，将对应信息填入或粘贴进本表。</p>
      <p>3.信息录入完毕并保存后，点击下方&lt;上传文件&gt;按钮上传Excel文档。</p>
      <p>4.点击&lt;开始导入&gt;</p>
      <el-upload
        class="upload"
        :action="UPLOADURL"
        :on-success="handleSuccess"
        :auto-upload="false"
        :headers="uploadHeaders"
        accept=".xls,.xlsx"
        :before-upload="beforeFileUpload"
        ref="upload"
        :limit="1"
      >
        <el-button size="small" type="primary" plain icon="el-icon-upload2"
          >点击上传</el-button
        >
        <div
          slot="tip"
          class="el-upload__tip"
          style="
            display: inline-block;
            color: #94a3b8;
            font-size: 14px;
            margin-left: 10px;
          "
        >
          附件支持类型：xlsx，最大不超过10M
        </div>
      </el-upload>
      <div style="margin-top: 50px; text-align: center">
        <el-button type="primary" icon="el-icon-download" @click="submitUpload"
          >开始导入</el-button
        >
      </div>
    </div>
  </CustomDialog>
</template>

<script>
import { getToken } from "@/utils/auth";
import { downloadExcel } from "@/utils";
import request from "@/utils/request";
export default {
  props: {
    moduleName: {
      type: String,
    },
    urlName: {
      type: String,
    },
    downUrl: {
      type: String,
    },
    upUrl: {
      type: String,
    },
    showImport: {
      type: Boolean,
    },
  },
  data() {
    return {
      UPLOADURL: "",
      uploadHeaders: {
        Authorization: getToken(),
      },
      visible: false,
    };
  },
  watch: {
    showImport(val) {
      this.visible = this.showImport;
    },
  },
  mounted() {
    this.UPLOADURL =
      process.env.VUE_APP_BASE_API +
      (this.upUrl ? this.upUrl : `/${this.urlName}/ImportDataByTemplate`);
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    handleSuccess(res, file, filelist) {
      if (res.code == 200) {
        this.$message({
          message: "导入成功！",
          type: "success",
        });
        this.$refs.upload.clearFiles();
        this.$emit("ok");
        this.cancel();
      } else {
        // this.$message.error(res.message);
        this.$message({
          dangerouslyUseHTMLString: true,
          message: `<strong> ${res.message} </strong>`,
          type: "warning",
        });
        this.$refs.upload.clearFiles();
      }
    },
    downloadTemp(downUrl) {
      request({
        url: this.downUrl
          ? this.downUrl
          : `/${this.urlName}/ExportExcelEmptySheet`,
        responseType: "blob",
      })
        .then((res) => {
          downloadExcel(res, this.moduleName);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    beforeFileUpload(file) {
      let types = ["xlsx", "xls"];
      let index = file.name.lastIndexOf(".");
      let type = file.name.substring(index + 1, file.name.length);
      const isAllowed = types.includes(type.toLowerCase());
      if (!isAllowed) {
        this.$message.error("上传文件只能是 xlsx, xls 格式!");
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error("上传文件不可大于10M!");
      }
      return isAllowed && isLt10M;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
  },
};
</script>

<style lang="scss" scoped>
.import {
  p {
    color: #334155;
    font-size: 14px;
    line-height: 30px;
    a {
      color: #1890ff;
    }
  }
}
</style>
