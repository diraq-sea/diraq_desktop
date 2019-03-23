import fs from 'fs'
import path from 'path'
import writeFileIfNotExists from '../utils/writeFileIfNotExists'
import { MOCK_FILE, MOCK_VERSION } from '../const'

let mock = {}

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
      await Promise.all(
        fs.readdirSync(path.join(__dirname, '../mocks/models')).map(filename =>
          (async () => {
            mock[
              filename.replace('.js', '')
            ] = (await import(`../mocks/models/${filename}`)).default.defaultValues()
          })(),
        ),
      )
    }
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
}
