const currentTab = { id: 1, name: 'file1.js' }

export const state = () => ({
  tabs: [
    currentTab,
    { id: 2, name: 'file2.js' },
    { id: 3, name: 'file3.js' },
    { id: 4, name: 'file4.js' },
    { id: 5, name: 'file5.js' },
  ],
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
