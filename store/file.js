import { FETCH_FILE, EDIT_FILE, ADD_COMMENT } from '~/common/ipcTypes'

const url = 'http://www.mech.tohoku-gakuin.ac.jp/rde/contents/kougakukai/files/template.docx'

export const state = () => ({
  fileList: {},
  currentCommitIdList: {},
})

export const getters = {
  file: state => fileId => state.fileList[fileId],
  currentCommitId: state => fileId => state.currentCommitIdList[fileId],
  currentCommit: (state, getters) => fileId =>
    getters.file(fileId).commits.find(commit => commit.id === getters.currentCommitId(fileId)),
}

export const mutations = {
  setFile(state, file) {
    state.fileList = {
      ...state.fileList,
      [file.id]: file,
    }
  },
  setCurrentCommitId(state, { fileId, id }) {
    state.currentCommitIdList = {
      ...state.currentCommitIdList,
      [fileId]: id,
    }
  },
  setComment(state, file) {
    state.fileList = {
      ...state.fileList,
      [file.id]: file,
    }
  },
  // addComment(state, { id, value }) {
  //   const file = state.files.find(file => file.commits.find(commit => commit.id === id))
  //   const commit = file.commits.find(commit => commit.id === id)
  //   const newFile = {
  //     ...file,
  //     commits: [...file.commits],
  //   }

  //   newFile.commits[newFile.commits.indexOf(commit)] = {
  //     ...commit,
  //     comments: [
  //       ...commit.comments,
  //       {
  //         id: Date.now(),
  //         user: 1,
  //         date: Date.now() - 3 * 24 * 3600 * 1000,
  //         comment: value,
  //       },
  //     ],
  //   }

  //   state.files = [...state.files]
  //   state.files[state.files.indexOf(file)] = newFile
  // },
  addCommit(state, message) {
    const file = state.files.find(file =>
      file.commits.find(commit => commit.id === state.currentCommit.id),
    )

    const newFile = {
      ...file,
      commits: [
        ...file.commits,
        {
          id: `hash${Date.now()}`,
          url,
          message,
          user: 1,
          parents: [file.commits[file.commits.length - 1].id],
          comments: [],
        },
      ],
    }

    state.files = [...state.files]
    state.files[state.files.indexOf(file)] = newFile
  },
}

export const actions = {
  async fetchFile({ commit }, id) {
    const file = await this.$ipc(FETCH_FILE, id)
    commit('setFile', file)
    commit('setCurrentCommitId', {
      fileId: file.id,
      id: file.commits[file.commits.length - 1].id,
    })
  },
  async editFile(store, params) {
    await this.$ipc(EDIT_FILE, params)
  },
  async addComment({ dispatch }, { id, value }) {
    await this.$ipc(ADD_COMMENT, { id, value })
  },
}
