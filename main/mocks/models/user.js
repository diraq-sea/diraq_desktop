import mockStore from '~/store/mock.store'

export function defaultValues() {
  return [
    {
      id: 0,
      name: 'diraq0',
      email: 'diraq_test@diraq.io',
      icon: '/images/user2.png',
      password: 'hashkasitapasswordwoireru',
    },
    {
      id: 1,
      name: 'diraq1',
      email: 'diraq_test_1@diraq.io',
      icon: '/images/user2.png',
      password: 'hashkasitapasswordwoireru',
    },
    {
      id: 2,
      name: 'diraq2',
      email: 'diraq_test_2@diraq.io',
      icon: '/images/user2.png',
      password: 'hashkasitapasswordwoireru',
    },
    {
      id: 3,
      name: 'diraq3',
      email: 'diraq_test_3@diraq.io',
      icon: '/images/user2.png',
      password: 'hashkasitapasswordwoireru',
    },
    {
      id: 4,
      name: 'diraq4',
      email: 'diraq_test_4@diraq.io',
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
