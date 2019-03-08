<template>
  <div class="ft-container">
    <div class="tab-container">
      <div
        v-for="tab in filteredTab"
        :key="tab.id"
        :class="itemClass(tab.id)"
        class="ft-tab"
        @click="$store.dispatch('tab/changeCurrentTab', tab.id)"
      >
        <span>{{ file(tab.id).name }}</span>
        <i
          class="fas fa-times"
          title="Close"
          @click.stop="$store.commit('tab/removeTab', tab.id)"
        />
      </div>
    </div>

    <user :name="name" :icon="icon" @logout="$emit('logout')" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import User from '~/components/atoms/User'

export default {
  components: {
    User,
  },
  computed: {
    ...mapState('tab', ['tabs', 'currentTab']),
    ...mapState('user', ['name', 'icon']),
    ...mapGetters('file', ['file']),
    itemClass() {
      return id => ({ current: this.currentTab.id === id })
    },
    filteredTab() {
      return this.tabs.filter(({ id }) => this.file(id))
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/css/admin.scss';

.ft-container {
  position: relative;
  height: $TAB_HEIGHT;
  background: $COLOR_SUB;
  display: flex;
}

.tab-container {
  flex: 1;
  overflow-x: auto;
  white-space: nowrap;

  .ft-tab {
    display: inline-block;
    height: 100%;
    background: $COLOR_SUB;
    border-right: 1px solid #{$FONT_SUB}55;
    color: $FONT_SUB;
    font-size: 16px;
    cursor: pointer;
    vertical-align: middle;
    line-height: $TAB_HEIGHT;
    padding: 0 36px;
    text-align: center;
    position: relative;
    border-radius: 12px 12px 0 0;

    &.current {
      background: $COLOR_PAGE;
      color: $FONT_BASE;

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
      color: $FONT_BASE;
      display: block;
      padding: 8px 5px;
    }
  }
}
</style>
