<template>
  <div class="side-menu">
    <div class="menu">
      <nuxt-link v-for="menu in menuList" :key="menu.path" :to="`/admin/${menu.path}`">
        <div :class="['menu-item', menuPath === menu.path ? 'current' : '']">
          <i :class="['fas', menu.icon]" /><span>{{ menu.label }}</span>
          <div class="hover-border" />
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('menu', ['menuPath']),
    ...mapGetters('menu', ['menuList']),
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/admin.scss';

.side-menu {
  width: $SIDEMENU_WIDTH;
  top: $NAVBAR_HEIGHT;
  left: 0;
  display: block;
  min-height: 100%;
  background-color: $COLOR_DARK;
  height: 100%;
  position: fixed;
  overflow: hidden;

  &:hover {
    width: $SIDEMENU_WIDTH;
  }
}

@include getSideMenuWidthQuery('.side-menu', 'width');

.menu {
  padding-top: 18px;
  width: $SIDEMENU_WIDTH;
}

.menu-item {
  height: 42px;
  padding-left: 18px;
  font-size: 14px;
  line-height: 42px;
  cursor: pointer;
  color: #fff;
  transition: 0.2s color, background-color ease;
  position: relative;
}

.menu-item:hover {
  color: $COLOR_ACCENT;
}

.menu-item.current {
  background: #{$COLOR_ACCENT}cc;
}

.menu-item.current:hover {
  color: #fff;
}

.hover-border {
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 4px;
  background: $COLOR_ACCENT;
  transition: 0.2s opacity ease;
}

.menu-item:hover > .hover-border {
  opacity: 1;
}

.menu-item > i {
  margin-right: 18px;
  width: 16px;
  display: inline-block;
}
</style>
