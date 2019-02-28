const http = require('http')
const fs = require('fs')

module.exports = (url, dist) =>
  new Promise((resolve, reject) => {
    const outFile = fs.createWriteStream(dist)
    console.log(url, dist) // eslint-disable-line

    http
      .get(url, res => {
        res.pipe(outFile)
        console.log(444444) // eslint-disable-line

        res.on('end', () => {
          console.log(66666) // eslint-disable-line
          outFile.close()
          resolve()
        })
      })
      .on('error', e => reject(e))
  })
