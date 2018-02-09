<template>
  <el-dropdown trigger="click">
    <span class="dropdown-trigger" style="padding: 0 6px;"><i class="el-icon-fa fa-bell"></i></span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>修改头像</el-dropdown-item>
      <el-dropdown-item>个人资料</el-dropdown-item>
      <el-dropdown-item divided>安全退出</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  export default {
    name: 'NoticeDropdown',
    data() {
      return {
      }
    },
    computed: {
    },
    methods: {
    }
  }
</script>
