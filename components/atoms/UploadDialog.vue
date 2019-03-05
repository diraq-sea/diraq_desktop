<template>
  <div class="dialog-container">
    <div class="create-new">
      <p class="title">Create new</p>
      <el-radio-group class="radio3" v-model="radio3">
        <el-radio-button class="new new-file" :label="1">file</el-radio-button>
        <el-radio-button :label="2" class="new new-folder">folder</el-radio-button>
      </el-radio-group>
      <transition name="fade">
        <el-radio-group v-if="radio3 === 1" class="radio2" v-model="radio2">
          <div class="select-file">
            <div class="files">
              <el-radio class="radio2group" :label="1">Word</el-radio>
              <el-radio class="radio2group" :label="3">PDF</el-radio>
            </div>
            <div class="files">
              <el-radio class="radio2group" :label="2">Excel</el-radio>
              <el-radio class="radio2group" :label="4">Power point</el-radio>
            </div>
          </div>
        </el-radio-group>
      </transition>
      <div class="inputbox">
        <el-input :placeholder="select + ' name'" v-model="input1" class="input-with-select">
          <el-button slot="append">Create</el-button>
        </el-input>
      </div>
    </div>
    <div class="border"></div>
    <div class="upload-new">
      <p class="title">Upload new file</p>
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        list-type="text/picture/picture-card/pdf"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
        <div class="el-upload__tip">files with a size less than 512mb</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const fileList = []
    let radio3 = 1
    let radio2 = 1
    let input1 = ''
    return {
      fileList,
      radio3,
      radio2,
      input1,
    }
  },
  computed: {
    select() {
      return this.radio3 === 1 ? 'file' : 'folder'
    },
  },
  methods: {
    handlePreview() {},
    handleRemove() {},
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/css/admin.scss';

.dialog-container {
  display: flex;
  justify-content: space-between;
}

.title {
  line-height: 24px;
  font-size: 20px;
  color: #303133;
  margin-bottom: 30px;
}

.create-new {
  position: relative;
  width: 300px;
}

.el-radio-group {
  display: block;
}

.el-radio-button /deep/ .el-radio-button__inner {
  margin-bottom: 10px;
  width: 129px;
}
.files {
  margin-right: 15px;
}
.el-radio {
  margin: 0px 20px 15px 0px;
  display: block;
}

.radio3 {
  margin-bottom: 10px;
}

.select-file {
  margin-bottom: 10px;
  display: flex;
}

.inputbox {
  display: flex;
  position: absolute;
  bottom: 0;
}

.border {
  border: solid 0.6px #dadada;
  margin: 25px 40px 10px;
}

.upload-demo /deep/ .el-upload-dragger {
  width: 300px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
