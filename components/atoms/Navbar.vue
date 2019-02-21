<template>
  <div class="header">
    <div class="header-inner">
      <div class="title">Dira<span>Q</span></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/css/admin.scss';

.header {
  background: $COLOR_DARK;
  position: relative;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 70px;
}

.header-inner {
  line-height: $NAVBAR_HEIGHT;
  height: $NAVBAR_HEIGHT;
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
  color: $COLOR_ACCENT;
}
</style>
