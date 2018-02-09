import axios from 'axios';
import { Message } from 'element-ui';
import store from '../store';
import { parseTime, aesEncrypt, aesDecrypt } from 'utils';

axios.interceptors.request.use(
  config => {
    if (store.getters.token) {
      const decrypted = aesDecrypt(store.getters.token);
      config.headers['X-Token'] = aesEncrypt(decrypted + ',' + parseTime(Date.now(), '{y}{m}{d}{h}{i}{s}'));
    }
    return config;
  },
  error => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response拦截器
axios.interceptors.response.use(
  response => {
    const result = response.data;
    const reqConfig = response.config;
    let requestURL = reqConfig.url;

    // 校验请求是否为本地配置文件
    if (requestURL.indexOf('config.properties') > -1) {
      return result;
    }

    // No permission
    if (response.headers.exceptioncode === '4') {
      requestURL = requestURL.replace(reqConfig.baseURL, '');
      console.log(requestURL + '没有权限,请联系管理员!');
      Promise.reject(response.headers.exceptionmessage);
    }

    // Session time out
    if (response.headers.exceptioncode === '5') {
      store.dispatch('FedLogOut').then(() => {
        location.reload();
      });
    }

    if (result.code === 0) { // success
      return result;
    } else {
      return Promise.reject(result.msg);
    }
  },
  error => {
    console.log('err' + error); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default axios;
