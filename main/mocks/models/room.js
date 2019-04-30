import mockStore from '~/store/mock.store'

export function defaultValues() {
  return [
    {
      id: 0,
      name: 'test1',
      owner: 0,
      birthtime: Date.now() - 3600 * 1000,
      mtime: Date.now() - 3600 * 1000,
    },
  ]
}

export function create({ name }) {
  return {
    id: mockStore.get('room').length,
    name,
    owner: 0,
    birthtime: Date.now(),
    mtime: Date.now(),
  }
}

export default { defaultValues, create }
