<template>
  <div>
    <div class="member-item">
      <div class="member-add"><i class="fas fa-user-plus" title="ルームにメンバーを追加" /></div>
      <div v-if="roomName" class="member-room">Room: {{ roomName }}</div>
    </div>
    <div v-for="member in sortedMembers(roomId)" :key="member.id" class="member-item">
      <div class="member-icon">
        <div :class="memberIconClass(member.online)" :style="memberIconStyle(member.icon)" />
      </div>
      <div class="member-name">{{ member.name }}</div>
      <div class="member-role">{{ roleLabel(member.role) }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
  computed: {
    ...mapGetters('member', ['sortedMembers', 'roleLabel']),
    memberIconStyle() {
      return icon => ({ backgroundImage: `url(${icon})` })
    },
    memberIconClass() {
      return isOnline => ({ isOnline })
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/css/admin.scss';

.member-item {
  width: $MEMBERS_OPENING_WIDTH;
  display: flex;
  padding-right: 20px;

  .member-add {
    width: $MEMBERS_WIDTH;
    text-align: center;
    font-size: 22px;
    padding: 10px 0 10px 5px;

    i {
      cursor: pointer;
      color: $COLOR_BORDER;
      transition: 0.2s;

      &:hover {
        color: unset;
      }
    }
  }

  .member-room {
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: 10px;
  }
}

.member-icon {
  width: $MEMBERS_WIDTH;
  padding: 8px 0;

  div {
    width: $ICON_SIZE_SMALL;
    height: $ICON_SIZE_SMALL;
    margin: 0 auto;
    border-radius: 50%;
    background: center/cover no-repeat;
    cursor: pointer;
    filter: grayscale(100%);
    opacity: 0.7;

    &.isOnline {
      filter: grayscale(0%);
      opacity: 1;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -12.5%;
        right: -12.5%;
        width: 50%;
        height: 50%;
        background: #43b581;
        border: $COLOR_PAGE solid 2px;
        border-radius: 50%;
      }
    }
  }
}

.member-name {
  flex: 1;
  border-bottom: $COLOR_BORDER solid 1px;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.member-role {
  width: 60px;
  border-bottom: $COLOR_BORDER solid 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}
</style>
