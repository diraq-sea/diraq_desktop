export function defaultValues() {
  return [
    {
      name: 'Kento Ueda',
      email: 'diraq@diraq.io',
      registtime: Date.now() - 3600 * 1000,
    },
  ]
}

export function create({ name, email }) {
  // inviteの情報に一致するか確かめてから
  return {
    name,
    email,
    registtime: Date.now(),
  }
}

export default { defaultValues, create }
