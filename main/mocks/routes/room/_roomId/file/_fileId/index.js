import fs from 'fs'
import path from 'path'
import mockStore from '../../../../../../store/mock.store'
import { MOCK_FILES_DIR } from '../../../../../../const'
import commitsRoute from './commit'

const crypto = require('crypto')

export default {
  get: ({ fileId }) => ({
    ...mockStore.findById('file', fileId),
    commits: commitsRoute.get({ fileId }),
  }),
  post: ({ fileId, filePath, extname }) => {
    const file = mockStore.findById('file', fileId)
    file.mtime = Date.now()
    mockStore.update('file', file)
    const filename = file.name
    const mtime = file.mtime + ''
    const shasum = crypto.createHash('sha1')
    shasum.update(filename + mtime)
    const commitId = `${shasum.digest('hex')}-id${fileId}`
    fs.copyFileSync(filePath, path.join(MOCK_FILES_DIR, `${commitId}.${extname}`))
    return commitId
  },
}
