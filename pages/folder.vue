<template>
  <div class="folder-container">
    <div class="folder-contents">
      <h1>Room: {{ roomInfo.name }}</h1>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { TAB_TYPES } from '~/utils/const'

export default {
  async fetch({ store }) {
    await store.dispatch('room/fetchRoomInfo', store.getters['tab/currentTab'].values.roomId)
  },
  computed: {
    ...mapState('room', ['roomInfo']),
    ...mapGetters('tab', ['currentTab']),
  },
  methods: {
    async open(roomId) {
      await this.$store.dispatch('tab/changeTabType', {
        id: this.currentTabId,
        type: TAB_TYPES.FOLDER,
        values: { roomId },
      })

      this.$router.push('/')
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/css/admin.scss';

.folder-container {
  height: 100%;
  overflow: auto;
  color: $FONT_SUB;
}

.folder-contents {
  max-width: 1080px;
  margin: 0 auto;
  padding: 30px;

  h1 {
    margin: 0 1.666%;
  }
}
</style>
