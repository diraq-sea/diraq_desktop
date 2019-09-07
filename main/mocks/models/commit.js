import { FIRST_CREATED_MESSAGE } from '~/const'

export function defaultValues() {
  return [
    {
      id: 'hash-0',
      fileId: 0,
      message: FIRST_CREATED_MESSAGE('file1'),
      user: 0,
      birthtime: Date.now() - 3 * 3600 * 1000,
      mtime: Date.now() - 3 * 3600 * 1000,
    },
    {
      id: 'hash-1',
      fileId: 0,
      message: '英訳文を追加',
      user: 1,
      birthtime: Date.now() - 2 * 3600 * 1000,
      mtime: Date.now() - 2 * 3600 * 1000,
    },
    {
      id: 'hash-2',
      fileId: 0,
      message: 'レイアウトを修正',
      user: 3,
      birthtime: Date.now() - 3600 * 1000,
      mtime: Date.now() - 3600 * 1000,
    },
  ]
}

export function create({ id, fileId, message, userId }) {
  return {
    id,
    fileId,
    message,
    userId,
    birthtime: Date.now(),
    mtime: Date.now(),
    watchedBy: [userId],
  }
}

export default { defaultValues, create }
