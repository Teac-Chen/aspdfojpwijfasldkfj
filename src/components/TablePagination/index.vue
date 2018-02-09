<template>
  <div class="table-pagination">
    <el-table
      :data="showList"
      class="table-list"
      stripe
      header-row-class-name="table-list-header"
      row-class-name="table-list-body"
      style="width: 100%"
      @sort-change="sortChange"
    >
      <slot></slot>
    </el-table>
    <el-pagination
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
      <span class="el-pagination__show">显示 {{(currentPage - 1) * pageSize + 1}} 到 {{(currentPage - 1) * pageSize + pageSize | checkLength(tableData.length)}} 记录</span>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'table-pagination',
  componentName: 'TablePagination',
  props: {
    tableData: {
      type: Array,
      default: () => ([])
    },
    pagination: {
      type: Object,
      default: () => ({
        currentPage: 1,
        pageSize: 20,
        pageSizes: [5, 10, 20, 50],
        layout: 'slot, total, sizes, ->, prev, pager, next, jumper',
        total: 100
      })
    }
  },
  data(){
    return {
      currentPage: this.pagination.currentPage,
      pageSize: this.pagination.pageSize,
      pageSizes: this.pagination.pageSizes,
      layout: this.pagination.layout,
      total: this.tableData.length,
      cacheShow: this.changeShowList(this.pagination.currentPage, this.pagination.pageSize, this.tableData),
      tableList: this.tableData
    };
  },
  computed: {
    showList: {
      get() {
        return this.cacheShow;
      },
      set(v) {
        this.cacheShow = v;
      }
    }
  },
  filters: {
    checkLength(val, l) {
      return val > l ? l : val;
    }
  },
  methods: {
    sortChange(i) {
      console.log(i);
    },
    currentChange(cur) {
      this.currentPage = cur;
      this.showList = this.changeShowList(this.currentPage, this.pageSize);
    },
    sizeChange(size) {
      this.pageSize = size;
      this.showList = this.changeShowList(this.currentPage, this.pageSize);
    },
    changeShowList(currentPage, pageSize, tableList = this.tableList) {
      const from = (currentPage - 1) * pageSize;
      return tableList.slice(from, from + pageSize);
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
