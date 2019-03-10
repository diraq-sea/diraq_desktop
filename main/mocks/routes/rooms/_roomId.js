import roomsStore from '../rooms'

const infoList = {
  0: {
    items: [
      {
        id: 0,
        folder: ['folder1'],
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
}
