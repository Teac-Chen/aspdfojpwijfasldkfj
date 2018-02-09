import { fetchVoData } from 'api';
import { fetchFieldFromDict } from 'utils';
import { MSG_TYPE_STATE_DICT, MSG_STATE_DICT, ORG_MSG_TYPE_STATE_DICT, REASON_STATE_DICT } from 'utils/dict';

export default {
  data() {
    return {
      listUrl: undefined,
      pagination: true,
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true, // 数据列表 遮罩层
      multipleSelection: [], // 已选
      listQuery: { // 数据列表 分页
        pagination: {
          pageNo: 1,
          pageSize: 8,
          orderBy: ''
        }
      },
      saveLoading: false // 提交button 遮罩，防止重复提交
    }
  },
  filters: {
    formatMsgStateText(val, sType) { // 数据流量格式化
      if (sType === 'MSG') {
        return fetchFieldFromDict(MSG_STATE_DICT, val, 'value', 'desc');
      }
      if (sType === 'MSG_TYPE') {
        return fetchFieldFromDict(MSG_TYPE_STATE_DICT, val, 'text', 'desc');
      }
      if (sType === 'ORG_MSG_TYPE') {
        return fetchFieldFromDict(ORG_MSG_TYPE_STATE_DICT, val, 'text', 'desc');
      }
      if (sType === 'REASON') {
        return fetchFieldFromDict(REASON_STATE_DICT, val, 'value', 'text');
      }
    }
  },
  methods: {
    handleSearch() {
      if (!this.listUrl) {
        console.log('error', 'please init a listUrl variable');
        return false;
      }
      this.listLoading = true;
      fetchVoData(this.listUrl, this.listQuery).then(result => {
        if (this.pagination) {
          if (this.userList) {
            this.userList = result.data.userList;
          }
          this.list = result.data.page.list;
          this.total = result.data.page.totalCount;
        } else {
          this.list = result.data.list;
        }
        this.listLoading = false;
      })
    },
    handleSizeChange(val) { // 页码
      this.listQuery.pagination.pageSize = val;
      this.handleSearch();
    },
    handleCurrentChange(val) { // 跳转
      this.listQuery.pagination.pageNo = val;
      this.handleSearch();
    },
    handleSelectionChange(val) { // 可选
      this.multipleSelection = val;
    },
    checkDeleteSelection() { // 判断是否勾选删除数据
      if (this.multipleSelection.length === 0) {
        this.$alert('请选择要删除的数据！', '警告', {
          confirmButtonText: '确定',
          type: 'info'
        });
        return false;
      }
      return true;
    },
    handleDelete(sUrl, oParams, fnSuccess) { // 删除
      this.$confirm('确认要彻底删除数据吗?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        fetchVoData(sUrl, oParams).then(() => {
          this.$notify({
            title: '提示',
            message: '操作成功！',
            type: 'success',
            duration: 2000
          });
          if (fnSuccess) {
            fnSuccess();
          } else {
            this.handleSearch();
          }
        }).catch(error => {
          this.$notify({
            title: '错误',
            message: error,
            type: 'error',
            duration: 2000
          });
        });
      }).catch(() => {
        console.log('cancel the confirm');
      });
    },
    handleSubmit(sUrl, oParams, fnSuccess) { // 保存|提交
      this.saveLoading = true;
      fetchVoData(sUrl, oParams).then(() => {
        this.$notify({
          title: '成功',
          message: '操作成功！',
          type: 'success',
          duration: 2000
        });

        if (fnSuccess) {
          this.saveLoading = false;
          fnSuccess();
        } else {
          if (this.handleSearch && this.dialogVisible) {
            this.handleSearch();
            this.saveLoading = false;
            this.dialogVisible = false;
          }
        }
      }).catch(error => {
        this.saveLoading = false;
        console.log(error);
        this.$notify({
          title: '错误',
          message: error,
          type: 'error',
          duration: 2000
        });
      });
    }
  }
};
