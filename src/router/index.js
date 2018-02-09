import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,
// because Lazy Loading large page will cause webpack hot update too slow.
// so only in production use Lazy Loading

Vue.use(Router);

import Layout from '../views/layout/Layout.vue';

/**
 * key: mapper the server route
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the navbar
 * redirect : if `redirect:noredirect` will no redirect in the navbar
 * meta:
 **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('error/404'), meta: { title: '404' }, hidden: true },
  { path: '/401', component: _import('error/401'), meta: { title: '401' }, hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'index',
    meta: { title: '首页' },
    hidden: true,
    children: [
      { key: 'home', name: 'home', path: '/home', component: _import('foqa/home/index'), meta: { title: '首页' }, hidden: true },
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const accessedRouterMap = [{
    path: '/dataSearch',
    name: 'dataSearch',
    meta: { title: '数据查询', icon: 'fa-search' },
    component: Layout,
    children: [
      { key: 'flightSearch', name: 'flightSearch', path: '/flightSearch', component: _import('foqa/dataSearch/flightSearch/index'), meta: { title: '航班查询' } }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];
