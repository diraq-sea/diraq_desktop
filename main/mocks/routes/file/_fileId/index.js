import mockStore from '../../../../store/mock.store'
import commitsRoute from './commits'

export default {
  get: ({ fileId }) => ({
    ...mockStore.findById('file', fileId),
    commits: commitsRoute.get({ fileId }),
  }),
}
