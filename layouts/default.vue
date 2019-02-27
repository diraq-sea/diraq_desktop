<template>
  <div>
    <div class="page">
      <div class="nuxt"><nuxt /></div>
      <file-tab @logout="logout" />
    </div>
    <side-menu />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SideMenu from '~/components/molecules/SideMenu'
import FileTab from '~/components/molecules/FileTab'

export default {
  middleware: ['isLogin', 'fetchData'],
  components: {
    SideMenu,
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

.page {
  position: fixed;
  top: 0;
  left: $SIDEMENU_WIDTH;
  right: 0;
  bottom: 0;
}

.nuxt {
  position: absolute;
  top: $TAB_HEIGHT;
  left: 0;
  right: 0;
  bottom: 0;
  background: $COLOR_BLACK;
}
</style>
