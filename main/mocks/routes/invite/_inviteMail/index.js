import mockStore from '../../../../store/mock.store'

export default {
  get: ({ inviteMail }) => mockStore.findByKey('user', 'email', inviteMail).id,
}
