import { FETCH_FILE } from '~/common/ipcTypes'

export const state = () => ({
  files: [
    {
      id: 1,
      name: 'file1.js',
      deleted: false,
      commits: [
        {
          id: 'hash1-1',
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
        },
        {
          id: 'hash1-2',
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
      name: 'file2.js',
      deleted: false,
      commits: [
        {
          id: 'hash2',
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
      name: 'file3.js',
      deleted: false,
      commits: [
        {
          id: 'hash3',
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
      name: 'file4.js',
      deleted: true,
    },
    {
      id: 5,
      name: 'file5.js',
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
    commit('setFile', file)
  },
}
