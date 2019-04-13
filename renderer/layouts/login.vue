<template>
  <div>
    <navbar />
    <div class="page"><nuxt /></div>
  </div>
</template>

<script>
import Navbar from '~/components/atoms/Navbar.vue'

export default {
  middleware: 'isNotLogin',
  components: {
    Navbar,
  },
}
</script>

<style>
@import '@/assets/css/common.css';
</style>

<style scoped>
.page {
  position: fixed;
  top: var(--navbar-height);
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
