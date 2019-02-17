<template>
  <div class="header">
    <div class="header-inner">
      <div class="title">Dira<span>Q</span></div>
    </div>
  </div>
</template>

<style scoped>
.header {
  background: #0e1e25;
  position: relative;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 70px;
}

.header-inner {
  line-height: 66px;
  height: 66px;
  padding: 0 70px;
  position: relative;
}

.title {
  font-family: 'Times New Roman', 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: bold;
  font-size: 30px;
  color: #fff;
  letter-spacing: 1px;
}

.title > span {
  color: #e5ec00;
}
</style>
