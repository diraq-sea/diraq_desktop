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

<style scoped>
.members-container {
  border-left: 1px solid var(--color-border);
  background: var(--color-page);
  transition: 0.3s;
  width: var(--members-width);
}

.members-container.opening {
  width: var(--members-opening-width);
}

.members-container .members {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: var(--open-icon-height);
}

.members-container .members-container-open {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: calc(var(--members-width) - 1px);
  height: var(--open-icon-height);
  line-height: var(--open-icon-height);
  text-align: center;
  font-size: 24px;
  background: var(--color-page);
  color: var(--color-border);
}

.members-container .members-container-open:hover {
  color: unset;
}

.members-container .members-container-open i {
  cursor: pointer;
  transform: rotateZ(0);
  padding: 5px 10px;
  transition: 0.3s;
}

.members-container .members-container-open i.opening {
  transform: rotateZ(180deg);
}
</style>
