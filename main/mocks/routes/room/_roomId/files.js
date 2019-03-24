import mockStore from '../../../../store/mock.store'

export default {
  get: ({ roomId }) => mockStore.filterByKey('file', 'roomId', roomId),
  post({ folder, name, extname }, { roomId }) {
    const target = mockStore.findByKey('file', 'folder', folder)

    if (extname) {
      // file
      return target && !target.name // フォルダのみ作成されてる状態
        ? mockStore.update('file', {
            id: target.id,
            roomId,
            folder,
            name,
            extname,
            birthtime: Date.now(),
            mtime: Date.now(),
          })
        : mockStore.add('file', {
            roomId,
            folder,
            name,
            extname,
          })
    } else {
      // folder
      const newFolder = `${folder}/${name}`

      return target && !target.name
        ? mockStore.update('file', {
            id: target.id,
            roomId,
            folder: newFolder,
          })
        : mockStore.add('file', {
            roomId,
            folder: newFolder,
          })
    }
  },
}
