const https = require('https')
const fs = require('fs')

module.exports = (url, dist) =>
  new Promise((resolve, reject) => {
    const outFile = fs.createWriteStream(dist)
    https
      .get(url, res => {
        res.pipe(outFile)

        res.on('end', () => {
          outFile.close()
          resolve()
        })
      })
      .on('error', e => reject(e))
  })
