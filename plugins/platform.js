import platform from '~/common/platform'

export default (context, inject) => {
  inject('platform', platform)
}
