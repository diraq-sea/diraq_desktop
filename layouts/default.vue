<template>
  <section class="container">
    <navbar />
    <div class="page"><nuxt /></div>
    <side-menu />
  </section>
</template>

<script>
import Navbar from '~/components/atoms/Navbar'
import SideMenu from '~/components/molecules/SideMenu'

export default {
  middleware: 'isLogin',
  components: {
    Navbar,
    SideMenu,
  },
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

a {
  text-decoration: none;
}
</style>

<style scoped lang="scss">
@import '@/assets/css/admin.scss';

.container {
  min-height: 100vh;
}

.page {
  position: absolute;
  top: $NAVBAR_HEIGHT;
  left: $SIDEMENU_WIDTH;
  right: 0;
  bottom: 0;
}

@include getSideMenuWidthQuery('.page', 'left');
</style>
