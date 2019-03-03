const currentTab = { id: 1 }

// Todo: ファイル削除に合わせてタブも消す
export const state = () => ({
  tabs: [currentTab, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
  currentTab,
})

export const mutations = {
  setCurrentTab(state, id) {
    state.currentTab = state.tabs.find(tab => tab.id === id)
  },
  removeTab(state, id) {
    if (state.currentTab.id === id) {
      const index = state.tabs.indexOf(state.currentTab)

      if (state.tabs.length === 1) {
        state.currentTab = null
      } else {
        state.currentTab = state.tabs[index === 0 ? 1 : index - 1]
      }
    }

    state.tabs = state.tabs.filter(tab => tab.id !== id)
  },
}

export const actions = {
  async changeCurrentTab({ commit }, id) {
    commit('setCurrentTab', id)
  },
}
