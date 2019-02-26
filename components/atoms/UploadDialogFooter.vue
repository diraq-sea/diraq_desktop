<template>
  <div class="dialog-footer">
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
    <el-button @click="$emit('close')">Cancel</el-button>
  </div>
</template>

<script>
export default {
  data() {
    const fileList = []
    let radio1 = 1
    let radio2 = 1
    return {
      fileList,
      radio1,
      radio2,
    }
  },
  methods: {
    handlePreview() {},
    handleRemove() {},
  },
}
</script>

<style scoped lang="scss"></style>
