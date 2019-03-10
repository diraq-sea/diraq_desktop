<template>
  <div class="folder-container">
    <h1>Room: {{ roomInfo.name }}</h1>
    <div class="folder-main">
      <div class="folder-list">
        <el-button type="primary" size="small" plain @click="openDialog">Create new</el-button>

        <div v-for="item in roomInfo.items" :key="item.id" class="folder-item" @click="open(item)">
          <img class="folder-icon" :src="iconSrc(item)" />
          <div class="folder-name">{{ item.name }}</div>
          <div class="folder-date">
            <div>Created: {{ birthTime(item) }}</div>
            <div>Modified: {{ mTime(item) }}</div>
          </div>
        </div>
      </div>
      <members-item class="folder-members" />
    </div>

    <el-dialog :visible.sync="dialogVisible" :append-to-body="true" class="dialog">
      <upload-dialog />
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { TAB_TYPES, DATE_FORMAT_TYPE } from '~/utils/const'
import folderIcon from '~/assets/imgs/folder.png'
import MembersItem from '~/components/molecules/MembersItem'
import UploadDialog from '~/components/atoms/UploadDialog'

export default {
  components: {
    MembersItem,
    UploadDialog,
  },
  async fetch({ store }) {
    const { roomId } = store.getters['tab/currentTab'].values
    await Promise.all([
      store.dispatch('room/fetchRoomInfo', roomId),
      store.dispatch('member/fetchMembers', roomId),
    ])
  },
  computed: {
    ...mapState('room', ['roomInfo']),
    ...mapState('tab', ['tabs']),
    ...mapGetters('tab', ['currentTab']),
    iconSrc() {
      return item => (item.extname ? this.$fileIcon(item.extname) : folderIcon)
    },
    birthTime() {
      return item => this.$moment(item.birthtime).format(DATE_FORMAT_TYPE)
    },
    mTime() {
      return item => this.$moment(item.mtime).format(DATE_FORMAT_TYPE)
    },
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    async open(item) {
      const targetTab = this.tabs.find(
        tab => tab.type === TAB_TYPES.FILE && tab.values.fileId === item.id,
      )

      if (targetTab) {
        await this.$store.dispatch('tab/changeCurrentTab', targetTab.id)
      } else {
        await this.$store.dispatch('tab/changeTabType', {
          id: this.currentTab.id,
          type: TAB_TYPES.FILE,
          values: { fileId: item.id, name: item.name, extname: item.extname },
        })
      }

      this.$router.push('/')
    },
    openDialog() {
      this.dialogVisible = !this.dialogVisible
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/css/admin.scss';

$HERDER_HEIGHT: 100px;

.folder-container {
  height: 100%;
  color: $FONT_SUB;
  max-width: 1080px;
  margin: 0 auto;
  position: relative;
}

h1 {
  height: $HERDER_HEIGHT;
  line-height: $HERDER_HEIGHT;
}

.folder-main {
  display: flex;
  position: absolute;
  top: $HERDER_HEIGHT;
  left: 0;
  right: 0;
  bottom: 0;

  .folder-list {
    flex: 1;
    max-height: 100%;
    overflow: auto;
    padding-right: 30px;

    $ITEM_HEIGHT: 40px;

    .folder-item {
      margin-top: 20px;
      height: calc(#{$ITEM_HEIGHT} + 10px);
      padding: 5px 10px;
      border-bottom: 1px solid $COLOR_BORDER;
      display: flex;
      transition: 0.2s;
      cursor: pointer;

      &:hover {
        background: $COLOR_LIGHT_BLUE;
      }

      .folder-icon {
        height: 80%;
        margin-top: calc(#{$ITEM_HEIGHT} * 0.12);
      }

      .folder-name {
        height: 100%;
        line-height: $ITEM_HEIGHT;
        margin-left: 15px;
        font-size: 18px;
      }

      .folder-date {
        font-size: 12px;
        margin-left: auto;

        & > div {
          height: calc(#{$ITEM_HEIGHT} / 2);
          line-height: calc(#{$ITEM_HEIGHT} / 2);
        }
      }
    }
  }

  .folder-members {
    width: $MEMBERS_OPENING_WIDTH;
    max-height: 100%;
    overflow: auto;
  }
}

.dialog /deep/ .el-dialog__body {
  padding: 20px 40px 50px;
}
</style>
