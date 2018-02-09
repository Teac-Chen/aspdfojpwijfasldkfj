export default {
  login: () => ({
    code: 0,
    data: {
      token: 'abc'
    },
    msg: 'successful!'
  }),
  getUserInfo: () => ({
    code: 0,
    data: {
      userName: '超级管理员',
      loginName: 'admin'
    },
    msg: 'success'
  }),
  getPermissionMenu: () => ({
    code: 0,
    data: {
      permission: [
        { permissions: 'home' },
        { permissions: 'flightSearch' }
      ]
    },
    msg: 'success'
  }),
  logout: () => ({
    code: 0,
    msg: 'success'
  })
};
