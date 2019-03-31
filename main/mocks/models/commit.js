import mockStore from '../../store/mock.store'
import { FIRST_CREATED_MESSAGE } from '../../const'

export default {
  defaultValues: () => [
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
  ],
  create: ({ fileId, commitComment }) => ({
    id: `hash-${mockStore.get('commit').length}`,
    fileId,
    message: commitComment,
    user: 0,
    birthtime: Date.now(),
    mtime: Date.now(),
  }),
}
