import roomsStore from '../rooms'

let infoList = {
  0: {
    items: [
      {
        id: 0,
        folder: '/folder1',
        name: 'file1',
        extname: 'docx',
        birthtime: Date.now() - 3600 * 1000,
        mtime: Date.now(),
      },
    ],
  },
}

export default {
  get({ roomId }) {
    if (!infoList[roomId]) infoList[roomId] = { items: [] }

    return {
      ...roomsStore.get().find(({ id }) => id === roomId),
      ...infoList[roomId],
    }
  },
  post({ folder, name, extname }, { roomId }) {
    if (extname) {
    } else {
      const newFolder = `${folder}/${name}`
      const { items } = infoList[roomId]
      let target = items.find(item => item.folder === folder && !item.name)

      if (target) {
        target.folder = newFolder
      } else {
        target = {
          id: items.length,
          folder: newFolder,
        }

        items.push(target)
      }

      return target
    }
  },
  getAll: () => infoList,
  setAll: value => (infoList = value),
}
