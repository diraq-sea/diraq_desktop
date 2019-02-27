<template>
  <div class="ft-container">
    <div class="tab-container">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        :class="itemClass(tab.id)"
        class="ft-tab"
        @click="$store.dispatch('tab/changeCurrentTab', tab.id)"
      >
        <span>{{ tabLabel(tab.id) }}</span>
        <i
          class="fas fa-times"
          title="Close"
          @click.stop="$store.commit('tab/removeTab', tab.id)"
        />
      </div>
    </div>

    <div class="user">
      <el-tooltip placement="bottom-end" effect="light" :manual="true" :value="isOpeningUser">
        <div slot="content">
          <div class="user-name">{{ name }}</div>
          <div class="user-item" @click="$emit('logout')">
            <i class="fas fa-power-off" /><span>Logout</span>
          </div>
        </div>

        <div :style="userStyle" class="user-button" @click.stop="toggleOpenUser" />
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('tab', ['tabs', 'currentTab']),
    ...mapState('user', ['name', 'icon']),
    ...mapGetters('file', ['file']),
    itemClass() {
      return id => ({ current: this.currentTab.id === id })
    },
    tabLabel() {
      return id => `${this.file(id).name}${this.file(id).deleted ? ' (deleted)' : ''}`
    },
    userStyle() {
      return { backgroundImage: `url(${this.icon})` }
    },
  },
  data() {
    return {
      isOpeningUser: false,
    }
  },
  mounted() {
    window.addEventListener('click', this.closeOpenUser, false)
  },
  destroyed() {
    window.removeEventListener('click', this.closeOpenUser, false)
  },
  methods: {
    toggleOpenUser() {
      this.isOpeningUser = !this.isOpeningUser
    },
    closeOpenUser() {
      this.isOpeningUser = false
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/css/admin.scss';

.ft-container {
  position: relative;
  height: $TAB_HEIGHT;
  background: $COLOR_GRAY2;
}

.tab-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 55px;
  overflow-x: auto;
  white-space: nowrap;

  .ft-tab {
    display: inline-block;
    height: $TAB_HEIGHT;
    background: $COLOR_GRAY;
    margin-right: 1px;
    color: $FONT_GRAY;
    font-size: 16px;
    cursor: pointer;
    vertical-align: middle;
    line-height: $TAB_HEIGHT;
    padding: 0 36px;
    text-align: center;
    position: relative;

    &.current {
      background: $COLOR_BLACK;
      color: $FONT_WHITE;

      i {
        opacity: 1;
      }
    }

    &:hover > i {
      opacity: 1;
    }

    i {
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%);
      font-size: 12px;
      opacity: 0;
      color: $FONT_WHITE;
      display: block;
      padding: 8px 5px;
    }
  }
}

.user {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
}

.user-button {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: center/cover no-repeat;
  cursor: pointer;
}

.user-name {
  font-weight: bold;
  border-bottom: 1px solid #bbb;
  text-align: center;
  font-size: 12px;
  padding-bottom: 3px;
  margin-bottom: 8px;
}

.user-item {
  padding: 2px 8px 2px 5px;
  font-size: 14px;
  display: block;
  cursor: pointer;
  color: #333;

  i {
    margin-right: 8px;
  }
}
</style>
