import mockStore from '../../../../store/mock.store'
import commitsRoute from './commits'
import fs from 'fs'
import path from 'path'
import { MOCK_FILES_DIR } from '../../../../const'

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
