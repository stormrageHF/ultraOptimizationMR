<template>
  <el-upload
    class="upload-demo"
    drag
    :action="actionUrl"
    :headers="req_header"
    :on-success="uploadSuccess"
  >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">
      将文件拖到此处，或
      <em>点击上传</em>
    </div>
    <div class="el-upload__tip" slot="tip">
      <p>1.至少100张不同层面，不同时相的影像资料，格式为JPG/PNG</p>
      <p>2.请将所有的图片压缩成一个文件后上传</p>
      <p>3.压缩文件不能超过100M</p>
      <p>4.请上传脱敏数据</p>
    </div>
  </el-upload>
</template>

<script>
import Vue from "vue";

export default {
  name: "Uploade",
  data() {
    return {
      actionUrl: Vue.axios.defaults.baseURL + "/UploadDicom/UpLoadApiFile",
      req_header: {
        Authorization: localStorage.getItem("UltraTokenMR")
      }
    };
  },
  methods: {
    uploadSuccess(res) {
      this.$emit("upload-success", res);
    }
  }
};
</script>

<style>
</style>