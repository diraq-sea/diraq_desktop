<template>
  <div>
    <navbar />
    <div class="page"><nuxt /></div>
    <side-menu />
  </div>
</template>

<script>
import Navbar from '~/components/atoms/Navbar'
import SideMenu from '~/components/molecules/SideMenu'

export default {
  middleware: ['isLogin', 'hasWorkingDir', 'fetchRooms'],
  components: {
    Navbar,
    SideMenu,
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

@include getSideMenuWidthQuery('.page', 'left');
</style>
