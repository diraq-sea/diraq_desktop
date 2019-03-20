import MockAdapter from 'axios-mock-adapter'
import fs from 'fs'
import path from 'path'
import mockStore from '../store/mock.store'

const listFiles = dirpath => {
  const list = []
  fs.readdirSync(dirpath).forEach(name => {
    const target = path.join(dirpath, name)
    list.push(...(fs.statSync(target).isFile() ? [target] : listFiles(target)))
  })
  return list
}

const createParams = (relativePath, dirPath) => {
  const params = {}
  const dirList = relativePath.split('/')

  dirPath
    .slice(1)
    .split('/')
    .forEach((dir, i) => {
      if (/^_/.test(dirList[i])) {
        params[dirList[i].slice(1)] = /^\d+$/.test(dir) ? +dir : dir
      }
    })

  return params
}

export default async client => {
  const mock = new MockAdapter(client, { delayResponse: 200 })
  mockStore.init()

  await Promise.all(
    listFiles(path.join(__dirname, 'routes')).map(filePath =>
      (async () => {
        const relativePath = filePath
          .replace(/\\/g, '/')
          .match(/^main\/mocks\/routes\/(.+?)\.js$/)[1]
        const { default: route } = await import(`./routes/${relativePath}`)

        if (/\/_/.test(relativePath)) {
          const regPath = new RegExp(relativePath.replace(/\/_[^/]+/g, '/[^/]+'))

          if (route.get) {
            mock
              .onGet(regPath)
              .reply(({ url, baseURL }) => [
                200,
                route.get(createParams(relativePath, url.replace(baseURL, ''))),
              ])
          }

          if (route.post) {
            mock.onPost(regPath).reply(({ url, baseURL, data }) => {
              const value = route.post(
                JSON.parse(data),
                createParams(relativePath, url.replace(baseURL, '')),
              )
              if (route.getAll) mockStore.set(relativePath, route.getAll())
              return [204, value]
            })
          }
        } else {
          if (route.get) mock.onGet(relativePath).reply(() => [200, route.get()])
          if (route.post) {
            mock.onPost(relativePath).reply(({ data }) => {
              const value = route.post(JSON.parse(data))
              if (route.getAll) mockStore.set(relativePath, route.getAll())
              return [204, value]
            })
          }
        }

        const savedData = mockStore.get(relativePath)
        if (route.setAll && savedData) route.setAll(savedData)
      })(),
    ),
  )

  mock.onAny().passThrough()
}
