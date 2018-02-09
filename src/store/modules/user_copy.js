import { fetchData, fetchVoData } from 'api';
import { ACCOUNT_URL } from 'api/url';
import { getToken, setToken, removeToken, getUserKey, setUserKey, removeUserKey } from 'utils/auth';

const user = {
  state: {
    token: getToken(),
    user: getUserKey(),
    name: '',
    roles: []
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
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        const user = {
          userCode: userInfo.loginName.trim(),
          userPwd: userInfo.password
        };
        const query = {
          bodyCrypt: JSON.stringify(user),
          crcCheck: 'crc'
        }
        fetchData(ACCOUNT_URL.LOGIN, query).then(result => {
          const bodyCrypt = JSON.parse(result.bodyCrypt);

          if(bodyCrypt.code === 1){

            setToken(bodyCrypt.data['x-token']);

            commit('SET_TOKEN', bodyCrypt.data['x-token']);
            commit('SET_USER', bodyCrypt.data.user.userCode.trim());
            commit('SET_NAME', bodyCrypt.data.user.userName.trim());
            resolve();
          }else{
            reject(bodyCrypt.msg);
          }
          // setToken(result.token);
          // commit('SET_TOKEN', result.token);
          // commit('SET_USER', userInfo.loginName.trim()); // 注：因为登录后没返回用户，故暂时用input的。后期删掉
          // commit('SET_NAME', userInfo.loginName.trim());
          // resolve();

          // setToken(data.token);
          // setUserKey(userInfo.loginName.trim());
          // commit('SET_TOKEN', data.token);
          // commit('SET_USER', userInfo.loginName.trim()); // 注：因为登录后没返回用户，故暂时用input的。后期删掉
          // commit('SET_NAME', userInfo.loginName.trim());
          
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        fetchData(ACCOUNT_URL.INFO, { loginName: state.user }).then(result => {
          commit('SET_USER', result.data.user.loginName);
          commit('SET_NAME', result.data.user.loginName);
          commit('SET_ROLES', result.data.menus);
          resolve(result);
        }).catch(error => {console.log('==GetInfo is defeated!==', error);reject(error)});
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        fetchData(ACCOUNT_URL.LOGOUT, state.token).then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          removeToken();
          removeUserKey(); // 注意
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
        removeUserKey();
        resolve();
      });
    },

    // 动态修改权限
    ChangeRole({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_ROLES', [role]);
        commit('SET_TOKEN', role);
        setToken(role);
        resolve();
      })
    }
  }
};

export default user;
