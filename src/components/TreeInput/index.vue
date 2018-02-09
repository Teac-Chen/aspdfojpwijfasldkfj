<template>
  <div class="tree-input" v-clickoutside="handleClose">
    <el-input
      ref="reference"
      :class="{ 'is-focus': visible }"
      :size="size"
      v-model="selectLabel"
      :placeholder="placeholder"
      :readonly="!filterable || multiple"
      :disabled="disabled"
      @input="handleSearch"
      @focus="handleFocus"
      @mousedown.native="handleMouseDown"
      @mouseenter.native="inputHovering = true"
      @mouseleave.native="inputHovering = false"
    >
      <i
        slot="suffix"
        v-show="inputHovering && value"
        class="el-select__caret el-input__icon el-icon-circle-close clear"
        @click="handleIconClick"
      ></i>
    </el-input>
    <transition name="el-zoom-in-top">
      <tree-dropdown
        ref="popper"
        v-show="visible"
        :data="data"
        :multiple="multiple"
        :unselect="unselect"
        :id="id"
      />
    </transition>
  </div>
</template>

<script>
import TreeDropdown from './tree-dropdown';
import Clickoutside from 'element-ui/src/utils/clickoutside';
import Emitter from 'element-ui/src/mixins/emitter';
import { debounce } from 'utils';

export default {
  name: 'tree-input',
  componentName: 'TreeInput',
  components: { TreeDropdown },
  directives: { Clickoutside },
  mixins: [Emitter],
  props: {
    value: String,
    placeholder: String,
    size: String,
    disabled: Boolean,
    filterable: Boolean,
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    data: Array,
    unselect: [Array, Number],
    id: {
      required: true,
      type: String
    }
  },
  data(){
    return {
      visible: false,
      inputWidth: 0,
      timeout: null,
      inputHovering: false,
      selectLabel: '',
      rootName: ''
    }
  },
  watch: {
    visible(val){
      if(val){
        this.broadcast('TreeDropdown', 'updatePopper');
        if (this.filterable) {
          this.broadcast('ElInput', 'inputSelect');
          this.cacheNode = {
            name: this.nodeName,
            value: this.value
          };
        }
      }else{
        this.$refs.reference.$el.querySelector('input').blur();
        this.broadcast('TreeDropdown', 'destroyPopper');
        this.broadcast('ZtreeVue', 'handleReset', this.value);
        if (this.cacheNode.value === this.value) {
          this.selectLabel = this.cacheNode.name;
        }
      }
    },
    data() {
      this.selectLabel = this.rootName = this.nodeName;
    }
  },
  computed: {
    allNodes(){
      return this.getAllNodes(this.data);
    },
    nodeName() {
      let name = '';

      this.allNodes.some(node => {
        if (node.value === this.value){
          name = node.name;

          return true;
        }
        return false;
      });

      return name;
    }
  },
  created() {
    this.$on('handleNodeClick', this.handleNodeClick);
  },
  mounted(){
    this.selectLabel = this.rootName = this.nodeName;
    this.$nextTick(() => {
      if (this.$refs.reference && this.$refs.reference.$el) {
        this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
      }
    });
  },
  beforeDestroy(){
  },
  methods: {
    handleFocus(){
      this.visible = true;
      this.$emit('focus', event);
    },
    handleClose(){
      this.visible = false;
    },
    handleMouseDown(event) {
      if (event.target.tagName !== 'INPUT') return;
      if (this.visible) {
        this.handleClose();
        event.preventDefault();
      }
    },
    handleSearch(value){
      this.searchKey = value;
      if(this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        this.broadcast('ZtreeVue', 'handleFilter', value);
      }, 100);
    },
    handleNodeClick({e, treeNode}){
      this.$emit('input', treeNode.value);
      this.selectLabel = treeNode.name;
      this.visible = false;
    },
    handleIconClick(){
      const l = this.data.length;
      if (l > 1) {
        this.$emit('input', '');
      } else {
        this.$emit('input', this.data[0].value);
      }

      this.selectLabel = this.rootName;

      this.broadcast('ZtreeVue', 'handleClear', this);
    },
    getAllNodes(data, nodeList = []){
      if (data && data.length > 0) {
        nodeList = nodeList.concat(data);
        data.map(node => {
          if (node.children && node.children.length > 0) {
            nodeList = this.getAllNodes(node.children, nodeList);
          }
        });
      }

      return nodeList;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tree-input {
  position: relative;
  display: inline-block;
}

.clear:hover {
  color: #909399;
  cursor: pointer;
}
</style>
