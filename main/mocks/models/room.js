import mockStore from '../../store/mock.store'

export default {
  defaultValues: () => [
    {
      id: 0,
      name: 'test1',
      owner: 0,
      birthtime: Date.now() - 3600 * 1000,
      mtime: Date.now() - 3600 * 1000,
    },
  ],
  create: ({ name }) => ({
    id: mockStore.get('room').length,
    name,
    owner: 0,
    birthtime: Date.now(),
    mtime: Date.now(),
  }),
}
