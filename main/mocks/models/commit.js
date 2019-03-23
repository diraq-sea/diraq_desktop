import mockStore from '../../store/mock.store'

const url = 'http://www.mech.tohoku-gakuin.ac.jp/rde/contents/kougakukai/files/template.docx'

export default {
  defaultValues: () => [
    {
      id: 'hash-0',
      fileId: 0,
      url,
      message: '資料アップしました',
      user: 0,
      birthtime: Date.now() - 3 * 3600 * 1000,
      mtime: Date.now() - 3 * 3600 * 1000,
    },
    {
      id: 'hash-1',
      fileId: 0,
      url,
      message: '英訳文を追加',
      user: 1,
      birthtime: Date.now() - 2 * 3600 * 1000,
      mtime: Date.now() - 2 * 3600 * 1000,
    },
    {
      id: 'hash-2',
      fileId: 0,
      url,
      message: 'レイアウトを修正',
      user: 3,
      birthtime: Date.now() - 3600 * 1000,
      mtime: Date.now() - 3600 * 1000,
    },
  ],
  create: ({ fileId, message }) => ({
    id: `hash-${mockStore.get('commit').length}`,
    fileId,
    url,
    message,
    user: 0,
    birthtime: Date.now(),
    mtime: Date.now(),
  }),
}
