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

<style>
@import '@/assets/styles/common.css';
</style>

<style scoped>
.root {
  position: fixed;
  top: var(--titlebar-height);
  left: 0;
  right: 0;
  bottom: 0;
  color: var(--font-base);
  background: var(--color-title-bar);
}

.nuxt {
  position: absolute;
  top: 0;
  left: 2px;
  right: 2px;
  bottom: 2px;
  background: var(--color-page);
}
</style>
