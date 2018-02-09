require('normalize.css/normalize.css'); // normalize.css 样式格式化
require('element-ui/lib/theme-chalk/index.css');
require('nprogress/nprogress.css');
require('./styles/index.scss');
import 'font-awesome/scss/font-awesome.scss';
import 'assets/iconfont/iconfont';
import 'assets/ztree/metroStyle.css';
import Vue from 'vue';
import router from './router';
import store from './store';
import errLog from 'store/errLog'; // error log组件
import i18n from './locale';
import App from './App.vue';
import ElementUI from 'element-ui';
import NProgress from 'nprogress'; // Progress 进度条
import Permission from './directive/permission';
import * as filters from './filters'; // 自定义 filter
import IconSvg from 'components/Icon-svg';// svg 组件
import IconSprite from 'components/Icon-sprite';// 雪碧图 组件
import './mock/index.js';  // mock 数据模拟
import 'assets/ztree/jquery.ztree.all.min';
import 'assets/ztree/jquery.ztree.exhide.min';
import { getToken } from 'utils/auth';


function initializeVue() {
  // 注册component
  Vue.component('icon-svg', IconSvg);
  Vue.component('d-icon-sprite', IconSprite);
  Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)
  });

  Vue.use(Permission);

  // 注册filter
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  });

  Vue.config.productionTip = false;

  // 生产环境错误日志
  if (process.env.NODE_ENV === 'production') {
    Vue.config.errorHandler = function(err, vm) {
      console.log(err, window.location.href);
      errLog.pushLog({
        err,
        url: window.location.href,
        vm
      })
    };
  }
}

function initializeRoute() {
  // 配置进度条
  const whiteList = ['/login', '/authredirect'];// 不重定向白名单
  router.beforeEach((to, from, next) => {
    NProgress.start(); // 开启Progress
    if (getToken()) { // 判断是否有token
      if (to.path === '/login') {
        next({ path: '/' });
      } else {
        if (store.getters.name === '') {
          // 获取userInfo,失败就清空token返回登录页
          store.dispatch('GetUserInfo').then(() => {
            // 获取permissionInfo,失败就清空token返回登录页
            store.dispatch('GetPermissionMenu').then(() => {
              router.addRoutes(store.getters.accessedRouters);
              next({ ...to });
            }).catch(() => {
              store.dispatch('FedLogOut').then(() => {
                next({ path: '/login' })
              })
            });
          }).catch(() => {
            store.dispatch('FedLogOut').then(() => {
              next({ path: '/login' })
            })
          });
        } else {
          next();
        }
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
        next()
      } else {
        next('/login'); // 否则全部重定向到登录页
        NProgress.done(); // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
      }
    }
  });

  router.afterEach(() => {
    NProgress.done(); // 结束Progress
  });
}


initializeVue();
initializeRoute();
// 获取baseURL
store.dispatch('GetBaseURL').then(() => {
  new Vue({
    el: '#app',
    router,
    store,
    i18n,
    template: '<App/>',
    components: { App }
  })
});




