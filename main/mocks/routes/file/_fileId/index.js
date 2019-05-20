import fs from 'fs'
import path from 'path'
import mockStore from '../../../../store/mock.store'
import { MOCK_FILES_DIR } from '../../../../const'
import commitsRoute from './commits'

export default {
  get: ({ fileId }) => ({
    ...mockStore.findById('file', fileId),
    commits: commitsRoute.get({ fileId }),
  }),
  post: ({ filePath, extname }) => {
    const commitId = `hash-${mockStore.get('commit').length}` // hashの取り方は後々変える
    fs.copyFileSync(filePath, path.join(MOCK_FILES_DIR, `${commitId}.${extname}`))
    return commitId
  },
}
