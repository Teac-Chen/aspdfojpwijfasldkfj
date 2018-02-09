import { fetchVoData } from 'api';
import { ACCOUNT_URL } from 'api/url';
import { fetchFieldToArray } from 'utils';
import { getToken, setToken, removeToken } from 'utils/auth';
import { constantRouterMap, accessedRouterMap } from 'router';

function hasPermissionKey(route, permissionRouteKeys) {
  if (route.key && route.key !== '') {
    return permissionRouteKeys.indexOf(route.key) >= 0;
  } else {
    return true;
  }
}

function filterPermissionRoute(routeMap, permissionRouteKeys) {
  return routeMap.filter(route => {
    if (hasPermissionKey(route, permissionRouteKeys)) {
      if (route.children && route.children.length) {
        route.children = filterPermissionRoute(route.children, permissionRouteKeys);
      }
      return true;
    }
    return false;
  });
}

const user = {
  state: {
    token: getToken(),
    user: '', // loginName
    name: '', // userName
    permission: [],
    accessedRouters: [],
    routers: constantRouterMap
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_PERMISSION: (state, permission) => {
      state.permission = permission;
    },
    SET_ROUTERS: (state, routers) => {
      state.accessedRouters = routers;
      state.routers = constantRouterMap.concat(routers)
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        const params = {
          name: userInfo.loginName.trim(),
          password: userInfo.password
        };
        fetchVoData(ACCOUNT_URL.LOGIN, params).then(result => {
          const data = result.data;
          setToken(data.token);
          commit('SET_TOKEN', data.token);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        fetchVoData(ACCOUNT_URL.USER_INFO).then(result => {
          commit('SET_NAME', result.data.userName);
          commit('SET_USER', result.data.loginName);
          resolve();
        }).catch(error => reject(error));
      });
    },

    // 获取权限KEY
    GetPermissionMenu({ commit }) {
      return new Promise((resolve, reject) => {
        fetchVoData(ACCOUNT_URL.PERMISSION_INFO).then(result => {
          const _permissionMenu = fetchFieldToArray(result.data.permission, 'permissions');

          // 过滤accessedRouterMap
          const _accessedRouterMap = filterPermissionRoute(accessedRouterMap, _permissionMenu);
          commit('SET_ROUTERS', _accessedRouterMap);
          commit('SET_PERMISSION', _permissionMenu);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        fetchVoData(ACCOUNT_URL.LOGOUT, state.token).then(() => {
          commit('SET_TOKEN', '');
          removeToken();
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
