<template>
  <div class="root">
    <title-bar />
    <div class="page">
      <div class="nuxt"><nuxt /></div>
      <file-tab @logout="logout" />
    </div>
  </div>
</template>

<script>
import TitleBar from '~/components/molecules/TitleBar'
import FileTab from '~/components/molecules/FileTab'

export default {
  middleware: ['isLogin', 'fetchData'],
  components: {
    TitleBar,
    FileTab,
  },
  methods: {
    async logout() {
      await this.$store.dispatch('login/logout')
      this.$router.push('/login')
    },
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
}

.page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.nuxt {
  position: absolute;
  top: $TAB_HEIGHT;
  left: 0;
  right: 0;
  bottom: 0;
  background: $COLOR_PAGE;
}
</style>
