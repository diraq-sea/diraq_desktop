export default async function getEntryList(entrys, endPath, absoluteFliePath) {
  let listEntry = []
  for (let i = 0; i < entrys.length; i++) {
    let entry
    if (entrys[i][Symbol.toStringTag] === 'DataTransferItem') {
      entry = entrys[i].webkitGetAsEntry()
    } else {
      entry = entrys[i]
    }

    if (entry.isFile) {
      const isHiddenFile = entry.name.slice(0, 1) === '.'

      if (!isHiddenFile) {
        listEntry.push({ name: entry.name, path: absoluteFliePath + entry.fullPath, endPath })
      }
    } else if (entry.isDirectory) {
      const reader = entry.createReader()
      const getEntries = () =>
        new Promise(resolve => {
          reader.readEntries(async function(entries) {
            resolve([
              ...listEntry,
              ...(await getEntryList(entries, endPath + '/' + entry.name, absoluteFliePath)),
            ])
          })
        })
      listEntry = await getEntries()
    }
  }

  return listEntry
}
