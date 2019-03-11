<template>
  <div :class="containerClass" class="members-container" @mousedown.stop>
    <members-item :roomId="roomId" :roomName="roomInfo(roomId).name" class="members" />

    <div class="members-container-open">
      <i :class="containerClass" class="fas fa-angle-left" @mousedown="toggleOpening" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MembersItem from '~/components/molecules/MembersItem'

export default {
  components: {
    MembersItem,
  },
  props: {
    roomId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters('room', ['roomInfo']),
    containerClass() {
      return { opening: this.isOpening }
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
