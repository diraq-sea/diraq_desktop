<template>
  <div class="side-menu">
    <div class="controls">
      <i class="fas fa-folder-plus" title="Create new room" @click="openRoomNamePrompt" />
    </div>
    <div
      v-for="room in rooms"
      :key="room.id"
      :class="itemClass(room.id)"
      @click="changeRoom(room.id)"
    >
      <div class="menu-item">
        <i
          :class="arrowClass(room.id)"
          class="fas fa-caret-right arrow"
          @click.stop="toggleRoom(room)"
        />
        <span>{{ room.name }}</span>
        <!-- <i class="fas fa-plus plus" title="Create new file or folder" @click.stop="toggleDialog" /> -->
      </div>
      <side-menu-item
        v-for="item in foldersAndFiles(room.id)"
        v-show="room.open"
        :key="item.name"
        :item="item"
        :parent-path="''"
        :room-id="room.id"
        style="margin-left: 0.5rem"
      />
    </div>

    <el-dialog :visible.sync="dialogVisible" :append-to-body="true" class="dialog">
      <upload-dialog :visible="dialogVisible" @create="createNew" @drop="dropFile" />
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { TAB_TYPES } from '~/utils/const'
import UploadDialog from '~/components/organisms/UploadDialog'
import SideMenuItem from '~/components/atoms/SideMenuItem'
import fileExtTypes from '~~/common/fileExtTypes'
import { ITEM_TYPES } from '~~/common/sideMenuItemTypes'

export default {
  components: {
    UploadDialog,
    SideMenuItem,
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  computed: {
    ...mapState('room', ['rooms', 'roomId']),
    ...mapState('tab', ['tabs']),
    ...mapGetters('room', ['roomInfo']),
    itemClass() {
      return id => ({ current: this.roomId === id })
    },
    arrowClass() {
      return id => {
        return { opening: this.rooms.find(room => room.id === id).open }
      }
    },
    foldersAndFiles() {
      return id => {
        let items = []
        if (this.roomInfo(id)) {
          for (const item of this.roomInfo(id).items) {
            let paths
            if (item.name) {
              paths = [...item.folder.split('/'), { ...item, children: [], type: ITEM_TYPES.FILE }]
                .slice(1)
                .reverse()
            } else {
              paths = item.folder
                .split('/')
                .slice(1)
                .reverse()
              paths.splice(0, 1, { name: paths[0], children: [], type: ITEM_TYPES.FOLDER })
            }
            while (paths.length >= 2) {
              paths.splice(0, 2, { name: paths[1], children: [paths[0]], type: ITEM_TYPES.FOLDER })
            }
            items = [...items, paths[0]]
          }
        }
        const additem = (obj, item) => {
          const sameRootItem = obj.find(iitem => iitem.name === item.name)
          if (item.children.length > 0 && sameRootItem) {
            for (const child of item.children) {
              sameRootItem.children = additem(sameRootItem.children, child)
            }
          } else {
            obj = [...obj, item]
          }
          return obj
        }
        return items.reduce(additem, [])
      }
    },
  },
  async created() {
    await this.$store.dispatch('room/fetchRooms')
    for (const room of this.rooms) {
      await this.$store.dispatch('room/fetchRoomInfo', room.id)
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
    async changeRoom(id) {
      this.$store.dispatch('tab/addNewTab')
      await this.$store.dispatch('tab/changeTabType', {
        id: this.tabs[this.tabs.length - 1].id + 1,
        type: TAB_TYPES.FOLDER,
        values: { roomId: id, folder: `` },
      })
    },
    toggleDialog() {
      this.dialogVisible = !this.dialogVisible
    },
    toggleRoom(room) {
      this.$store.commit('room/toggleOpening', room.id)
    },
    async openFile(item) {
      const targetTab = this.tabs.find(
        tab => tab.type === TAB_TYPES.FILE && tab.values.fileId === item.id,
      )
      if (targetTab) {
        await this.$store.dispatch('tab/changeCurrentTab', targetTab.id)
      } else {
        this.$store.dispatch('tab/addNewTab')
        await this.$store.dispatch('tab/changeTabType', {
          id: this.tabs[this.tabs.length - 1].id,
          type: TAB_TYPES.FILE,
          values: { roomId: item.room_id, fileId: item.id, name: item.name, extname: item.extname },
        })
      }
    },
    async createNew({ name, extTypeId }) {
      this.loading = true
      this.dialogVisible = false

      const item = await this.$store.dispatch('room/createNew', {
        roomId: this.roomId,
        folder: '',
        name,
        ...(extTypeId !== undefined
          ? { extname: fileExtTypes.find(({ id }) => id === extTypeId).extname }
          : {}),
      })

      if (extTypeId !== undefined) {
        await this.openFile(item)
      } else {
        await this.openFolder(name)
      }

      this.loading = false
    },
    async dropFile(file) {
      this.loading = true
      this.dialogVisible = false

      const item = await this.$store.dispatch('room/dropFile', {
        roomId: this.roomId,
        folder: this.tab.values.folder,
        name: file.name
          .split('.')
          .slice(0, -1)
          .join('.'),
        extname: file.name.split('.').pop(),
        path: file.path,
      })

      await this.openFile(item)
      this.loading = false
    },
  },
}
</script>

<style>
@import '@/assets/styles/common.css';
</style>

<style scoped>
.side-menu {
  width: var(--sidemenu-width);

  /* resize: horizontal; */
  position: absolute;
  top: 0;
  display: block;
  min-height: 100%;
  background: var(--color-page);
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
  color: var(--font-base);
  border: black;
}

.controls {
  text-align: right;
  padding: 8px 20px;
}

.controls .i {
  cursor: pointer;
  font-size: 16px;
}

.menu-item {
  padding-left: 6px;
  font-size: 14px;
  line-height: 26px;
  cursor: pointer;
  transition: 0.2s color, background-color ease;
  position: relative;
  display: block;
}

.plus {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  opacity: 0;
}

.menu-item:hover {
  background: var(--color-title-hover);
}

.menu-item:hover .plus {
  opacity: 1;
}

.menu-item.current {
  background: var(--color-title-hover);
}

.arrow {
  margin-right: 10px;
  display: inline-block;
  font-size: 14px;
}

.arrow:hover {
  opacity: 0.5;
}

.arrow.opening {
  transform: rotateZ(45deg);
}

.dialog /deep/ .el-dialog__body {
  padding: 20px 40px 50px;
}
</style>
