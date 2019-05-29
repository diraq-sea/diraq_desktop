import fs from 'fs'
import path from 'path'
import ngrok from 'ngrok'
import writeFileIfNotExists from '../utils/writeFileIfNotExists'
import { MOCK_FILE, MOCK_VERSION, WINDOW_ORIGIN } from '../const'

let mock = {}
let proxyUrl = null

function save() {
  fs.writeFileSync(MOCK_FILE, JSON.stringify({ version: MOCK_VERSION, data: mock }))
}

export default {
  async init() {
    writeFileIfNotExists(MOCK_FILE, {})
    const mockJson = JSON.parse(fs.readFileSync(MOCK_FILE))

    if (mockJson.version === MOCK_VERSION) {
      mock = mockJson.data
    } else {
      const mockModelDirPath = path.join(__dirname, '../mocks/models')
      const regex = /\.js$/

      const mockModelFiles = fs
        .readdirSync(mockModelDirPath)
        .filter(file => fs.statSync(path.join(mockModelDirPath, file)).isFile() && regex.test(file))

      await Promise.all(
        mockModelFiles.map(async file => {
          const { defaultValues } = await import(`../mocks/models/${file}`) // Dynamic import ですべて変数のパスは不可
          mock[file.replace(regex, '')] = defaultValues()
        }),
      )
    }

    proxyUrl = await ngrok.connect(+WINDOW_ORIGIN.split(':').pop())
  },
  get proxyUrl() {
    return proxyUrl
  },
  get: modelName => mock[modelName],
  findById: (modelName, id) => mock[modelName].find(data => data.id === id),
  findByKey: (modelName, key, val) => mock[modelName].find(data => data[key] === val),
  filterByKey: (modelName, key, val) => mock[modelName].filter(data => data[key] === val),
  filterByKeyFromArray: (modelName, key, val) =>
    mock[modelName].filter(data => data[key].includes(val)),
  add(modelName, data) {
    mock[modelName].push(data)
    save()
    return data
  },
  update(modelName, newData) {
    mock[modelName] = mock[modelName].map(data => (data.id === newData.id ? newData : data))
    save()
    return newData
  },
  deleteById(modelName, id) {
    const dataId = mock[modelName].findIndex(data => data.id === id)
    mock[modelName].splice(dataId, 1)
    save()
    return mock
  },
}
