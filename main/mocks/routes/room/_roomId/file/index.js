import fs from 'fs'
import path from 'path'
import mockStore from '../../../../../store/mock.store'
import corrStore from '../../../../../store/corr.store'
import {
  FIRST_CREATED_MESSAGE,
  FIRST_DROPPED_MESSAGE,
  MOCK_FILES_DIR,
  TMP_FILES_DIR,
} from '../../../../../const'
import { create as createFileModel } from '../../../../models/file'
import { create as createCommitModel } from '../../../../models/commit'

const crypto = require('crypto')

export default {
  get: ({ roomId }) => mockStore.filterByKey('file', 'roomId', roomId),
  post({ folder, name, extname, path: filePath }, { roomId }) {
    const target = mockStore.findByKey('file', 'folder', folder)
    const dropped = !!filePath
    const access = true

    if (extname) {
      // file
      const file =
        target && !target.name // フォルダのみ作成されてる状態
          ? mockStore.update('file', {
              id: target.id,
              roomId,
              folder,
              name,
              extname,
              dropped,
              access,
              birthtime: Date.now(),
              mtime: Date.now(),
            })
          : mockStore.add(
              'file',
              createFileModel({
                roomId,
                folder,
                name,
                extname,
                dropped,
                access,
              }),
            )

      const mtime = Date.now() + ''
      const shasum = crypto.createHash('sha1')
      shasum.update(name + mtime)
      const commitId = `${shasum.digest('hex')}-id${file.id}`

      const commit = createCommitModel({
        id: commitId,
        fileId: file.id,
        message: dropped ? FIRST_DROPPED_MESSAGE(name) : FIRST_CREATED_MESSAGE(name),
      })

      mockStore.add('commit', commit)
      const hashname = commit.id
      const filename = `${Date.now()}id${file.id}_${name}`
      if (dropped) {
        fs.copyFileSync(filePath, path.join(TMP_FILES_DIR, `${filename}.${extname}`))
        fs.copyFileSync(filePath, path.join(MOCK_FILES_DIR, `${hashname}.${extname}`))
      }
      const fileandhash = { file, filename, hashname: commit.id }
      return fileandhash
    } else {
      // folder
      const newFolder = `${folder}/${name}`

      const file =
        target && !target.name
          ? mockStore.update('file', {
              ...target,
              folder: newFolder,
            })
          : mockStore.add(
              'file',
              createFileModel({
                roomId,
                folder: newFolder,
              }),
            )
      const fileandhash = { file, filename: null, hashname: null }
      return fileandhash
    }
  },
  delete: ({ fileId }) => {
    let filename
    const extname = mockStore.findById('file', fileId).extname
    for (const commit of mockStore.filterByKey('commit', 'fileId', fileId)) {
      for (const comment of mockStore.filterByKey('comment', 'commitId', commit.id)) {
        mockStore.deleteById('comment', comment.id)
      }
      mockStore.deleteById('commit', commit.id)
      filename = corrStore.hashToFilename(commit.id)
    }
    corrStore.deleteFileInfo(filename)
    try {
      fs.unlinkSync(path.join(TMP_FILES_DIR, `${filename}.${extname}`))
    } catch (error) {}
    mockStore.deleteById('file', fileId)
  },
}
