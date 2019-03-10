import roomsStore from '../rooms'
import foldersStore from '../rooms/_roomId'

const url = 'http://www.mech.tohoku-gakuin.ac.jp/rde/contents/kougakukai/files/template.docx'
const fileList = {
  0: {
    commits: [
      {
        id: 'hash1-1',
        url,
        message: '資料アップしました',
        user: 0,
        parents: [],
        comments: [
          {
            id: 3,
            user: 2,
            date: Date.now() - 24 * 3600 * 1000,
            comment: '最後のページ意味不明・・・',
          },
          {
            id: 2,
            user: 0,
            date: Date.now() - 2 * 24 * 3600 * 1000,
            comment: 'フォントサイズと行数の見本だろう',
          },
        ],
      },
      {
        id: 'hash1-2',
        url,
        message: '英訳文を追加',
        user: 1,
        parents: ['hash1-1'],
        comments: [
          {
            id: 12,
            user: 3,
            date: Date.now() - 24 * 3600 * 1000,
            comment: '読みやすい英文ですね',
          },
          {
            id: 11,
            user: 4,
            date: Date.now() - 2 * 24 * 3600 * 1000,
            comment: 'さすが東大は違う',
          },
          {
            id: 10,
            user: 1,
            date: Date.now() - 3 * 24 * 3600 * 1000,
            comment: 'いえ、Google翻訳使っただけです',
          },
        ],
      },
      {
        id: 'hash1-3',
        url,
        message: 'レイアウトを修正',
        user: 3,
        parents: ['hash1-2'],
        comments: [
          {
            id: 13,
            user: 2,
            date: Date.now() - 24 * 3600 * 1000,
            comment: 'ずいぶん書きやすくなってていいと思います',
          },
        ],
      },
    ],
  },
}

export default {
  get({ fileId }) {
    const roomId = roomsStore
      .get()
      .find(room => foldersStore.get({ roomId: room.id }).items.find(file => file.id === fileId)).id

    if (!fileList[fileId]) fileList[fileId] = { commits: [] }

    return {
      ...foldersStore.get({ roomId }).items.find(file => file.id === fileId),
      ...fileList[fileId],
      roomId,
    }
  },
}
