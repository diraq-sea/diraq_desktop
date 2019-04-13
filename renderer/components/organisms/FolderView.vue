<template>
  <div class="folder-container">
    <loading-panel v-if="loading" />
    <template v-else>
      <h1>Room: {{ roomInfo(roomId).name }}</h1>
      <div class="folder-main">
        <div class="folder-list">
          <el-button type="primary" size="small" plain @click="openDialog">Create new</el-button>

          <bread-crumb-list :list="breadcrumbs" @select="selectFolder" />

          <div
            v-for="folder in folders"
            :key="folder"
            class="folder-item"
            @click="openFolder(folder)"
          >
            <img class="folder-icon" src="@/assets/imgs/folder.png" />
            <div class="folder-name">{{ folder }}</div>
          </div>

          <div v-for="file in files" :key="file.id" class="folder-item" @click="openFile(file)">
            <img class="file-icon" :src="iconSrc(file)" />
            <div class="folder-name">{{ file.name }}</div>
            <div class="folder-date">
              <div>Created: {{ birthTime(file) }}</div>
              <div>Modified: {{ mTime(file) }}</div>
            </div>
          </div>
        </div>
        <members-item :roomId="roomId" class="folder-members" />
      </div>

      <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false" class="dialog">
        <upload-dialog :visible="dialogVisible" @create="createNew" @drop="dropFile" />
      </el-dialog>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { TAB_TYPES, DATE_FORMAT_TYPE } from '~/utils/const'
import folderIcon from '~/assets/imgs/folder.png'
import MembersItem from '~/components/molecules/MembersItem'
import BreadCrumbList from '~/components/molecules/BreadCrumbList'
import UploadDialog from '~/components/organisms/UploadDialog'
import LoadingPanel from '~/components/atoms/LoadingPanel'
import fileExtTypes from '~/common/fileExtTypes'

export default {
  components: {
    LoadingPanel,
    MembersItem,
    BreadCrumbList,
    UploadDialog,
  },
  props: {
    tab: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('tab', ['tabs']),
    ...mapGetters('room', ['roomInfo']),
    iconSrc() {
      return item => (item.extname ? this.$fileIcon(item.extname) : folderIcon)
    },
    birthTime() {
      return item => this.$moment(item.birthtime).format(DATE_FORMAT_TYPE)
    },
    mTime() {
      return item => this.$moment(item.mtime).format(DATE_FORMAT_TYPE)
    },
    roomId() {
      return this.tab.values.roomId
    },
    folders() {
      return this.roomInfo(this.roomId).items.reduce((list, { folder }) => {
        const matched = folder.match(new RegExp(`^${this.tab.values.folder}/(.+?)(/|$)`))
        return matched && list.indexOf(matched[1]) === -1 ? [...list, matched[1]] : list
      }, [])
    },
    files() {
      return this.roomInfo(this.roomId).items.filter(
        ({ folder, name }) => folder === this.tab.values.folder && name,
      )
    },
    breadcrumbs() {
      return [this.roomInfo(this.roomId).name, ...this.tab.values.folder.split('/').slice(1)]
    },
  },
  data: () => ({
    loading: true,
    dialogVisible: false,
  }),
  async created() {
    const { roomId } = this.tab.values
    await Promise.all([
      this.$store.dispatch('room/fetchRoomInfo', roomId),
      this.$store.dispatch('member/fetchMembers', roomId),
    ])

    this.loading = false
  },
  methods: {
    async openFile(item) {
      const targetTab = this.tabs.find(
        tab => tab.type === TAB_TYPES.FILE && tab.values.fileId === item.id,
      )

      if (targetTab) {
        await this.$store.dispatch('tab/changeCurrentTab', targetTab.id)
      } else {
        await this.$store.dispatch('tab/changeTabType', {
          id: this.tab.id,
          type: TAB_TYPES.FILE,
          values: { fileId: item.id, name: item.name, extname: item.extname },
        })
      }
    },
    changeFolder(folder) {
      return this.$store.dispatch('tab/changeTabType', {
        ...this.tab,
        values: { ...this.tab.values, folder },
      })
    },
    openFolder(folderName) {
      return this.changeFolder(`${this.tab.values.folder}/${folderName}`)
    },
    selectFolder(i) {
      return this.changeFolder(i ? `/${this.breadcrumbs.slice(1, i + 1).join('/')}` : '')
    },
    openDialog() {
      this.dialogVisible = !this.dialogVisible
    },
    async createNew({ name, extTypeId }) {
      this.loading = true
      this.dialogVisible = false

      const item = await this.$store.dispatch('room/createNew', {
        roomId: this.roomId,
        folder: this.tab.values.folder,
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

<style scoped>
.folder-container {
  height: 100%;
  color: var(--font-sub);
  max-width: 1080px;
  margin: 0 auto;
  position: relative;
}

h1 {
  height: var(--herder-height);
  line-height: var(--herder-height);
  padding: 0 var(--padding);
}

.folder-main {
  display: flex;
  position: absolute;
  top: var(--herder-height);
  left: var(--padding);
  right: var(--padding);
  bottom: 0;
}

.folder-main .folder-list {
  flex: 1;
  max-height: 100%;
  overflow: auto;
  padding-right: var(--padding);
}

.folder-main .folder-list .folder-item {
  height: calc(var(--item-height) + 10px);
  padding: 5px 10px;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  transition: 0.2s;
  cursor: pointer;
}

.folder-main .folder-list .folder-item:hover {
  background: var(--color-light-blue);
}

.folder-main .folder-list .folder-item .folder-icon {
  height: 80%;
  margin-top: calc(var(--item-height) * 0.12);
}

.folder-main .folder-list .folder-item .file-icon {
  height: 60%;
  margin-top: calc(var(--item-height) * 0.22);
  margin-left: 5px;
  margin-right: 3px;
}

.folder-main .folder-list .folder-item .folder-name {
  height: 100%;
  line-height: var(--item-height);
  margin-left: 12px;
  font-size: 18px;
}

.folder-main .folder-list .folder-item .folder-date {
  font-size: 12px;
  margin-left: auto;
}

.folder-main .folder-list .folder-item .folder-date > div {
  height: calc(var(--item-height) / 2);
  line-height: calc(var(--item-height) / 2);
}

.folder-main .folder-members {
  width: var(--members-opening-width);
  max-height: 100%;
  overflow: auto;
}

.dialog >>> .el-dialog__body {
  padding: 20px 40px 50px;
}

.dialog >>> .v-modal,
.dialog >>> .el-dialog__wrapper {
  top: var(--titlebar-height);
}
</style>
