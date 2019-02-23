<template>
  <div>
    <navbar :isLoggedIn="true" :name="name" @logout="logout" />
    <div class="page">
      <div class="nuxt"><nuxt /></div>
      <file-tab />
    </div>
    <side-menu />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from '~/components/atoms/Navbar'
import SideMenu from '~/components/molecules/SideMenu'
import FileTab from '~/components/molecules/FileTab'

export default {
  middleware: ['isLogin', 'hasWorkingDir', 'fetchData'],
  components: {
    Navbar,
    SideMenu,
    FileTab,
  },
  computed: {
    ...mapState('user', ['name']),
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
  top: $NAVBAR_HEIGHT;
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
  overflow: auto;
  background: $COLOR_BLACK;
}
</style>
