import mockStore from '../../store/mock.store'

export default {
  defaultValues: () => [
    {
      id: 0,
      roomId: 0,
      folder: '/folder1',
      name: 'file1',
      extname: 'docx',
      birthtime: Date.now() - 3600 * 1000,
      mtime: Date.now() - 3600 * 1000,
    },
  ],
  create: ({ roomId, folder, name, extname }) => ({
    id: mockStore.get('file').length,
    roomId,
    folder,
    name,
    extname,
    birthtime: Date.now(),
    mtime: Date.now(),
  }),
}
