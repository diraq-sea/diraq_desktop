<template>
  <div class="fp-container">
    <loading-panel v-if="loading" />
    <template v-else>
      <div class="fp-left"><webview :src="viewerSrc" class="viewer" /></div>
      <div class="fp-right">
        <commit-board
          :commits="file(fileId).commits"
          :currentCommit="currentCommit(fileId)"
          :filename="file(fileId).name"
          :users="members(roomId)"
          :selfIcon="icon"
          class="commit-board"
          @addComment="$store.commit('file/addComment', $event)"
          @addCommit="$store.commit('file/addCommit', $event)"
        />
        <members :roomId="roomId" class="members" />
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import CommitBoard from '~/components/molecules/CommitBoard'
import Members from '~/components/molecules/Members'
import LoadingPanel from '~/components/atoms/LoadingPanel'

export default {
  components: {
    LoadingPanel,
    CommitBoard,
    Members,
  },
  props: {
    tab: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('user', ['icon']),
    ...mapGetters('member', ['members']),
    ...mapGetters('file', ['file', 'currentCommit']),
    ...mapGetters('tab', ['currentTab']),
    viewerSrc() {
      return `https://view.officeapps.live.com/op/embed.aspx?src=${
        this.currentCommit(this.fileId).url
      }`
    },
    fileId() {
      return this.tab.values.fileId
    },
    roomId() {
      return this.file(this.fileId).roomId
    },
  },
  data: () => ({ loading: true }),
  async created() {
    await this.$store.dispatch('file/fetchFile', this.currentTab.values.fileId)

    await Promise.all([
      this.$store.dispatch('room/fetchRoomInfo', this.roomId),
      this.$store.dispatch('member/fetchMembers', this.roomId),
    ])

    this.loading = false
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/css/admin.scss';

$TOP_BAR_HEIGHT: 70px;
$VIEWER_WIDTH: 650px;
$COMMIT_MAKER_HEIGHT: 60px;

.fp-container {
  display: flex;
  height: 100%;
}

.fp-left {
  min-width: $VIEWER_WIDTH;
  flex: 3;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.top-bar {
  height: $TOP_BAR_HEIGHT;
}

.fp-right {
  flex: 2;
  height: 100%;
  position: relative;
  border-left: 1px solid $COLOR_BORDER;

  .members {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
  }

  .commit-board {
    position: absolute;
    top: 0;
    left: 0;
    right: $MEMBERS_WIDTH;
    bottom: 0;
  }
}

.viewer {
  position: absolute;
  top: -1px;
  left: -1px;
  right: 0;
  bottom: -22px;
}
</style>
