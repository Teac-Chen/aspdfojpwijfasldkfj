import store from 'store';

const vuePermission = {};
vuePermission.install = function(Vue) {
  const hasPermissionMenu = permissionKey => {
    const permissionMenu = store.getters.permission_info;
    return permissionMenu.indexOf(permissionKey) >= 0;
  }

  // 添加全局权限指令
  /*
   * usage:
   * <el-button type="primary" v-has-permission="actualBenefit:getYearReport"></el-button>
   * */
  Vue.directive('has-permission', {
    inserted(el, binding) {
      if (!hasPermissionMenu(binding.value)) {
        el.parentNode.removeChild(el);
      }
    }
  })
}

export default vuePermission;
