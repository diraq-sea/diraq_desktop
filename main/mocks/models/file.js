import mockStore from '../../store/mock.store'

export default {
  defaultValues: () => [
    {
      id: 0,
      roomId: 0,
      folder: '/folder1',
      name: 'file1',
      extname: 'docx',
      dropped: false, // ファイルドロップによって作成されたか
      birthtime: Date.now() - 3600 * 1000,
      mtime: Date.now() - 3600 * 1000,
    },
  ],
  create: ({ roomId, folder, name, extname, dropped }) => ({
    id: mockStore.get('file').length,
    roomId,
    folder,
    name,
    extname,
    dropped,
    birthtime: Date.now(),
    mtime: Date.now(),
  }),
}
