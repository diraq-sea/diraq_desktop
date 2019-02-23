<template>
  <div class="side-menu">
    <div class="controls"><i class="fas fa-folder-plus" @click="openRoomNameModal" /></div>
    <div
      v-for="room in rooms"
      :key="room.id"
      :class="itemClass(room.id)"
      class="menu-item"
      @click="changeRoom(room.id)"
    >
      <i class="fas fa-caret-right" /><span>{{ room.name }}</span>
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
  background: $COLOR_GRAY2;
  height: 100%;
  position: fixed;
  overflow: hidden;
}

.controls {
  text-align: right;
  padding: 8px 20px;

  i {
    color: #ddd;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      color: #fff;
    }
  }
}

.menu-item {
  height: 26px;
  padding-left: 12px;
  font-size: 14px;
  line-height: 26px;
  cursor: pointer;
  color: #fff;
  transition: 0.2s color, background-color ease;
  position: relative;
}

.menu-item:hover {
  background: rgb(42, 45, 46);
}

.menu-item.current {
  background: rgb(55, 55, 61);
}

.menu-item.current:hover {
  color: #fff;
}

.menu-item > i {
  margin-right: 10px;
  display: inline-block;
  font-size: 14px;
}
</style>
