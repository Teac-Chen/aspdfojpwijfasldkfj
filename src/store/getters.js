const getters = {
  baseURL: state => state.app.baseURL,
  lang: state => state.app.lang,
  token: state => state.user.token,
  user: state => state.user.user,
  name: state => state.user.name,
  permission_info: state => state.user.permission,
  accessedRouters: state => state.user.accessedRouters,
  permission_routers: state => state.user.routers
};
export default getters
