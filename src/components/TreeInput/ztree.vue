<template>
  <div>
    <ul :id="id" ref="ztree" class="ztree" v-show="!showEmpty"></ul>
    <p class="el-select-dropdown__empty" v-show="showEmpty">{{emptyText}}</p>
  </div>
</template>

<script>
export default {
  name: 'ZtreeVue',
  componentName: 'ZtreeVue',

  props: {
    data: {
      type: Array,
      default: () => ([])
    },
    unselect: [Array, Number],
    emptyText: {
      type: String,
      default: '无匹配数据'
    },
    id: String
  },
  data(){
    return {
      ztreeObj: null,
      allNodes: [],
      showEmpty: false
    }
  },
  computed: {
    setting(){
      const _this = this;
      const setting = {
        callback: {
          onClick(e, treeId, treeNode) {
            _this.$emit('nodeClick', e, treeId, treeNode);
          }
        }
      };

      if(this.unselect !== undefined){
        if(this.unselect.some){
          setting.callback.beforeClick = (treeId, treeNode) => {
            if(this.unselect.some(level => (level === treeNode.level))) return false;

            return true;
          }
        }else{
          setting.callback.beforeClick = (treeId, treeNode) => {
            if(treeNode.level == this.unselect) return false;

            return true;
          }
        }
      }

      return setting;
    }
  },
  watch: {
    data(newval){
      this.handleInit(newval);
    }
  },
  created(){
    this.$on('handleFilter', this.handleFilter);
    this.$on('handleClear', this.handleClear);
    this.$on('handleReset', this.handleReset);
  },
  mounted(){
    this.handleInit(this.data);
  },
  methods: {
    handleInit(data){
      this.ztreeObj && this.ztreeObj.destroy();
      this.showEmpty = false;

      if (data.length === 0) {
        this.showEmpty = true;
      } else {
        this.ztreeObj = $.fn.zTree.init($(this.$refs.ztree), this.setting, data);
        this.allNodes = this.ztreeObj.transformToArray(this.ztreeObj.getNodes());
      }
    },
    handleFilter(value) {
      if (this.data.length === 0) return;

      if (value === '') {
        this.handleReset();
      } else {
        this.showEmpty = false;
        this.ztreeObj.hideNodes(this.allNodes);

        const filterList = this.allNodes.filter(node => {
          if (this.unselect !== undefined && (this.unselect.some ? this.unselect.some(level => (level === node.level)) : (this.unselect === node.level))) return false;

          if (node.name.indexOf(value) > -1) return true;

          return false;
        });

        if (filterList.length === 0) {
          this.showEmpty = true;
          return false;
        }

        filterList.forEach(node => {
          const thisNodeParents = this.getAllParent(node);
          thisNodeParents.forEach(parent => {
            this.ztreeObj.showNode(parent);
            this.ztreeObj.expandNode(parent, true, false, false);
          });
          this.ztreeObj.showNode(node);
        });
      }
    },
    handleClear() {
      const selectNodes = this.ztreeObj.getSelectedNodes();

      if (selectNodes.length > 0) {
        selectNodes.forEach(node => {
          this.ztreeObj.cancelSelectedNode(node);
        })
      }
    },
    handleReset(value) {
      if (this.data.length === 0) return;

      this.ztreeObj.showNodes(this.allNodes);
      const rootNodes = this.allNodes.filter(node => (node.level === 0));
      const secondNodes = this.allNodes.filter(node => (node.level === 1));

      rootNodes.forEach(node => {
        this.ztreeObj.expandNode(node, true, false, false);
      });

      secondNodes.forEach(node => {
        this.ztreeObj.expandNode(node, false, true, false);
      });

      this.showEmpty = false;

      if (value !== undefined) {
        const selectNode = this.allNodes.filter(node => (
          node.value === value &&

          //判断节点是否在禁选层级
          !(this.unselect !== undefined &&
            this.unselect.some ?
            this.unselect.some(level => (level === node.level)) :
            (this.unselect === node.level)
          )
        ))[0];

        if (selectNode) {
          this.getAllParent(selectNode).forEach(node => {
            this.ztreeObj.expandNode(node, true, false, false);
          });
          this.ztreeObj.selectNode(selectNode);
        }
      }
    },
    getAllParent(node, nodeList = []) {
      const parentNode = node.getParentNode();
      if (parentNode) {
        nodeList.push(parentNode);
        return this.getAllParent(parentNode, nodeList);
      } else {
        return nodeList;
      }
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
