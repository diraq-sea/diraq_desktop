import moment from 'moment-timezone'

moment.tz.setDefault('Asia/Tokyo')

export default (context, inject) => {
  inject('moment', moment)
}
