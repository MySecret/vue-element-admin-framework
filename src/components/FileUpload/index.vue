<!--
 * @Author: gqf
 * @Date: 2021-06-10 19:49:29
 * @LastEditTime: 2021-07-07 09:24:04
 * @LastEditors: Please set LastEditors
 * @Description: 上传文件组件
 * @FilePath: \运动员管理前端v2e:\SVN\前端源码\业务系统\src\components\FileUpload\index.vue
-->
<template>
  <div class="com-file-upload">
    <el-upload
      class="upload-demo"
      :action="action"
      :headers="uploadHeaders"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :on-preview="handlePreview"
      :file-list="fileList"
      ref="upload"
    >
      <el-button icon="el-icon-upload2" style="margin-top: 16px"
        >点击上传</el-button
      >
      <div slot="tip" class="el-upload__tip">
        附件支持最大{{ limit }}M。支持格式：{{
          accept
            .map((item) => {
              return "." + item.toLocaleUpperCase();
            })
            .join(" ")
        }}
      </div>
    </el-upload>
  </div>
</template>

<script>
let UPLOADURL = process.env.VUE_APP_BASE_API + "/BUpload/UploadFile";
import { getOSSFileUrl } from "@/api/utils.js";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      fileList: [],
      uploadHeaders: {
        Authorization: getToken(),
      },
    };
  },
  props: {
    action: {
      type: String,
      default: UPLOADURL,
    },
    initList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    accept: {
      type: Array,
      default: function () {
        return [
          "pdf",
          "doc",
          "docx",
          "xls",
          "xlsx",
          "txt",
          "jpg",
          "jpeg",
          "bmp",
          "gif",
          "rar",
          "zip",
        ];
      },
    },
    limit: {
      type: Number,
      default: 20, //兆
    },
  },
  watch: {
    initList: {
      handler(val) {
        this.fileList = [];
        for (var i = 0; i < val.length; i++) {
          this.fileList.push({
            name: val[i],
            response: {
              message: val[i],
            },
          });
        }
      },
      immediate: true,
    },
  },
  methods: {
    //附件格式校验
    beforeUpload(file) {
      let index = file.name.lastIndexOf(".");
      let type = file.name.substring(index + 1, file.name.length);
      const isAllowed = this.accept.includes(type.toLowerCase());
      if (!isAllowed) {
        this.$message.error(`上传文件格式有误,请重新选择!`);
      }
      const isLt20M = file.size / 1024 / 1024 < this.limit;
      if (!isLt20M) {
        this.$message.error("上传文件不可大于" + this.limit + "M!");
      }
      return isAllowed && isLt20M;
    },
    clearFiles() {
      this.$refs.upload.clearFiles();
      this.fileList = [];
    },
    handleRemove(file, filelist) {
      let list = filelist.map((item) => {
        return item.response.message;
      });
      this.$emit("remove", list);
    },
    handleSuccess(res, file, filelist) {
      let list = filelist.map((item) => {
        console.log(item.response.message);
        return item.response.message;
      });
      this.$emit("success", list);
    },
    handlePreview(file) {
      let key = file.response.message;
      getOSSFileUrl(key).then((res) => {
        if (res.code == 200) {
          var downloadElement = document.createElement("a");
          downloadElement.href = res.message;
          downloadElement.target = "_blank";
          downloadElement.download = key; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./style.scss";
</style>