import { TAB_TYPES } from '~/utils/const'
import {
  GET_TABS,
  CHANGE_CURRENT_TAB,
  ADD_NEW_TAB,
  REMOVE_TAB,
  CHANGE_TAB_TYPE,
} from '~~/common/ipcTypes'

export const state = () => ({
  tabs: [],
  currentTabId: null,
})

export const getters = {
  isRoomTab: () => tab => tab.type === TAB_TYPES.ROOM,
  isFolderTab: () => tab => tab.type === TAB_TYPES.FOLDER,
  isFileTab: () => tab => tab.type === TAB_TYPES.FILE,
  currentTab: state => state.tabs.find(tab => tab.id === state.currentTabId),
}

export const mutations = {
  setTabs(state, { tabs, currentTabId }) {
    state.tabs = tabs
    state.currentTabId = currentTabId
  },
}

export const actions = {
  async getTabs({ commit, dispatch }) {
    const tabsInfo = await this.$ipc(GET_TABS)
    if (tabsInfo.tabs.length) {
      commit('setTabs', tabsInfo)
    } else {
      await dispatch('addNewTab')
    }
  },

  async changeCurrentTab({ dispatch }, id) {
    await this.$ipc(CHANGE_CURRENT_TAB, id)
    await dispatch('getTabs')
  },

  async addNewTab({ dispatch }) {
    await this.$ipc(ADD_NEW_TAB, TAB_TYPES.ROOM)
    await dispatch('getTabs')
  },

  async removeTab({ dispatch }, id) {
    await this.$ipc(REMOVE_TAB, id)
    await dispatch('getTabs')
  },

  async changeTabType({ dispatch }, params) {
    await this.$ipc(CHANGE_TAB_TYPE, params)
    await dispatch('getTabs')
  },
}
