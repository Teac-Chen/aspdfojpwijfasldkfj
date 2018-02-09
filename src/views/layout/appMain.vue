<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagView.cachedViews
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  .app-main {
    position: absolute;
    top: 42px;
    bottom: 36px;
    left: 0;
    right: 0;
    overflow: auto;
    padding: 10px;
  }

</style>