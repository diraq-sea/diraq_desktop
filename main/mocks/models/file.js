import mockStore from '~/store/mock.store'

export function defaultValues() {
  return [
    {
      id: 0,
      roomId: 0,
      folder: '/folder1',
      name: 'file1',
      extname: 'docx',
      dropped: false, // ファイルドロップによって作成されたか
      access: true, // ファイルをユーザーが消したらfalse
      birthtime: Date.now() - 3600 * 1000,
      mtime: Date.now() - 3600 * 1000,
    },
  ]
}

export function create({ roomId, folder, name, extname, dropped, access }) {
  return {
    id: mockStore.get('file').length,
    roomId,
    folder,
    name,
    extname,
    dropped,
    access,
    birthtime: Date.now(),
    mtime: Date.now(),
  }
}

export default { defaultValues, create }
