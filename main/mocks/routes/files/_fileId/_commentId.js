import roomsStore from '../../rooms'
import foldersStore from '../../rooms/_roomId'
const fs = require('fs') // 仮のJSONフォルダのため
const { INSTANT_FILE } = require('../../../../const') // 仮のJSONフォルダ

const url = 'http://www.mech.tohoku-gakuin.ac.jp/rde/contents/kougakukai/files/template.docx'
let basicfileList = JSON.parse(fs.readFileSync(INSTANT_FILE)) || {
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
            id: 0,
            user: 2,
            date: Date.now() - 24 * 3600 * 1000,
            comment: '最後のページ意味不明・・・',
          },
          {
            id: 1,
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
            id: 0,
            user: 3,
            date: Date.now() - 24 * 3600 * 1000,
            comment: '読みやすい英文ですね',
          },
          {
            id: 1,
            user: 4,
            date: Date.now() - 2 * 24 * 3600 * 1000,
            comment: 'さすが東大は違う',
          },
          {
            id: 2,
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
            id: 0,
            user: 2,
            date: Date.now() - 24 * 3600 * 1000,
            comment: 'ずいぶん書きやすくなってていいと思います',
          },
        ],
      },
    ],
  },
}
let fileList = {}

export default {
  get: () => fileList,
  post({ fileId, username, commentId, value }) {
    const roomId = roomsStore
      .get()
      .find(room => foldersStore.get({ roomId: room.id }).items.find(file => file.id === fileId)).id

    if (!basicfileList[fileId]) basicfileList[fileId] = { commits: [] }
    const comment = {
      id: basicfileList[fileId].commits[commentId].comments.length,
      user: 0,
      date: Date.now() - 24 * 3600 * 1000,
      comment: value,
    }
    basicfileList[fileId].commits[commentId].comments.push(comment)
    fileList = {
      ...foldersStore.get({ roomId }).items.find(file => file.id === fileId),
      ...basicfileList[fileId],
      roomId,
    }
    fs.writeFileSync(INSTANT_FILE, JSON.stringify(basicfileList))
    return fileList
  },
  getAll: () => fileList,
  setAll: value => (fileList = value),
}
