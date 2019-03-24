<template>
  <div class="root">
    <title-bar><file-tab /></title-bar>
    <nuxt class="nuxt" />
  </div>
</template>

<script>
import TitleBar from '~/components/molecules/TitleBar'
import FileTab from '~/components/organisms/FileTab'

export default {
  middleware: ['isLogin', 'fetchData'],
  components: {
    TitleBar,
    FileTab,
  },
}
</script>

<style lang="scss">
@import '@/assets/css/common.scss';
</style>

<style scoped lang="scss">
@import '@/assets/css/admin.scss';

.root {
  position: fixed;
  top: $TITLEBAR_HEIGHT;
  left: 0;
  right: 0;
  bottom: 0;
  color: $FONT_BASE;
  background: $COLOR_TITLE_BAR;
}

.nuxt {
  position: absolute;
  top: 0;
  left: 2px;
  right: 2px;
  bottom: 2px;
  background: $COLOR_PAGE;
}
</style>
