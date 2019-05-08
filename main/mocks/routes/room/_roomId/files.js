import fs from 'fs'
import path from 'path'
import mockStore from '../../../../store/mock.store'
import corrStore from '../../../../store/corr.store'
import {
  FIRST_CREATED_MESSAGE,
  FIRST_DROPPED_MESSAGE,
  MOCK_FILES_DIR,
  TMP_FILES_DIR,
} from '../../../../const'
import { create as createFileModel } from '../../../models/file'
import { create as createCommitModel } from '../../../models/commit'

export default {
  get: ({ roomId }) => mockStore.filterByKey('file', 'roomId', roomId),
  post({ folder, name, extname, path: filePath }, { roomId }) {
    const target = mockStore.findByKey('file', 'folder', folder)
    const dropped = !!filePath

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
              }),
            )

      const commit = createCommitModel({
        fileId: file.id,
        message: dropped ? FIRST_DROPPED_MESSAGE(name) : FIRST_CREATED_MESSAGE(name),
      })

      mockStore.add('commit', commit)

      if (dropped) {
        const hashname = commit.id
        const filename = `${Date.now()}_${name}`
        fs.copyFileSync(filePath, path.join(TMP_FILES_DIR, `${filename}.${extname}`))
        fs.copyFileSync(filePath, path.join(MOCK_FILES_DIR, `${hashname}.${extname}`))
        corrStore.writeFileInfo(filename, hashname)
      }

      return file
    } else {
      // folder
      const newFolder = `${folder}/${name}`

      return target && !target.name
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
    }
  },
}
