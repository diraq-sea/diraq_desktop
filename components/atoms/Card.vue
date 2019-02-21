<template>
  <div class="card">
    <div class="title">{{ title }}</div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.card {
  color: #333;
  line-height: 20px;
  font-weight: 400;
  background: #fff;
  border-radius: 6px;
  padding: 30px 40px;
  border: 1px solid rgb(216, 216, 216);
  box-shadow: rgba(122, 122, 122, 0.0588235) 0px 0px 6px 3px;
}

.title {
  text-align: center;
  letter-spacing: 0.05em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-bottom: 10px;
  box-sizing: border-box;
  color: #202124;
  font-weight: bold;
  font-size: 27px;
  font-weight: 300;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}
</style>
