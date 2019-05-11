export function defaultValues() {
  return [
    {
      email: 'aaa@sample.com',
      roomId: 0,
      token: 'sampletoken',
      inviteetime: Date.now() - 3600 * 1000,
    },
  ]
}

export function create({ email, roomId, token }) {
  return {
    email,
    roomId,
    token,
    inviteetime: Date.now(),
  }
}

export default { defaultValues, create }
