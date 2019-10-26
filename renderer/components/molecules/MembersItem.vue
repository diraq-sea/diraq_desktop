<template>
  <div>
    <div class="member-item">
      <div class="member-add">
        <i class="fas fa-user-plus" title="ルームにメンバーを追加" @click="openDialog" />
      </div>
      <div v-if="roomName" class="member-room">Room: {{ roomName }}</div>
    </div>
    <div v-for="user in sortedUsers(roomId)" :key="user.id" class="member-item">
      <div class="member-icon">
        <div :class="userIconClass(user.name)" :style="userIconStyle(user.icon)" />
      </div>
      <div class="member-name">{{ user.name }}</div>
      <!-- <div class="member-role">{{ roleLabel(user.role) }}</div> -->
    </div>
    <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false" class="dialog">
      <add-dialog :visible="dialogVisible" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddDialog from '~/components/organisms/AddDialog'

export default {
  components: {
    AddDialog,
  },
  props: {
    roomId: {
      type: Number,
      required: true,
    },
    roomName: {
      type: String,
      required: false,
      default: '',
    },
  },
  data: () => ({
    dialogVisible: false,
  }),
  computed: {
    ...mapGetters('user', ['sortedUsers']),
    userIconStyle() {
      return icon => ({ backgroundImage: `url(${icon})` })
    },
    userIconClass() {
      return name => ({ name })
    },
  },
  methods: {
    async openDialog() {
      await this.$store.dispatch('room/getroomId', this.roomId)
      this.dialogVisible = !this.dialogVisible
    },
  },
}
</script>

<style scoped>
.member-item {
  width: var(--members-opening-width);
  display: flex;
  padding-right: 20px;
}

.member-item .member-add {
  width: var(--members-width);
  text-align: center;
  font-size: 22px;
  padding: 10px 0 10px 5px;
}

.member-item .member-add i {
  cursor: pointer;
  color: var(--color-border);
  transition: 0.2s;
}

.member-item .member-add i:hover {
  color: unset;
}

.member-item .member-room {
  flex: 1;
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.member-icon {
  width: var(--members-width);
  padding: 8px 0;
}

.member-icon div {
  width: var(--icon-size-small);
  height: var(--icon-size-small);
  margin: 0 auto;
  border-radius: 50%;
  background: center/cover no-repeat;
  cursor: pointer;
  opacity: 0.7;
}

.member-icon div.isOnline {
  filter: grayscale(0%);
  opacity: 1;
  position: relative;
}

.member-icon div.isOnline::after {
  content: '';
  position: absolute;
  bottom: -12.5%;
  right: -12.5%;
  width: 50%;
  height: 50%;
  background: #43b581;
  border: var(--color-page) solid 2px;
  border-radius: 50%;
}

.member-name {
  flex: 1;
  border-bottom: var(--color-border) solid 1px;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding-left: 10px;
}

/* .member-role {
  width: 60px;
  border-bottom: var(--color-border) solid 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
} */

.dialog >>> .el-dialog__body {
  padding: 20px 40px 50px;
}

.dialog >>> .v-modal,
.dialog >>> .el-dialog__wrapper {
  top: var(--titlebar-height);
}
</style>
