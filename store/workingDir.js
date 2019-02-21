import { CHECK_WORKING_DIR, SET_WORKING_DIR } from '../common/ipcTypes'

export const actions = {
  checkHaving() {
    return this.$ipc(CHECK_WORKING_DIR)
  },
  setDirPath(store, dirPath) {
    return this.$ipc(SET_WORKING_DIR, dirPath)
  },
}
