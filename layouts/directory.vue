<template>
  <div>
    <navbar :isLoggedIn="true" />
    <div class="page"><nuxt /></div>
  </div>
</template>

<script>
import Navbar from '~/components/atoms/Navbar.vue'

export default {
  middleware: 'isLogin',
  components: {
    Navbar,
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
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
