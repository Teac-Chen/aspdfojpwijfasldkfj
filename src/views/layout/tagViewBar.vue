<template>
  <div class="tag-view-container">
    <span class="arrow-left" @click="arrowLeft($event)"><i class="el-icon-fa fa-backward"></i></span>
    <div class="scroll-pane-container">
      <scroll-pane>
        <router-link ref='tag' class="tag-view-item" :class="isActive(tag)?'active':''" v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path">
          {{tag.title}}
          <i class="el-icon-fa fa-times-circle" v-if="tag.title !== '首页'" @click.prevent.stop='closeSelectedTag(tag)'></i>
        </router-link>
      </scroll-pane>
    </div>
    <span class="arrow-right" @click="arrowRight($event)"><i class="el-icon-fa fa-forward"></i></span>
    <span class="handle-tags">
      <el-dropdown trigger="click" @command="handleTabs">
        <span class="dropdown-trigger">关闭操作<i class="el-icon-fa fa-caret-down el-icon--right"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="true">关闭全部选项卡</el-dropdown-item>
          <el-dropdown-item :command="false">关闭其他选项卡</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>
  </div>
</template>

<script>
import ScrollPane from 'components/ScrollPane'
export default {
  name: 'TagViewBar',
  components: { ScrollPane },
  data(){
    return {
      selectedTag: {}
    }
  },
  watch: {
    $route(val){
      this.selectedTag = {
        name: val.name,
        path: val.path,
        title: val.meta.title
      }
      this.addViewTags();
    },
    visible(value) {
      if (value) {
        window.addEventListener('click', this.closeMenu)
      } else {
        window.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.addViewTags()
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagView.visitedViews
    }
  },
  methods: {
    generateRoute() {
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    isActive(route) {
      return route.path === this.$route.path || route.name === this.$route.name
    },
    addViewTags() {
      const route = this.generateRoute()
      if (!route) {
        return false
      }
      this.$store.dispatch('addVisitedViews', route)
    },
    arrowLeft(e){
      console.log('arrowLeft');
    },
    arrowRight(e){
      console.log('arrowRight');
    },
    handleTabs(all){
      if(all){
        this.closeAllTags();
      }else{
        this.closeOthersTags();
      }
    },
    closeSelectedTag(view) {
      this.$store.dispatch('delVisitedViews', view).then((views) => {
        if (this.isActive(view)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView.path)
          } else {
            this.$router.push('/')
          }
        }
      })
    },
    closeOthersTags() {
      if(this.$refs.tag.length === 1) return;
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        // this.moveToCurrentTag()
      });
    },
    closeAllTags() {
      if(this.$refs.tag.length === 1) return;
      this.$store.dispatch('delAllViews');
      this.$router.push('/');
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/element-ui.scss";
  @import "src/styles/mixin.scss";
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 2;
    position: fixed;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
  .tag-view-container {
    @include clearfix;
    position: relative;

    .handle-tags,
    .arrow-left,
    .arrow-right {
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
    }

    .arrow-left {
      width: 40px;
      float: left;
      border-right: 1px solid #eee;
    }
    .arrow-right {
      width: 40px;
      float: right;
      border-left: 1px solid #eee;
    }
    .handle-tags {
      float: right;
      border-left: 1px solid #eee;
    }

    .scroll-pane-container{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 40px;
      right: 122px;
    }
  }
  .tag-view-item {
    display: inline-block;
    padding: 0 15px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    border-right: 1px solid #eee;
    float: left;

    &:hover {
      background-color: #f2f2f2;
    }

    &.active {
      border-bottom: 2px solid $Green;
    }

    i {
      color: #ccc;
      &:hover {
        color: #c00;
      }
    }
  }
</style>