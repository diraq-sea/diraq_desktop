// node用 ipcTypes.mjsも同時変更が必要 いずれ統合
module.exports = {
  PRELOGIN: 'prelogin',
  CHECK_LOGIN: 'check-login',
  LOGIN: 'login',
  LOGOUT: 'logout',
  GET_USER_INFO: 'get-user-info',
  GET_AUTH_EMAIL: 'show-auth-email',
  INVITE: 'invite',
  CHECK_WORKING_DIR: 'check-working-dir',
  GET_WORKING_DIR: 'get-working-dir',
  SET_WORKING_DIR: 'set-working-dir',
  FETCH_ROOMS: 'fetch-rooms',
  CREATE_ROOM: 'create-room',
}
