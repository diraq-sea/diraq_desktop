<template>
  <div class="title-bar"><div /></div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
@import '@/assets/css/admin.scss';

.title-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $TITLEBAR_HEIGHT;
  background: $COLOR_GRAY3;

  & > div {
    position: absolute;
    top: 3px; // for resizable
    left: 3px;
    right: 3px;
    bottom: 0;
    -webkit-app-region: drag;
  }
}
</style>
