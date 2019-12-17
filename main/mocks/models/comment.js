import mockStore from '~/store/mock.store'

export function defaultValues() {
  return [
    {
      id: 0,
      commitId: 'hash-0',
      user: 2,
      birthtime: Date.now() - 24 * 3600 * 1000,
      mtime: Date.now() - 24 * 3600 * 1000,
      comment: '最後のページ意味不明・・・',
      watchedBy: [0, 1, 2, 3, 4],
    },
    {
      id: 1,
      commitId: 'hash-0',
      user: 0,
      birthtime: Date.now() - 2 * 24 * 3600 * 1000,
      mtime: Date.now() - 2 * 24 * 3600 * 1000,
      comment: 'フォントサイズと行数の見本だろう',
      watchedBy: [0, 1, 2, 3, 4],
    },
    {
      id: 2,
      commitId: 'hash-1',
      user: 3,
      birthtime: Date.now() - 24 * 3600 * 1000,
      mtime: Date.now() - 24 * 3600 * 1000,
      comment: '読みやすい英文ですね',
      watchedBy: [0, 1, 2, 3, 4],
    },
    {
      id: 3,
      commitId: 'hash-1',
      user: 4,
      birthtime: Date.now() - 2 * 24 * 3600 * 1000,
      mtime: Date.now() - 2 * 24 * 3600 * 1000,
      comment: 'さすが東大は違う',
      watchedBy: [0, 1, 2, 4],
    },
    {
      id: 4,
      commitId: 'hash-1',
      user: 1,
      birthtime: Date.now() - 3 * 24 * 3600 * 1000,
      mtime: Date.now() - 3 * 24 * 3600 * 1000,
      comment: 'いえ、Google翻訳使っただけです',
      watchedBy: [0, 1, 2],
    },
    {
      id: 5,
      commitId: 'hash-2',
      user: 2,
      birthtime: Date.now() - 24 * 3600 * 1000,
      mtime: Date.now() - 24 * 3600 * 1000,
      comment: 'ずいぶん書きやすくなってていいと思います',
      watchedBy: [2],
    },
  ]
}

export function create({ userId, commitId, comment }) {
  return {
    id: mockStore.get('comment').length,
    commitId,
    user: userId,
    birthtime: Date.now(),
    mtime: Date.now(),
    comment,
    watchedBy: [userId],
  }
}

export default { defaultValues, create }
