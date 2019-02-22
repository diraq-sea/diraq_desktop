<template>
  <div class="side-menu">
    <div class="controls"><i class="fas fa-folder-plus" @click="openRoomNameModal" /></div>
    <div class="menu">
      <div
        v-for="room in rooms"
        :key="room.id"
        :class="itemClass(room.id)"
        class="menu-item"
        @click="changeRoom(room.id)"
      >
        <i class="fas fa-door-open" /><span>{{ room.name }}</span>
        <div class="hover-border" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('room', ['rooms', 'currentRoom']),
    itemClass() {
      return id => ({ current: this.currentRoom.id === id })
    },
  },
  methods: {
    async openRoomNameModal() {
      const { value } = await this.$prompt('Please input name', 'Create new room', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern: /^[a-z0-9]{3,20}$/,
        inputErrorMessage: 'Invalid name',
      }).catch(() => ({}))

      if (!value) return

      await this.$store.dispatch('room/createRoom', value)
    },
    changeRoom(id) {
      this.$store.commit('room/setCurrentRoom', id)
    },
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

.controls {
  text-align: right;
  padding: 12px 20px;

  i {
    color: #ddd;
    cursor: pointer;
    font-size: 20px;

    &:hover {
      color: #fff;
    }
  }
}

.menu {
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
