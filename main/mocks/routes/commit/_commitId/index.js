import mockStore from '../../../../store/mock.store'
import commentsRoute from './comments'
import { MOCK_FILES_PATH, DEFAULT_FILES_PATH_CHUNK } from '../../../../const'

export default {
  get({ commitId }) {
    const commit = mockStore.findById('commit', commitId)
    const file = mockStore.findById('file', commit.fileId)
    const fileCommits = mockStore.filterByKey('commit', 'fileId', commit.fileId)

    return {
      ...commit,
      url:
        file.dropped || fileCommits[0].id !== commitId
          ? `${mockStore.proxyUrl}/${MOCK_FILES_PATH}/${commitId}.${file.extname}`
          : `${mockStore.proxyUrl}/${DEFAULT_FILES_PATH_CHUNK}.${file.extname}`,
      comments: commentsRoute.get({ commitId }),
    }
  },
}
