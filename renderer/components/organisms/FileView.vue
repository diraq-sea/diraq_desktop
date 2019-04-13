<template>
  <div class="fp-container">
    <loading-panel v-if="loading" />
    <template v-else>
      <div class="fp-left">
        <webview :src="viewerSrc" :style="viewerStyle" class="viewer" />
      </div>
      <div class="fp-right">
        <commit-board
          :file="file(fileId)"
          :currentCommit="currentCommit(fileId)"
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
      return this.extname === 'xlsx'
        ? `https://view.officeapps.live.com/op/embed.aspx?src=${this.url}`
        : `https://docs.google.com/viewer?url=${this.url}&embedded=true`
    },
    fileId() {
      return this.tab.values.fileId
    },
    roomId() {
      return this.file(this.fileId).roomId
    },
    extname() {
      return this.file(this.fileId).extname
    },
    url() {
      return this.currentCommit(this.fileId).url
    },
    viewerStyle() {
      return {
        bottom: `${this.extname === 'xlsx' ? -27 : 0}px`,
      }
    },
  },
  data: () => ({ loading: true, numPages: 1 }),
  async created() {
    await this.$store.dispatch('file/fetchFile', this.currentTab.values.fileId)

    await Promise.all([
      this.$store.dispatch('room/fetchRoomInfo', this.roomId),
      this.$store.dispatch('member/fetchMembers', this.roomId),
    ])

    this.loading = false
  },
  methods: {
    setNumPages(e) {
      this.numPages = e || this.numPages
    },
  },
}
</script>

<style scoped>
.fp-container {
  display: flex;
  height: 100%;
}

.fp-left {
  min-width: var(--viewer-width);
  flex: 3;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.top-bar {
  height: var(--top-bar-height);
}

.fp-right {
  flex: 2;
  height: 100%;
  position: relative;
  border-left: 1px solid var(--color-border);
}

.fp-right .members {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
}

.fp-right .commit-board {
  position: absolute;
  top: 0;
  left: 0;
  right: var(--members-width);
  bottom: 0;
}

.viewer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.pdf-viewer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 30px;
  background: var(--color-border);
  overflow: auto;
}

.pdf-viewer .pdf {
  margin: 50px 0;
}

.pdf-viewer::-webkit-scrollbar-thumb {
  background: #888;
}
</style>
