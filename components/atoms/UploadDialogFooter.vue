<template>
  <span class="dialog-footer">
    <el-button @click="$emit('close')">Cancel</el-button>
    <el-button type="primary" @click="$emit('close')">Confirm</el-button>
  </span>
</template>

<script>
export default {}
</script>

<style scoped lang="scss"></style>
