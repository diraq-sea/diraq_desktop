<template>
  <div class="room-container">
    <loading-panel v-if="loading" />
    <div v-else class="room-contents">
      <h1>Rooms</h1>
      <div class="room-card-container">
        <div class="room-card" @click="openRoomNamePrompt">
          <div><i class="room-add fas fa-plus" /></div>
        </div>
        <div v-for="room in rooms" :key="room.id" class="room-card">
          <div>
            <div class="room-info" @click="enterRoom(room.id)">
              <div class="room-thumbnail"><div /></div>
              <div class="room-name">{{ room.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { TAB_TYPES } from '~/utils/const'
import LoadingPanel from '~/components/atoms/LoadingPanel'

export default {
  components: {
    LoadingPanel,
  },
  props: {
    tab: {
      type: Object,
      required: true,
    },
  },
  data: () => ({ loading: true }),
  computed: {
    ...mapState('room', ['rooms']),
    ...mapState('tab', ['currentTabId']),
  },
  async created() {
    await this.$store.dispatch('room/fetchRooms')
    this.loading = false
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

      const room = await this.$store.dispatch('room/createRoom', value)
      await this.enterRoom(room.id)
    },
    async enterRoom(roomId) {
      await this.$store.dispatch('tab/changeTabType', {
        id: this.currentTabId,
        type: TAB_TYPES.FOLDER,
        values: { roomId, folder: `` },
      })
    },
  },
}
</script>

<style scoped>
.room-container {
  height: 100%;
  overflow: auto;
  color: var(--font-sub);
}

.room-contents {
  max-width: 1080px;
  margin: 0 auto;
  padding: 30px;
}

.room-contents h1 {
  margin: 0 1.666%;
}

.room-contents .room-card-container {
  display: flex;
  margin-top: 30px;
}

.room-contents .room-card-container .room-card {
  width: 30%;
  margin: 0 1.666%;
  padding-top: 16.875%;
  position: relative;
  cursor: pointer;
}

.room-contents .room-card-container .room-card > div {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.room-contents .room-card-container .room-card .room-add {
  display: block;
  height: 100%;
  border: 3px dashed var(--color-date);
  border-radius: 8px;
  transition: 0.2s;
  font-size: 30px;
}

.room-contents .room-card-container .room-card .room-add::before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.room-contents .room-card-container .room-card .room-add:hover {
  background: var(--color-sub);
}

.room-contents .room-card-container .room-card .room-info {
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.room-contents .room-card-container .room-card .room-info .room-thumbnail {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 30px;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
}

.room-contents .room-card-container .room-card .room-info .room-thumbnail div {
  height: 100%;
  background: center/cover url(/images/room.jpg);
  transition: 0.5s;
}

.room-contents .room-card-container .room-card .room-info:hover > .room-thumbnail > div {
  transform: scale(1.15);
}

.room-contents .room-card-container .room-card .room-info .room-name {
  position: absolute;
  height: 30px;
  left: 0;
  right: 0;
  bottom: 0;
  line-height: 30px;
  padding: 0 15px;
  overflow: hidden;
}
</style>
