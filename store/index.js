import { ipcRenderer } from 'electron'
import { TMPFILE_OBSERVING } from '../common/ipcToWindowTypes'

export const plugins = [
  () => {
    ipcRenderer.on(TMPFILE_OBSERVING, (event, arg) => {
      console.log(arg) // eslint-disable-line
    })
  },
]
