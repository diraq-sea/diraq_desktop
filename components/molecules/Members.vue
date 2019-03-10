<template>
  <div :class="containerClass" class="members-container" @mousedown.stop>
    <div class="members">
      <div class="member-item">
        <div class="member-add"><i class="fas fa-user-plus" title="ルームにメンバーを追加" /></div>
        <div class="member-room">room: {{ roomInfo.name }}</div>
      </div>
      <div v-for="member in members" :key="member.id" class="member-item">
        <div class="member-icon">
          <div :class="memberIconClass(member.online)" :style="memberIconStyle(member.icon)" />
        </div>
        <div class="member-name">{{ member.name }}</div>
        <div class="member-role">{{ roleLabel(member.role) }}</div>
      </div>
    </div>

    <div class="members-container-open">
      <i :class="containerClass" class="fas fa-angle-left" @mousedown="toggleOpening" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('room', ['roomInfo']),
    ...mapGetters('member', ['members', 'roleLabel']),
    containerClass() {
      return { opening: this.isOpening }
    },
    memberIconStyle() {
      return icon => ({ backgroundImage: `url(${icon})` })
    },
    memberIconClass() {
      return isOnline => ({ isOnline })
    },
  },
  data() {
    return {
      isOpening: false,
    }
  },
  mounted() {
    window.addEventListener('mousedown', this.close, false)
  },
  destroyed() {
    window.removeEventListener('mousedown', this.close, false)
  },
  methods: {
    toggleOpening() {
      this.isOpening = !this.isOpening
    },
    close() {
      this.isOpening = false
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/css/admin.scss';

$OPEN_ICON_HEIGHT: 50px;

.members-container {
  border-left: 1px solid $COLOR_BORDER;
  background: $COLOR_PAGE;
  transition: 0.3s;
  width: $MEMBERS_WIDTH;

  &.opening {
    width: $MEMBERS_OPENING_WIDTH;
  }

  .members {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: $OPEN_ICON_HEIGHT;

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
  }

  .members-container-open {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: $MEMBERS_WIDTH;
    height: $OPEN_ICON_HEIGHT;
    line-height: $OPEN_ICON_HEIGHT;
    text-align: center;
    font-size: 24px;
    background: $COLOR_PAGE;
    color: $COLOR_BORDER;

    &:hover {
      color: unset;
    }

    i {
      cursor: pointer;
      transform: rotateZ(0);
      padding: 5px 10px;
      transition: 0.3s;

      &.opening {
        transform: rotateZ(180deg);
      }
    }
  }
}
</style>
