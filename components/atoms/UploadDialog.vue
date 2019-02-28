<template>
  <div class="dialog-container">
    <div class="create-new">
      <el-radio-group class="radio1" v-model="radio1">
        <el-radio :label="1">file</el-radio>
        <el-radio :label="2">folder</el-radio>
      </el-radio-group>
      <el-radio-group v-if="radio1 === 1" class="radio2" v-model="radio2">
        <el-radio :label="1">Word</el-radio>
        <el-radio :label="2">Excel</el-radio>
        <el-radio :label="3">PDF</el-radio>
        <el-radio :label="4">Power point</el-radio>
      </el-radio-group>
      <el-input placeholder="file name" v-model="input1" clearable />
      <el-button>Create</el-button>
    </div>
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
</template>

<script>
export default {
  data() {
    const fileList = []
    let radio1 = 1
    let radio2 = 1
    let input1 = ''
    return {
      fileList,
      radio1,
      radio2,
      input1,
    }
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
  // display: flex;
}

.el-radio-group {
  display: block;
}

.el-upload {
  top: 0;
  right: 0;
  position: fixed;
  display: block;
}
</style>
