<template>
  <div class="side-menu">
    <div class="controls">
      <i class="fas fa-folder-plus" title="Create new room" @click="openRoomNamePrompt" />
    </div>
    <div
      v-for="room in rooms"
      :key="room.id"
      :class="itemClass(room.id)"
      class="menu-item"
      @click="changeRoom(room.id)"
    >
      <i :class="arrowClass(room.id)" class="fas fa-caret-right arrow" />
      <span>{{ room.name }}</span>
      <i class="fas fa-plus plus" title="Create new file or folder" @click.stop="toggleDialog" />
    </div>

    <el-dialog :visible.sync="dialogVisible" :append-to-body="true" title="Create new">
      <span>This is a message</span>
      <upload-dialog-footer slot="footer" @close="toggleDialog" />
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import UploadDialogFooter from '~/components/atoms/UploadDialogFooter'

export default {
  components: {
    UploadDialogFooter,
  },
  computed: {
    ...mapState('room', ['rooms', 'currentRoom']),
    ...mapGetters('room', ['isOpening']),
    itemClass() {
      return id => ({ current: this.currentRoom.id === id })
    },
    arrowClass() {
      return id => ({ opening: this.isOpening(id) })
    },
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    async openRoomNamePrompt() {
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
      this.$store.commit('room/toggleOpening', id)
    },
    toggleDialog() {
      this.dialogVisible = !this.dialogVisible
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/admin.scss';

.side-menu {
  width: $SIDEMENU_WIDTH;
  top: 0;
  left: 0;
  display: block;
  min-height: 100%;
  background: $COLOR_GRAY2;
  height: 100%;
  position: fixed;
  overflow: hidden;
  color: $FONT_WHITE;
}

.controls {
  text-align: right;
  padding: 8px 20px;

  i {
    cursor: pointer;
    font-size: 16px;
  }
}

.menu-item {
  height: 26px;
  padding-left: 12px;
  font-size: 14px;
  line-height: 26px;
  cursor: pointer;
  transition: 0.2s color, background-color ease;
  position: relative;
}

.menu-item:hover {
  background: rgb(42, 45, 46);

  .plus {
    opacity: 1;
  }
}

.menu-item.current {
  background: rgb(55, 55, 61);
}

.arrow {
  margin-right: 10px;
  display: inline-block;
  font-size: 14px;

  &.opening {
    transform: rotateZ(45deg);
  }
}

.plus {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  opacity: 0;
}
</style>
