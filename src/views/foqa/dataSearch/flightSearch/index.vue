<template>
  <div class="main-container-block">
    <el-form label-width="80px" label-opsition="right" :model="formData" v-loading="formLoading" class="search-form">
      <el-row :gutter="10">
        <el-col :span="16">
          <el-row>
            <el-col :span="12" :lg="6">
              <el-form-item label="起始时间：">
                <el-date-picker size="small" v-model="formData.beginDate" placeholder="起始时间" />
              </el-form-item>
            </el-col>
            <el-col :span="12" :lg="6">
              <el-form-item label="结束时间：">
                <el-date-picker size="small" v-model="formData.endDate" placeholder="结束时间" />
              </el-form-item>
            </el-col>
            <el-col :span="12" :lg="6">
              <el-form-item label="飞机号：">
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
              <el-form-item label="航班号：">
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
                        <el-form-item label="事件组类：">
                          <tree-input size="small" id="uevtGroup" v-model="formData.uevtGroup" placeholder="请选择" :data="uevtGroup" :unselect="0" filterable />
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="峰值≧">
                          <el-input size="small" v-model="formData.beginParam" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="14">
                        <el-form-item label="事件名称：">
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
                        <el-form-item label="峰值≦">
                          <el-input size="small" v-model="formData.endParam" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="14">
                        <el-form-item label="事件等级：">
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
                        <el-form-item label-width="90px" label="机场组类：">
                          <tree-input size="small" id="airportGroup" v-model="formData.airportGroup" placeholder="请选择" :data="airportGroup" :unselect="0" filterable />
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="起飞">
                          <el-checkbox v-model="depApt" slot="label">起飞</el-checkbox>
                        </el-form-item>
                      </el-col>
                      <el-col :span="18">
                        <el-form-item label-width="90px" label="机场名称：">
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
                        <el-form-item label="着陆">
                          <el-checkbox v-model="arrApt" slot="label">着陆</el-checkbox>
                        </el-form-item>
                      </el-col>
                      <el-col :span="18">
                        <el-form-item label-width="90px" label="跑道号：">
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
                          <el-autocomplete size="small" :fetch-suggestions="handleSearchName" v-model="formData.pilotName" label="asdfasfasdf" />
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
      <el-button size="mini" round type="green" icon="el-icon-fa fa-bar-chart">航班报告</el-button>
      <el-button size="mini" round type="warning" icon="el-icon-fa fa-cloud-download">列表导出</el-button>
      <el-button size="mini" round type="primary" icon="el-icon-fa fa-plane">飞行轨迹</el-button>
    </div>
    <table-pagination :tableData="tableData" :pagination="pagination">
      <el-table-column prop="date" label="航班时间" align="center" sortable />
      <el-table-column prop="date" label="航班号" align="center" sortable />
      <el-table-column prop="date" label="飞机号" align="center" sortable />
      <el-table-column prop="date" label="起飞机场" align="center" sortable />
      <el-table-column prop="date" label="降落机场" align="center" sortable />
      <el-table-column prop="date" label="左座" align="center" sortable />
      <el-table-column prop="date" label="右座" align="center" sortable />
      <el-table-column prop="date" label="操纵者" align="center" sortable />
      <el-table-column prop="date" label="责任机长" align="center" sortable />
    </table-pagination>
  </div>
</template>

<script>
import _ from 'lodash';
import { fetchGetVoData } from 'api';
import { FLIGHT_SEARCH } from 'api/url';
import TreeInput from 'components/TreeInput';
import TablePagination from 'components/TablePagination';

export default {
  name: 'flightSearch',
  components: {TreeInput, TablePagination},
  data(){
    return {
      formData: {
        beginDate: '2018-01-01',
        endDate: '2018-01-16',
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
        actLong: '',
        groupSel: '',
        pilotType: '',
        pilotName: '',
        pilotTech: '',
        jobCode: '',
        aptType: '',
      },
      runwaycheck: false,
      depApt: false,
      arrApt: false,
      formLoading: true,
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
      tableData: [{
        date: '2017-05-27'
      },{
        date: '2017-06-13'
      },{
        date: '2017-09-18'
      }],
      pagination: {
        currentPage: 1,
        pageSize: 1,
        pageSizes: [1, 2, 3, 4],
        layout: 'slot, total, sizes, ->, prev, pager, next, jumper',
        total: 100
      }
    }
  },
  watch: {
    depApt(checked){
      this.handleRadio('depApt', checked);
    },
    arrApt(checked){
      this.handleRadio('arrApt', checked);
    }
  },
  created(){
    this.initFormData = _.merge({}, this.formData);
  },
  mounted(){
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
      })
  },
  methods: {
    handleSearch(){
      console.log(this.formData);
    },
    handleReset(){
      this.formData = _.merge({}, this.initFormData);
      this.runwaycheck = false;
      this.depApt = false;
      this.arrApt = false;
    },
    handleMore(){
      this.collapse = this.collapse.length > 0 ? [] : ['more'];
    },
    handleRadio(type, checked){
      const changeType = type === 'depApt' ? 'arrApt' : 'depApt';

      if(checked){
        this[changeType] = false;
        this.formData.aptType = type;
      }

      if(!this.depApt && !this.arrApt) {
        this.formData.aptType = '';
      }
    },
    handleSearchName(name, cb){
      fetchGetVoData(FLIGHT_SEARCH.SEARCH_NAME, {name: name})
        .then(result => {
          cb(result.data);
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
