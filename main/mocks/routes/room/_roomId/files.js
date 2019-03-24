import mockStore from '../../../../store/mock.store'
import { FIRST_COMMIT_MESSAGE } from '../../../../const'
import fileModel from '../../../models/file'
import commitModel from '../../../models/commit'

export default {
  get: ({ roomId }) => mockStore.filterByKey('file', 'roomId', roomId),
  post({ folder, name, extname }, { roomId }) {
    const target = mockStore.findByKey('file', 'folder', folder)

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
              birthtime: Date.now(),
              mtime: Date.now(),
            })
          : mockStore.add(
              'file',
              fileModel.create({
                roomId,
                folder,
                name,
                extname,
              }),
            )

      mockStore.add(
        'commit',
        commitModel.create({
          fileId: file.id,
          message: FIRST_COMMIT_MESSAGE(name),
        }),
      )

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
            fileModel.create({
              roomId,
              folder: newFolder,
            }),
          )
    }
  },
}
