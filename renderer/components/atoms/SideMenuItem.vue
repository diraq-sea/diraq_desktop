<template>
  <div>
    <div class="menu-item" @click.stop="openItem">
      <i
        :class="arrowClass(item.type)"
        class="fas fa-caret-right arrow"
        @click.stop="toggleItem(item.type)"
      />
      <span>{{ item.name }}</span>
    </div>
    <div v-if="item.children.length > 0" v-show="open" style="margin-left: 0.5rem">
      <side-menu-item
        v-for="child of item.children"
        :key="child.name"
        :item="child"
        :parent-path="`${parentPath}/${item.name}`"
        :room-id="roomId"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { TAB_TYPES } from '~/utils/const'
import SideMenuItem from '~/components/atoms/SideMenuItem'
import { ITEM_TYPES } from '~~/common/sideMenuItemTypes'

export default {
  name: 'SideMenuItem',
  components: { SideMenuItem },
  props: {
    item: {
      type: Object,
      required: true,
    },
    parentPath: {
      type: String,
      required: true,
    },
    roomId: { type: Number, required: true },
  },
  data() {
    return {
      open: false,
    }
  },
  computed: {
    ...mapState('tab', ['tabs']),
    ...mapGetters('file', ['file']),
    arrowClass() {
      return type => ({ opening: this.open, isFile: type === ITEM_TYPES.FILE })
    },
  },
  methods: {
    toggleItem(type) {
      if (type === ITEM_TYPES.FOLDER) {
        this.open = !this.open
      } else {
        this.openItem()
      }
    },
    async openItem() {
      if (this.item.type === ITEM_TYPES.FILE) {
        const roomId = this.item.roomId
        const fileId = this.item.id
        const targetTab = this.tabs.find(
          tab => tab.type === TAB_TYPES.FILE && tab.values.fileId === fileId,
        )

        if (targetTab) {
          await this.$store.dispatch('tab/changeCurrentTab', targetTab.id)
        } else {
          this.$store.dispatch('tab/addNewTab')
          await this.$store.dispatch('tab/changeTabType', {
            id: this.tabs[this.tabs.length - 1].id + 1,
            type: TAB_TYPES.FILE,
            values: {
              roomId,
              fileId,
              name: this.item.name,
              extname: this.item.extname,
            },
          })
        }
        for (const commit of this.file(fileId).commits) {
          for (const comment of commit.comments) {
            await this.$store.dispatch('file/watchComment', {
              roomId,
              fileId,
              commitId: commit.id,
              commentId: comment.id,
              userId: this.$store.state.user.id,
            })
          }
        }
        await this.$store.dispatch('file/fetchFile', { roomId, fileId })
      } else if (this.item.type === ITEM_TYPES.FOLDER) {
        this.$store.dispatch('tab/addNewTab')
        await this.$store.dispatch('tab/changeTabType', {
          id: this.tabs[this.tabs.length - 1].id + 1,
          type: TAB_TYPES.FOLDER,
          values: { roomId: this.roomId, folder: `${this.parentPath}/${this.item.name}` },
        })
      }
    },
  },
}
</script>

<style scoped>
.menu-item {
  display: block;
  height: 26px;
  margin-top: 0.25rem;
  padding-left: 12px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s color, background-color ease;
  position: relative;
}

.menu-item:hover {
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

.arrow.isFile {
  opacity: 0;
}
</style>
