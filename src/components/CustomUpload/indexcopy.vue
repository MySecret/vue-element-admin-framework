<!--
 * @Author: sxt
 * @Date: 2021-05-28 15:28:07
 * @LastEditors: sxt
 * @LastEditTime: 2021-06-24 14:11:10
 * @Description: file content
-->
<template>
  <div
    :class="isAvatar ? 'avatar-uploader' : 'upload'"
    ref="uploadComp"
  >
    <el-upload
      class="upload-file"
      :file-list="fileList"
      multiple
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
import { UploadFile, getOSSFileUrl } from "@/api/utils";
import { getToken } from "@/utils/auth";
import _ from "lodash";
let UPLOADURL = process.env.VUE_APP_BASE_API + "/BUpload/UploadFile";

export default {
  props: {
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
    showTip: {
      type: Boolean,
      default: false,
    },
    isAvatar: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
    upAction: {
      type: String,
      default: function () {
        return "/BUpload/UploadFile";
      },
    },
  },
  data() {
    return {
      fileList: [],
      imageUrl: "",
      UPLOADURL,
      uploadHeaders: {
        Authorization: getToken(),
      },
      flag: true,
      isOk: true,
    };
  },
  created() {
    console.log(this.list);
    let arr = _.cloneDeep(this.list);
    arr.forEach((i) => {
      i.name = i.file_name;
    });
    this.fileList = arr.filter((i) => i.file_flag !== 2);

    this.UPLOADURL = process.env.VUE_APP_BASE_API + this.upAction;
  },
  watch: {
    list: {
      handler: function (val, oldval) {
        console.log(val);
        let arr = _.cloneDeep(val);
        arr.forEach((i) => {
          i.name = i.file_name;
        });
        this.fileList = arr.filter((i) => i.file_flag !== 2);
      },
      deep: true, //对象内部的属性监听，也叫深度监听
    },
  },
  methods: {
    handleChange() {
      console.log("inchange");
      if (this.flag) {
        this.$emit("changeStatus", false);
        this.flag = false;
      } else {
        this.flag = !this.flag;
      }
    },
    handleSuccess(res, file, filelist) {
      if (res.code == 200) {
        if (this.isAvatar) {
          this.imageUrl = URL.createObjectURL(file.raw);
          let imgIndex = this.fileList.findIndex((i) => i.file_flag == 2);
          if (imgIndex !== -1) {
            this.fileList[imgIndex] = {
              file_name: res.message,
              file_flag: 2, //1.附件 2.图片
              name: file.name,
            };
          } else {
            this.fileList.push({
              file_name: res.message,
              file_flag: 2,
              name: file.name,
            });
          }
        } else {
          let index = this.fileList.findIndex(
            (i) => i.file_name == file.file_name
          );
          if (index !== -1) {
            this.fileList[index] = {
              file_name: res.message,
              file_flag: 1, //附件
              name: file.name,
              isEdit: true,
            };
          } else {
            this.fileList.push({
              file_name: res.message,
              file_flag: 1, //附件
              name: file.name,
              isEdit: true,
            });
          }
        }
        this.$emit("getUploadInfo", this.fileList);
        this.$emit("changeStatus", true);
      } else {
        this.$emit("changeStatus", true);
      }
    },
    test() {
      this.$emit("changeStatus", true);
    },
    //移除附件
    handleRemove(file, fileList) {
      this.fileList = _.cloneDeep(fileList);
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
      if (!isAllowed) {
        this.$message.error(
          `上传${this.isAvatar ? "图片" : "文件"}只能是 ${arr.join(" ,")} 格式!`
        );
      }
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isLt20M) {
        this.$message.error("上传文件不可大于20M!");
      }
      return isAllowed && isLt20M;
    },
    //预览/下载附件
    handlePreview(file) {
      if (file.id) {
        console.log(file);
        let key = file.file_name;
        getOSSFileUrl(key).then((res) => {
          if (res.code == 200) {
            console.log(res.message);
            //window.location.href = res.message;
            window.open(res.message);
          }
        });
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
