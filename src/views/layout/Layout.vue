<template>
	<div class="app-wrapper">
    <sider-bar :collapse="isCollapse" />
		<div :class="mainClass">
      <app-main />
      <header-bar :collapse.sync="isCollapse" />
      <footer-bar />
		</div>
	</div>
</template>

<script>
  import { SiderBar, HeaderBar, FooterBar, AppMain } from 'views/layout';

  export default {
    name: 'layout',
    components: {
      SiderBar,
      HeaderBar,
      FooterBar,
      AppMain
    },
    data(){
      return {
        isCollapse: false,
        mainClass: 'main-container'
      }
    },
    watch: {
      isCollapse(val){
        this.mainClass = val ?
          'main-container is-collapse' :
          'main-container'
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
	@import "src/styles/mixin.scss";
  body {
    background: #f3f3f4;
  }
	.app-wrapper {
		@include clearfix;
		position: relative;
		height: 100vh;
		width: 100%;

		.main-container {
      margin-left: 220px;
			min-height: 100%;
      position: relative;
			transition: margin-left 0.28s ease-out;

      &.is-collapse {
        margin-left: 64px;
      }
		}
	}
</style>
