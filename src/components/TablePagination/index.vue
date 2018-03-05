<template>
  <div class="table-pagination">
    <el-table
      ref="table"
      :data="showList"
      :max-height="height"
      class="table-list"
      stripe
      header-row-class-name="table-list-header"
      row-class-name="table-list-body"
      style="width: 100%"
      :highlight-current-row="highlightCurrentRow"
      @sort-change="sortChange"
      @row-click="rowClick"
    >
      <slot></slot>
    </el-table>
    <el-pagination
      v-if="total > 0"
      style="margin-top: 5px;"
      background
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :layout="layout"
      :total="total"
      @current-change="currentChange"
      @size-change="sizeChange"
    >
      <span class="el-pagination__show">显示 {{(currentPage - 1) * pageSize + 1}} 到 {{(currentPage - 1) * pageSize + pageSize | checkLength(this)}} 记录</span>
    </el-pagination>
  </div>
</template>

<script>
import sort from './sort';

export default {
  name: 'table-pagination',
  componentName: 'TablePagination',
  props: {
    tableData: {
      type: [Array, Object],
      default: () => ([])
    },
    initPagination: {
      type: Object,
      default: () => ({
        currentPage: 1,
        pageSize: 20,
        pageSizes: [5, 10, 20, 50],
        layout: 'slot, total, sizes, ->, prev, pager, next, jumper'
      })
    },
    height: {
      type: Number,
      default: 530
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    service: {
      type: Boolean,
      default: false
    }
  },
  data(){
    const showList = !this.service ?
    this.changeShowList(this.initPagination.currentPage, this.initPagination.pageSize, this.tableData) :
    this.tableData.list;

    return {
      currentPage: this.initPagination.currentPage,
      pageSize: this.initPagination.pageSize,
      pageSizes: this.initPagination.pageSizes,
      layout: this.initPagination.layout,
      showList: showList,
      tableList: this.tableData
    };
  },
  filters: {
    checkLength(val, vm) {
      const maxLength = !vm.service ? vm.tableData.length : vm.tableData.total;
      return val > maxLength ? maxLength : val;
    }
  },
  watch: {
    tableData(newValue) {
      if (this.service) {
        this.showList = this.tableList = newValue.list;
        this.currentPage = newValue.pageNo - 0;
        this.pageSize = newValue.pageSize - 0;
        return;
      }

      this.tableList = newValue;
      this.currentPage = 1;
      this.showList = this.changeShowList(this.currentPage, this.pageSize);
    }
  },
  computed: {
    total() {
      if (this.service) return this.tableData.total;
      return this.tableData.length;
    }
  },
  methods: {
    sortChange({ column, order, prop }) {
      if (this.service) {
        const orderBy = order ? `${prop} ${order.replace('ending', '')}` : '';
        this.$emit('service-fn', {orderBy});
        return;
      }

      if (column === null) {
        this.tableList = this.tableData;
        this.showList = this.changeShowList(this.currentPage, this.pageSize);
      } else {
        if (!column.sortMethod) {
          this.tableList = sort(this.tableList, { sortBy: column.sortBy, order, prop });
          this.showList = this.changeShowList(this.currentPage, this.pageSize);
        }
      }
    },
    currentChange(cur) {
      this.currentPage = cur;

      if (this.service) {
        this.$emit('service-fn', {pageNo: cur});
        return;
      }

      this.showList = this.changeShowList(this.currentPage, this.pageSize);
    },
    sizeChange(size) {
      this.pageSize = size;

      if (this.service) {
        this.$emit('service-fn', {pageSize: size});
        return;
      }

      this.showList = this.changeShowList(this.currentPage, this.pageSize);
    },
    changeShowList(currentPage, pageSize, tableList = this.tableList) {
      const from = (currentPage - 1) * pageSize;
      return tableList.slice(from, from + pageSize);
    },
    rowClick(row, event, column) {
      this.$emit('row-click', row, event, column);
    },
    setCurrentRow(row) {
      this.$refs.table.setCurrentRow(row);
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-pagination__show {
  font-weight: 400;
  margin-right: 10px;
  color: #606266;
}
</style>
