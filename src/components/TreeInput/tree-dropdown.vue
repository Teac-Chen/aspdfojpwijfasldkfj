<template>
  <div
    class="tree-container el-popper"
    :class="[{ 'is-multiple': $parent.multiple }, popperClass]"
    :style="{ minWidth: minWidth + 'px' }"
  >
    <el-scrollbar
      tag="ul"
      wrap-class="el-select-dropdown__wrap"
      view-class="el-select-dropdown__list"
      ref="scrollbar"
    >
      <ztree-vue ref="ztree" :id="id" :data="data" :unselect="unselect" @nodeClick="handleNodeClick" />
    </el-scrollbar>
  </div>
</template>

<script>
import Popper from './vue-popper';
import Emitter from 'element-ui/src/mixins/emitter';
import ztreeVue from './ztree';

export default {
  name: 'TreeDropdown',
  componentName: 'TreeDropdown',

  mixins: [Popper, Emitter],
  components: {ztreeVue},
  props: {
    data: Array,
    placement: {
      default: 'bottom-start'
    },
    boundariesPadding: {
      default: 0
    },

    popperOptions: {
      default() {
        return {
          gpuAcceleration: false
        };
      }
    },

    visibleArrow: {
      default: true
    },
    unselect: [Array, Number],
    id: String
  },
  data(){
    return {
      minWidth: 0
    }
  },
  computed: {
    popperClass() {
      return this.$parent.popperClass;
    }
  },
  watch: {
    '$parent.inputWidth'() {
      this.minWidth = this.$parent.$refs.reference.$el.getBoundingClientRect().width;
    }
  },
  mounted(){
    this.referenceElm = this.$parent.$refs.reference.$el;
    this.$parent.popperElm = this.popperElm = this.$el;
    this.$on('updatePopper', () => {
      if (this.$parent.visible) this.updatePopper();
    });
    this.$on('destroyPopper', this.destroyPopper);
  },
  methods: {
    handleNodeClick(e, treeId, treeNode) {
      this.dispatch('TreeInput', 'handleNodeClick', {e, treeId, treeNode});
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tree-container {
  position: absolute;
  z-index: 1001;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 5px 0;
}
</style>
