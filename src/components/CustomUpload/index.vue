<!--
 * @Author: sxt
 * @Date: 2021-05-28 15:28:07
 * @LastEditors: sxt
 * @LastEditTime: 2021-06-29 11:10:04
 * @Description:上传文件/图像 二次封装
-->
<template>
  <div
    :class="isAvatar ? 'avatar-uploader' : 'upload'"
    ref="uploadComp"
  >
    <el-upload
      class="upload-file"
      :file-list="isAvatar?imgList:fileList"
      :multiple="multiple"
      :accept="accept.join(',')"
      :action="UPLOADURL"
      :show-file-list="!isAvatar"
      :on-success="handleSuccess"
      :headers="uploadHeaders"
      :before-upload="beforeFileUpload"
      ref="upload"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :on-preview="handlePreview"
      :on-error="handleUploadError"
    >
      <template v-if="!isAvatar">
        <el-button
          icon="el-icon-upload2"
          type="plain"
          class="upload-btn"
        >上传文件</el-button>
        <div
          slot="tip"
          class="el-upload__tip"
          v-if="showTip"
        >
          附件最大20M；支持{{ accept.join(" ") }}
        </div>
      </template>
      <template v-else>
        <img
          v-if="imageUrl"
          :src="imageUrl"
          class="avatar"
        />
        <i
          v-else
          class="el-icon-plus avatar-uploader-icon"
        ></i>
      </template>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import { customDownload } from "@/utils";
import _ from "lodash";
import { clone } from "mathjs";
let UPLOADURL = process.env.VUE_APP_BASE_API + "/BUpload/UploadAttachment";

export default {
  props: {
    //是否支持多选
    multiple: {
      type: Boolean,
      default: true,
    },
    //接受上传的文件类型
    accept: {
      type: Array,
      default: function () {
        return [
          ".PDF",
          ".DOC",
          ".DOCX",
          ".XLS",
          ".XLSX",
          ".TXT",
          ".JPG",
          ".PNG",
          ".BMP",
          ".GIF",
          ".RAR",
          ".ZIP",
        ];
      },
    },
    //是否显示提示文字
    showTip: {
      type: Boolean,
      default: false,
    },
    //是否是上传头像状态
    isAvatar: {
      type: Boolean,
      default: false,
    },
    //初始列表数据
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
    //接口地址
    upAction: {
      type: String,
      default: function () {
        return "/BUpload/UploadAttachment";
      },
    },
  },
  data() {
    return {
      fileList: [], //文件列表
      imgList: [], //头像列表
      imageUrl: "", //头像url
      UPLOADURL, //上传地址
      //上传请求头
      uploadHeaders: {
        Authorization: getToken(),
      },
      loading: false,
    };
  },
  created() {},
  watch: {
    list: {
      handler: function (val, oldval) {
        this.initData();
      },
      deep: true, //对象内部的属性监听，也叫深度监听
      immediate: true,
    },
    //监听文件上传状态，在需要判断：在文件上传完成之后才能提交表单 时使用
    loading: function (val, oval) {
      // console.log(val);
      this.$emit("changeStatus", val);
    },
  },
  methods: {
    initData() {
      let imgIdx = this.list.findIndex((i) => i.file_flag == 2);
      if (imgIdx !== -1) {
        this.imageUrl = this.list[imgIdx].file_url;
      } else {
        this.imageUrl = "";
      }
      let arr = _.cloneDeep(this.list);
      arr.forEach((i) => {
        i.name = i.file_name;
      });
      this.fileList = arr.filter((i) => i.file_flag !== 2);
      // console.log("fileList==>", this.fileList);
    },
    handleChange(file, filelist) {
      // console.log("in-change", file, filelist);
      this.handleLoading(filelist);
    },
    handleSuccess(res, file, filelist) {
      if (res.code == 200) {
        if (this.isAvatar) {
          this.imageUrl = URL.createObjectURL(file.raw);
          this.imgList = [
            {
              file_flag: 2, //文件标识(主要用于一个画面多种上传),(1:附件 2:头像或logo 3:其他)
              file_url: res.message,
              file_name: file.name,
              name: file.name,
            },
          ];
          if (filelist.length > 1) {
            filelist.splice(0, 1);
          }
          this.$refs.upload.clearFiles();
          this.$emit("getUploadInfo", this.imgList);
        } else {
          let list = filelist.map((item) => {
            return {
              ...item,
              file_flag: 1, //文件标识(主要用于一个画面多种上传),(1:附件 2:头像或logo 3:其他)
              file_url: item.file_url
                ? item.file_url
                : item.response
                ? item.response.message
                : "",
              file_name: item.name,
            };
          });
          this.fileList = _.cloneDeep(list);
          this.$emit("getUploadInfo", this.fileList);
          this.handleLoading(this.fileList);
        }
      }
    },
    handleLoading(list) {
      let index = list.findIndex((i) => i.status == "ready");
      if (index !== -1) {
        this.loading = true;
      } else {
        this.loading = false; //关闭上传中状态
      }
    },
    handleUploadError() {
      this.loading = false; // 关闭上传中状态
      this.$message({
        type: "error",
        message: "文件上传失败！",
      });
    },
    //移除附件
    handleRemove(file, filelist) {
      let list = filelist.map((item) => {
        return {
          ...item,
          file_flag: 1, //文件标识(主要用于一个画面多种上传),(1:附件 2:头像或logo 3:其他)
          file_url: item.file_url
            ? item.file_url
            : item.response
            ? item.response.message
            : "",
          file_name: item.name,
        };
      });
      this.fileList = _.cloneDeep(list);
      this.handleLoading(this.fileList);
      this.$emit("getUploadInfo", this.fileList);
    },
    //附件格式校验
    beforeFileUpload(file) {
      let arr = [];
      this.accept.map((item) => {
        arr.push(item.substring(1).toLowerCase());
      });
      let index = file.name.lastIndexOf(".");
      let type = file.name.substring(index + 1, file.name.length);
      const isAllowed = arr.includes(type.toLowerCase());
      const isLt20M = file.size / 1024 / 1024 < 20;

      if (!isAllowed) {
        this.$message.error(
          `上传${this.isAvatar ? "图片" : "文件"}只能是 ${arr.join(" ,")} 格式!`
        );
        return false;
      } else if (!isLt20M) {
        this.$message.error("上传文件不可大于20M!");
        return false;
      }
      return isAllowed && isLt20M;
    },
    //预览/下载附件
    handlePreview(file) {
      //有id即原先就存在的文件才可以查询
      if (file.id) {
        customDownload(file.file_name, file.file_url);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-uploader {
  height: 100px;
  ::v-deep .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  ::v-deep .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 98px;
    height: 98px;
    line-height: 98px;
    text-align: center;
  }
  .avatar {
    width: 98px;
    height: 98px;
    display: block;
  }
}

.upload {
  margin-top: 16px;
  .el-upload__tip {
    display: inline-block;
    margin-top: 0;
  }
  button {
    margin-right: 8px;
    display: flex;
    align-items: center;
    color: #334155;
  }
  ::v-deep .el-upload-list__item {
    width: 350px;
    .el-upload-list__item-name {
      color: #1890ff;
    }
    .el-icon-close {
      color: #ef4444;
    }
    .el-icon-close-tip {
      display: none !important;
    }
  }
}
::v-deep .el-upload-list__item {
  transition: none !important;
  outline: none;
  // transition: height 0.5s;
}
</style>
