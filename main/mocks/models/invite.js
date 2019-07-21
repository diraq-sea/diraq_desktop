export function defaultValues() {
  return [
    {
      email: 'aaa@sample.com',
      roomId: 0,
      inviteetime: Date.now() - 3600 * 1000,
    },
  ]
}

export function create({ email, roomId }) {
  return {
    email,
    roomId,
    inviteetime: Date.now(),
  }
}

export default { defaultValues, create }
