export function defaultValues() {
  return [
    {
      name: 'Kento Ueda',
      email: 'diraq@diraq.io',
      icon: '/images/user2.png',
      registtime: Date.now() - 3600 * 1000,
    },
  ]
}

export function create({ name, email }) {
  return {
    name,
    email,
    icon: '/images/user3.png',
    registtime: Date.now(),
  }
}

export default { defaultValues, create }
