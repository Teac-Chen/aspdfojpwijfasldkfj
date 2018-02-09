<template>
  <div class="headerbar-container">
    <div class="header-left">
      <span class="trigger" @click="trigger"><i class="el-icon-fa fa-bars"></i></span>
    </div>
    <div class="nav-container">
      <tag-view-bar />
    </div>
    <div class="header-right">
      <span class="notice"><notice-dropdown /></span>
      <span>
        <el-dropdown trigger="click" @command="handleUsers">
          <span class="dropdown-trigger"><i class="el-icon-fa fa-user"></i> 欢迎，{{name}}<i class="el-icon-fa fa-caret-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改头像</el-dropdown-item>
            <el-dropdown-item>个人资料</el-dropdown-item>
            <el-dropdown-item divided command="logout">安全退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import NoticeDropdown from './noticeDropdown.vue';
  import TagViewBar from './tagViewBar.vue';

  export default {
    name: 'HeaderBar',
    components: {
      NoticeDropdown,
      TagViewBar
    },
    props: {
      collapse: Boolean
    },
    data() {
      return {
        isCollapse: this.collapse
      }
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    methods: {
      trigger(){
        this.isCollapse = !this.isCollapse;
        this.$emit('update:collapse', this.isCollapse);
      },
      handleUsers(type){
        switch(type){
          case 'logout':
            this.logout();
            break;
          default :
            console.log('handle !!');
            break;
        }
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload();
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  .headerbar-container {
    height: 42px;
    background-color: #fafafa;
    border-bottom: 2px solid #e2e6e5;
    color: #999;
    display: table;
    border-collapse: separate;

    & > div {
      display: table-cell;

      & > span {
        display: inline-block;
        height: 100%;
        text-align: center;
        line-height: 40px;
        background-color: #fff;
        cursor: pointer;
        padding: 0px 6px;
        font-size: 14px;

        &:hover {
          background-color: #f2f2f2;
        }

        & + span {
          border-left: 1px solid #eee;
        }
      }
      .notice,
      .trigger {
        width: 40px;
      }
    }
    .header-left {
      width: 1%;
      position: relative;
      font-size: 0;
      white-space: nowrap;
      vertical-align: middle;
      border-right: 1px solid #eee;
    }
    .header-right {
      width: 1%;
      position: relative;
      font-size: 0;
      white-space: nowrap;
      vertical-align: middle;
      border-left: 1px solid #eee;
    }
    .nav-container {
      width: 100%;
    }

  }

</style>
