import mockStore from '~/store/mock.store'

export function defaultValues() {
  return [
    {
      id: 0,
      name: 'diraq',
      email: 'diraq_test@diraq.io',
      icon: '/images/user2.png',
      password: 'hashkasitapasswordwoireru',
    },
  ]
}

export function create({ name, email, password }) {
  return {
    id: mockStore.get('user').length,
    name,
    email,
    icon: '/images/user2.png',
    password, // hash化したパスワードを入れる
  }
}

export default { defaultValues, create }
