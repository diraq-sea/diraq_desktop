import fs from 'fs'
import path from 'path'
import MockAdapter from 'axios-mock-adapter'
import mockStore from '../store/mock.store'
import { MOCK_FILES_DIR } from '../const'
import mkdirIfNotExists from '../utils/mkdirIfNotExists'
import { defaultValues } from './models/commit'

const listFiles = dirpath => {
  const list = []
  fs.readdirSync(dirpath).forEach(name => {
    const target = path.join(dirpath, name)
    list.push(...(fs.statSync(target).isFile() ? [target] : listFiles(target)))
  })
  return list
}

const createParams = (relativePath, url, baseURL) => {
  const params = {}
  const dirList = relativePath.split('/')

  url
    .replace(baseURL, '')
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

  mkdirIfNotExists(MOCK_FILES_DIR)
  defaultValues()
    .slice(1)
    .forEach(commit =>
      fs.copyFileSync(
        path.join(__dirname, './assets/sample.docx'),
        path.join(MOCK_FILES_DIR, `${commit.id}.docx`),
      ),
    )

  await mockStore.init()

  await Promise.all(
    listFiles(path.join(__dirname, 'routes')).map(filePath =>
      (async () => {
        const relativePath = filePath
          .replace(/\\/g, '/')
          .match(/^main\/mocks\/routes\/(.+?)(\/index)?\.js$/)[1]
        const { default: route } = await import(`./routes/${relativePath}`)

        if (/\/_/.test(relativePath)) {
          const regPath = new RegExp(`${relativePath.replace(/\/_[^/]+/g, '/[^/]+')}$`)

          if (route.get) {
            mock
              .onGet(regPath)
              .reply(({ url, baseURL }) => [
                200,
                route.get(createParams(relativePath, url, baseURL)),
              ])
          }

          if (route.post) {
            mock
              .onPost(regPath)
              .reply(({ url, baseURL, data }) => [
                204,
                route.post(JSON.parse(data), createParams(relativePath, url, baseURL)),
              ])
          }

          if (route.put) {
            mock
              .onPut(regPath)
              .reply(({ url, baseURL, data }) => [
                204,
                route.put(JSON.parse(data), createParams(relativePath, url, baseURL)),
              ])
          }

          if (route.delete) {
            mock
              .onDelete(regPath)
              .reply(({ url, baseURL, data }) => [
                204,
                route.delete(JSON.parse(data), createParams(relativePath, url, baseURL)),
              ])
          }
        } else {
          if (route.get) mock.onGet(relativePath).reply(() => [200, route.get()])

          if (route.post) {
            mock.onPost(relativePath).reply(({ data }) => [204, route.post(JSON.parse(data))])
          }

          if (route.put) {
            mock.onPut(relativePath).reply(({ data }) => [204, route.put(JSON.parse(data))])
          }

          if (route.delete) {
            mock.onDelete(relativePath).reply(({ data }) => [204, route.delete(JSON.parse(data))])
          }
        }
      })(),
    ),
  )

  mock.onAny().passThrough()
}
