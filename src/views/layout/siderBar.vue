<template>
  <div :class="containerClass">
    <div class="logo">飞行品质监控系统</div>
    <el-menu :collapse="collapse" :default-active="$route.path" >
      <template v-for="(menu, index) in permission_routers">
        <el-submenu :index="menu.path" v-if="!menu.hidden && menu.children.length>0">
          <template slot="title">
            <i class="el-icon-fa" :class="menu.meta.icon"></i>
            <span slot="title">{{ menu.meta.title }}</span>
          </template>
          <template v-for="(child, index) in menu.children">
            <router-link :to="child.path">
              <el-menu-item :index="child.path" v-if="!child.hidden">{{ child.meta.title }}</el-menu-item>
            </router-link>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'Siderbar',
    props: {
      collapse: Boolean
    },
    data() {
      return {
        containerClass: 'siderbar-container'
      }
    },
    computed: {
      ...mapGetters([
        'permission_routers'
      ])
    },
    watch: {
      collapse(val){
        this.containerClass = val ?
          'siderbar-container is-collapse' :
          'siderbar-container'
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  .siderbar-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 220px;
    background-color: #fff;
    transition: width 0.28s ease-out;
    z-index: 1999;

    .logo {
      height: 168px;
      background-color: #23272D;
      transition: all 0.28s ease-out;
      color: #fff;
      font-size: 24px;
      line-height: 168px;
      text-align: center;
    }

    &.is-collapse{
      width: 64px;

      .logo {
        height: 64px;
        background-color: pink;
      }
    }
  }
</style>
