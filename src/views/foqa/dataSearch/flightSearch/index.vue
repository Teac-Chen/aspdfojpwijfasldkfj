<template>
  <div class="main-container-block">
    <el-form label-width="80px" label-opsition="right" ref="searchForm" :model="formData" v-loading="formLoading" class="search-form">
      <el-row :gutter="10">
        <el-col :span="16">
          <el-row>
            <el-col :span="12" :lg="6">
              <el-form-item label="起始时间：" prop="beginDate">
                <el-date-picker size="small" v-model="formData.beginDate" placeholder="起始时间" value-format="yyyy-MM-dd" />
              </el-form-item>
            </el-col>
            <el-col :span="12" :lg="6">
              <el-form-item label="结束时间：" prop="endDate">
                <el-date-picker size="small" v-model="formData.endDate" placeholder="结束时间" value-format="yyyy-MM-dd" />
              </el-form-item>
            </el-col>
            <el-col :span="12" :lg="6">
              <el-form-item label="飞机号：" prop="acrNumber">
                <el-select size="small" v-model="formData.acrNumber" placeholder="请选择" filterable>
                  <el-option
                    v-for="option in acrNumber"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" :lg="6">
              <el-form-item label="航班号：" prop="flNum">
                <el-input size="small" v-model="formData.flNum" placeholder="航班号" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-form-item label-width="0">
            <el-button type="primary" size="small" icon="el-icon-search" @click="handleSearch">查询</el-button>
            <el-button type="info" size="small" icon="el-icon-refresh" @click="handleReset">清空</el-button>
            <el-button type="warning" size="small" :icon="this.collapse.length > 0 ? 'el-icon-zoom-out' : 'el-icon-zoom-in'" @click="handleMore">更多</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-collapse v-model="collapse">
            <el-collapse-item name="more">
              <el-row :gutter="10">
                <el-col :sm="12" :lg="8">
                  <div class="search-pannel">
                    <el-row :gutter="10">
                      <el-col :span="14">
                        <el-form-item label="事件组类：" prop="uevtGroup">
                          <tree-input size="small" id="uevtGroup" v-model="formData.uevtGroup" placeholder="请选择" :data="uevtGroup" :unselect="0" filterable />
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="峰值≧" prop="beginParam">
                          <el-input size="small" v-model="formData.beginParam" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="14">
                        <el-form-item label="事件名称：" prop="eventId">
                          <el-select size="small" v-model="formData.eventId" placeholder="请选择" filterable>
                            <el-option
                              v-for="option in eventId"
                              :key="option.value"
                              :value="option.value"
                              :label="option.label" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="峰值≦" prop="endParam">
                          <el-input size="small" v-model="formData.endParam" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="14">
                        <el-form-item label="事件等级：" prop="eventLevel">
                          <el-select size="small" v-model="formData.eventLevel" placeholder="请选择" filterable>
                            <el-option
                              v-for="option in eventLevel"
                              :key="option.value"
                              :value="option.value"
                              :label="option.label" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
                <el-col :sm="12" :lg="8">
                  <div class="search-pannel">
                    <el-row :gutter="10">
                      <el-col :span="18">
                        <el-form-item label-width="90px" label="机场组类：" prop="airportGroup">
                          <tree-input size="small" id="airportGroup" v-model="formData.airportGroup" placeholder="请选择" :data="airportGroup" :unselect="0" filterable />
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="起飞" prop="depApt">
                          <el-checkbox v-model="depApt" slot="label">起飞</el-checkbox>
                        </el-form-item>
                      </el-col>
                      <el-col :span="18">
                        <el-form-item label-width="90px" label="机场名称：" prop="airport">
                          <el-select size="small" v-model="formData.airport" placeholder="请选择" filterable>
                            <el-option
                              v-for="option in airport"
                              :key="option.value"
                              :value="option.value"
                              :label="option.label" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="着陆" prop="arrApt">
                          <el-checkbox v-model="arrApt" slot="label">着陆</el-checkbox>
                        </el-form-item>
                      </el-col>
                      <el-col :span="18">
                        <el-form-item label-width="90px" label="跑道号：" prop="runway">
                          <el-checkbox v-model="runwaycheck" :disabled="formData.airport === ''" slot="label">跑道号：</el-checkbox>
                          <el-select size="small" v-model="formData.runway" placeholder="请选择" :disabled="!runwaycheck || formData.airport === ''" filterable>
                            <el-option
                              v-for="option in runway"
                              :key="option.value"
                              :value="option.value"
                              :label="option.label" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
                <el-col :sm="24" :lg="8">
                  <div class="search-pannel">
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item label="机型：">
                          <el-select size="small" multiple collapse-tags v-model="formData.actLong" placeholder="全部" filterable>
                            <el-option
                              v-for="option in actLong"
                              :key="option.value"
                              :value="option.value"
                              :label="option.label" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="组织架构：">
                          <tree-input size="small" id="groupSel" v-model="formData.groupSel" placeholder="请选择" :data="groupSel" :unselect="0" filterable />
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="在座类型：">
                          <el-select size="small" v-model="formData.pilotType" placeholder="请选择" filterable>
                            <el-option
                              v-for="option in pilotType"
                              :key="option.value"
                              :value="option.value"
                              :label="option.label" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="姓名：">
                          <el-autocomplete size="small" :fetch-suggestions="handleSearchName" v-model="formData.pilotName" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="技术等级：">
                          <el-select size="small" multiple collapse-tags v-model="formData.pilotTech" placeholder="全部" filterable clearable>
                            <el-option
                              v-for="option in pilotTech"
                              :key="option.value"
                              :value="option.value"
                              :label="option.label" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="工号：">
                          <el-input size="small" v-model="formData.jobCode" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
    </el-form>
    <div class="tool-bar">
      <el-button size="mini" round type="green" icon="el-icon-fa fa-bar-chart" @click="handleFlightReport">航班报告</el-button>
      <el-button size="mini" round type="warning" icon="el-icon-fa fa-cloud-download" @click="handleFlightReport">列表导出</el-button>
      <el-button size="mini" round type="primary" icon="el-icon-fa fa-plane" @click="handleFlightReport">飞行轨迹</el-button>
    </div>
    <!-- service -->
    <!-- @service-fn="handleService" -->
    <table-pagination
      ref="table"
      :tableData="tableData"
      :init-pagination="pagination"
      :height="530"
      service
      @service-fn="handleService"
      highlight-current-row
      @row-click="rowClick"
      v-loading="listLoading"
    >
      <el-table-column prop="timestamp" label="航班时间" align="center" sortable="custom" sort-by="int" :formatter="formatterTime" />
      <el-table-column prop="flNum" label="航班号" align="center" sortable="custom"  />
      <el-table-column prop="acrNumber" label="飞机号" align="center" sortable="custom"  />
      <el-table-column prop="aptDepCn" label="起飞机场" align="center" sortable="custom"  />
      <el-table-column prop="aptArrCn" label="降落机场" align="center" sortable="custom"  />
      <el-table-column prop="pilotLeft.cName" label="左座" align="center" sortable="custom"  />
      <el-table-column prop="pilotRight.cName" label="右座" align="center" sortable="custom"  />
      <el-table-column prop="pilotOperator.cName" label="操纵者" align="center" sortable="custom"  />
      <el-table-column prop="pilotDuty.cName" label="责任机长" align="center" sortable="custom"  />
    </table-pagination>
    <div class="notes">
      <span class="bg-LV99">典型事件</span>
      <span class="bg-LV4">严重偏差</span>
      <span class="bg-LV3">轻度偏差</span>
    </div>

    <!-- 航班报告 -->
    <el-dialog
      title="航班报告"
      :visible.sync="flightReport"
      center
    >
      sss
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash';
import { fetchGetVoData } from 'api';
import { FLIGHT_SEARCH } from 'api/url';
import { parseTime } from 'utils';
import TreeInput from 'components/TreeInput';
import TablePagination from 'components/TablePagination';

export default {
  name: 'flightSearch',
  components: {TreeInput, TablePagination},
  data() {
    const now = Date.now();

    return {
      formData: {
        beginDate: parseTime(now - (3 * 24 * 60 * 60 * 1000), '{y}-{m}-{d}'),
        endDate: parseTime(now, '{y}-{m}-{d}'),
        acrNumber: '',
        flNum: '',
        uevtGroup: '',
        beginParam: '',
        eventId: '',
        endParam: '',
        eventLevel: '',
        airportGroup: '',
        airport: '',
        runway: '',
        actLong: [],
        groupSel: '',
        pilotType: '',
        pilotName: '',
        pilotTech: [],
        jobCode: '',
        aptType: '',
        pageNo: 1,
        pageSize: 20,
        orderBy: ''
      },
      searchData: {},
      runwaycheck: false,
      depApt: false,
      arrApt: false,
      formLoading: true,
      listLoading: false,
      flightReport: false,
      acrNumber: [],
      eventId: [],
      eventLevel: [],
      airport: [],
      runway: [],
      actLong: [],
      pilotType: [],
      pilotTech: [],
      collapse: ['more'],
      uevtGroup: [],
      airportGroup: [],
      groupSel: [],
      // tableData: [],
      tableData: {
        list: [],
        total: 0
      },
      selection: {},
      pagination: {
        currentPage: 1,
        pageSize: 20,
        pageSizes: [10, 20, 50, 100],
        layout: 'slot, total, sizes, ->, prev, pager, next, jumper'
      }
    }
  },
  watch: {
    depApt(checked) {
      this.handleRadio('depApt', checked);
    },
    arrApt(checked) {
      this.handleRadio('arrApt', checked);
    }
  },
  created() {
    this.initFormData = _.merge({}, this.formData);
  },
  mounted() {
    fetchGetVoData(FLIGHT_SEARCH.MOUNTED)
      .then(result => {
        this.formLoading = false;

        const data = result.data;
        const baseItem = {value: '', label: '全部'};

        this.acrNumber = [baseItem].concat(data.acrNumber);
        this.eventId = [baseItem].concat(data.eventId);
        this.eventLevel = [baseItem].concat(data.eventLevel);
        this.airport = [baseItem].concat(data.airport);
        this.actLong = data.actLong;
        this.pilotType = [baseItem].concat(data.pilotType);
        this.pilotTech = data.pilotTech;
        this.uevtGroup = data.uevtGroup;
        this.airportGroup = data.airportGroup;
        this.groupSel = data.groupSel;

        this.uevtGroup[0].open = true;
        this.airportGroup[0].open = true;
        this.groupSel[0].open = true;
      });
    this.handleSearch();
  },
  methods: {
    getList(param) {
      if (this.listLoading) {
        this.$message({
          message: '上一次查询还未结束，请稍等...',
          type: 'warning'
        });
        return;
      }

      this.listLoading = true;
      fetchGetVoData(FLIGHT_SEARCH.GET_LIST_SERVICE, param)
        .then(result => {
          this.listLoading = false;
          this.tableData = result.data;
        });
    },
    handleSearch() {
      this.searchData = _.merge({}, this.formData, {pageNo: 1});
      this.getList(this.searchData);
    },
    handleService(param) {
      this.formData = _.merge(this.formData, param);
      this.getList(_.merge(this.searchData, param));
    },
    handleReset() {
      this.runwaycheck = false;
      this.depApt = false;
      this.arrApt = false;
      this.formData.actLong = [];
      this.formData.pilotTech = [];
      this.$refs.searchForm.resetFields();
    },
    handleMore() {
      this.collapse = this.collapse.length > 0 ? [] : ['more'];
    },
    handleRadio(type, checked) {
      const changeType = type === 'depApt' ? 'arrApt' : 'depApt';

      if(checked){
        this[changeType] = false;
        this.formData.aptType = type;
      }

      if(!this.depApt && !this.arrApt) {
        this.formData.aptType = '';
      }
    },
    handleSearchName(name, cb) {
      fetchGetVoData(FLIGHT_SEARCH.SEARCH_NAME, {name: name})
        .then(result => {
          cb(result.data);
        })
    },
    formatterTime(row, column, cellValue) {
      return parseTime(cellValue);
    },
    rowClick(row) {
      if (this.selection === row) {
        this.selection = {};
        this.$refs.table.setCurrentRow();
        return
      }

      this.selection = row;
    },
    handleFlightReport() {
      if (!this.selection.id) {
        this.$alert('请选择一条数据！', '警告', {
          type: 'warning'
        });
        return;
      } else {
        this.flightReport = true;
        fetchGetVoData(FLIGHT_SEARCH.GET_FLIGHT, {id: this.selection.id})
          .then(result => {
            console.log(result);
          })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.notes {
  padding: 5px;
  font-weight: bold;
  font-size: 13px;
  color: #676a6c;

  &:before {
    content: '注释：';
    margin-right: 5px;
  }

  span {
    display: inline-block;
    height: 20px;
    line-height: 22px;
    position: relative;
    vertical-align: top;
    padding-left: 15px;
  }
}

.bg-LV3:before,
.bg-LV4:before,
.bg-LV99:before {
  content: '';
  display: block;
  height: 11px;
  width: 11px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 2px;
  margin: auto;
}
.bg-LV3:before {
  background-color: #F9E116;
}
.bg-LV4:before {
  background-color: #FC9146;
}
.bg-LV99:before {
  background-color: #F74848;
}
</style>
