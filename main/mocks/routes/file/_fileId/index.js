import mockStore from '../../../../store/mock.store'

export default {
  get({ fileId }) {
    const file = mockStore.findById('file', fileId)
    const commits = mockStore.filterByKey('commit', 'fileId', fileId).map(commit => ({
      ...commit,
      comments: mockStore.filterByKey('comment', 'commitId', commit.id),
    }))

    return { ...file, commits }
  },
}
