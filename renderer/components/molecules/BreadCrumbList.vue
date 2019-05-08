<template>
  <div class="bc-container">
    <span v-if="!list.length">/</span>
    <template v-for="(name, i) in list" v-else>
      <span :key="`slash-${i}`">/</span>
      <span :key="`link-${i}`" class="link" @mousedown="$emit('select', i)">{{ name }}</span>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.bc-container {
  height: 40px;
  display: flex;
  align-items: center;
  margin: 15px 10px 5px;
}

.bc-container span {
  display: inline-block;
  margin-right: 3px;
}

.bc-container span.link:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
