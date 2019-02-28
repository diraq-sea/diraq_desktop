import { FETCH_FILE, EDIT_FILE } from '~/common/ipcTypes'

const url = 'http://www.mech.tohoku-gakuin.ac.jp/rde/contents/kougakukai/files/template.docx'
const currentCommit = {
  id: 'hash1-1',
  url,
  message: 'first commit',
  user: 1,
  parents: [],
  comments: [
    {
      id: 3,
      user: 1,
      date: Date.now() - 24 * 3600 * 1000,
      comment: 'sample comment3',
    },
    {
      id: 2,
      user: 1,
      date: Date.now() - 2 * 24 * 3600 * 1000,
      comment: 'sample comment2',
    },
  ],
}

export const state = () => ({
  currentCommit,
  files: [
    {
      id: 1,
      name: 'file1.docx',
      deleted: false,
      commits: [
        currentCommit,
        {
          id: 'hash1-2',
          url,
          message: 'first commit - 2',
          user: 1,
          parents: ['hash1-1'],
          comments: [
            {
              id: 12,
              user: 1,
              date: Date.now() - 24 * 3600 * 1000,
              comment: 'sample comment3',
            },
            {
              id: 11,
              user: 1,
              date: Date.now() - 2 * 24 * 3600 * 1000,
              comment: 'sample comment2',
            },
            {
              id: 10,
              user: 1,
              date: Date.now() - 3 * 24 * 3600 * 1000,
              comment: 'sample comment1',
            },
          ],
        },
        {
          id: 'hash1-3',
          url,
          message: 'first commit - 3',
          user: 1,
          parents: ['hash1-2'],
          comments: [
            {
              id: 13,
              user: 1,
              date: Date.now() - 24 * 3600 * 1000,
              comment: 'sample comment3',
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'file2.docx',
      deleted: false,
      commits: [
        {
          id: 'hash2',
          url,
          message: 'second commit',
          user: 1,
          parents: [],
          comments: [
            {
              id: 6,
              user: 1,
              date: Date.now() - 24 * 3600 * 1000,
              comment: 'sample comment6',
            },
            {
              id: 5,
              user: 1,
              date: Date.now() - 2 * 24 * 3600 * 1000,
              comment: 'sample comment5',
            },
            {
              id: 4,
              user: 1,
              date: Date.now() - 3 * 24 * 3600 * 1000,
              comment: 'sample comment4',
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: 'file3.docx',
      deleted: false,
      commits: [
        {
          id: 'hash3',
          url,
          message: 'third commit',
          user: 1,
          parents: [],
          comments: [
            {
              id: 9,
              user: 1,
              date: Date.now() - 24 * 3600 * 1000,
              comment: 'sample comment9',
            },
            {
              id: 8,
              user: 1,
              date: Date.now() - 2 * 24 * 3600 * 1000,
              comment: 'sample comment8',
            },
            {
              id: 7,
              user: 1,
              date: Date.now() - 3 * 24 * 3600 * 1000,
              comment: 'sample comment7',
            },
          ],
        },
      ],
    },
    {
      id: 4,
      name: 'file4.docx',
      deleted: true,
    },
    {
      id: 5,
      name: 'file5.docx',
      deleted: true,
    },
  ],
})

export const getters = {
  file(state) {
    return id => state.files.find(file => file.id === id)
  },
}

export const mutations = {
  addFile(state, file) {
    state.files = [...state.files, file]
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
}

export const actions = {
  async fetchFile({ commit }, id) {
    const file = await this.$ipc(FETCH_FILE, id)
    commit('addFile', file)
  },
  async editFile({ state }, commit) {
    const file = state.files.find(file => file.commits.find(({ id }) => commit.id === id))
    await this.$ipc(EDIT_FILE, { name: file.name, commit })
  },
}
