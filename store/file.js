import { FETCH_FILE, EDIT_FILE } from '~/common/ipcTypes'

const url = 'http://www.mech.tohoku-gakuin.ac.jp/rde/contents/kougakukai/files/template.docx'

export const state = () => ({
  file: null,
  currentCommitId: null,
})

export const getters = {
  currentCommit: state => state.file.commits.find(commit => commit.id === state.currentCommitId),
}

export const mutations = {
  setFile(state, file) {
    state.file = file
  },
  setCurrentCommitId(state, id) {
    state.currentCommitId = id
  },
  addComment(state, { id, value }) {
    const file = state.files.find(file => file.commits.find(commit => commit.id === id))
    const commit = file.commits.find(commit => commit.id === id)
    const newFile = {
      ...file,
      commits: [...file.commits],
    }

    newFile.commits[newFile.commits.indexOf(commit)] = {
      ...commit,
      comments: [
        ...commit.comments,
        {
          id: Date.now(),
          user: 1,
          date: Date.now() - 3 * 24 * 3600 * 1000,
          comment: value,
        },
      ],
    }

    state.files = [...state.files]
    state.files[state.files.indexOf(file)] = newFile
  },
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
    commit('setCurrentCommitId', file.commits[file.commits.length - 1].id)
  },
  async editFile({ state }, commit) {
    await this.$ipc(EDIT_FILE, { extname: state.file.extname, commit })
  },
}
