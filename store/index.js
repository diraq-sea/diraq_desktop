import { ipcRenderer } from 'electron'
const localPlugin = store => {
  ipcRenderer.on('tmpfile_observing', (event, arg) => {
    console.log(arg) // eslint-disable-line
  })
}
export const plugins = [localPlugin]
