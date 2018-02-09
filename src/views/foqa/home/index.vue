<template>
  <div class="main-container-block">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-select v-model="acrTypeSel" placeholder="请选择" size="small" @change="getChartData">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="12">
        <router-link to="/flightSearch" key="/flightSearch">
          <el-button type="green" size="small" class="pull-right" icon="el-icon-fa fa-copy">更多统计</el-button>
        </router-link>
      </el-col>
      <el-col :span="24">
        <div class="hr"></div>
      </el-col>
      <el-col :span="8">
        <chart :loading="loading" :option="riskExponent.options" :chart-data="riskExponent.series" :title="`${acrType}风险指数`" />
      </el-col>
      <el-col :span="8">
        <chart :loading="loading" :option="seriousRate.options" :chart-data="seriousRate.series" :title="`${acrType}严重偏差百次率`" />
      </el-col>
      <el-col :span="8">
        <chart :loading="loading" :option="lightRate.options" :chart-data="lightRate.series" :title="`${acrType}轻度偏差百次率`" />
      </el-col>
      <el-col :span="24">
        <chart :loading="loading" :option="typical.options" :chart-data="typical.series" :title="`${acrType}典型事件发生次数`" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchGetVoData } from 'api';
import { HOME_URL } from 'api/url';
import Chart from 'components/Charts';

export default {
  name: 'home',
  components: {Chart},
  data(){
    const color = ['#f93c3c', '#3f88fc'];
    const tooltipFormatter = (xUnit, yUnit = '') => params => {
      let tooltip = '';

      if(params.forEach){
        params.forEach((item, index) => {
          if(index ===0) tooltip = `${item.axisValue}${xUnit}<br/>`;
          tooltip += `${item.marker}${item.seriesName}: ${item.data[1]}${yUnit}<br/>`;
        })
      }else{
        tooltip = `${params.data[0]}${xUnit}<br/>${params.marker}${params.seriesName}: ${params.data[1]}${yUnit}`
      }

      return tooltip;
    }

    return {
      options: [{
        value: 'B737-NG',
        label: 'B737-NG'
      },{
        value: 'A319/320',
        label: 'A319/320'
      },{
        value: 'A330',
        label: 'A330'
      }],
      loading: false,
      acrTypeSel: 'B737-NG',
      acrType: 'B737-NG',
      riskExponent: {
        options: {
          tooltip: {
            formatter: tooltipFormatter('月')
          },
          xAxis: {
            name: '月'
          },
          yAxis: {
            name: '风险指数',
            min: 0,
            max: 100
          },
          color: color
        },
        series: []
      },
      seriousRate: {
        options: {
          tooltip: {
            formatter: tooltipFormatter('月', '%')
          },
          xAxis: {
            name: '月'
          },
          yAxis: {
            name: '严重偏差百次率',
            min: 0,
            max: 100
          },
          color: color
        },
        series: []
      },
      lightRate: {
        options: {
          tooltip: {
            formatter: tooltipFormatter('月', '%')
          },
          xAxis: {
            name: '月'
          },
          yAxis: {
            name: '轻度偏差百次率',
            min: 0,
            max: 100
          },
          color: color
        },
        series: []
      },
      typical: {
        options: {
          tooltip: {
            formatter: tooltipFormatter('周', '次')
          },
          xAxis: {
            name: '周'
          },
          yAxis: {
            name: '典型事件次数',
            min: 0,
            max: 10
          },
          color: color
        },
        series: []
      }
    }
  },
  mounted(){
    this.getChartData(true);
  },
  methods: {
    getChartData(isInit){
      this.loading = true;
      fetchGetVoData(HOME_URL.INDEX_DATA, {acrType: this.acrTypeSel})
        .then(result => {
          this.loading = false;

          const data = result.data;
          this.acrType = data.acrType;


          const _data = this.formatterData(data);

          if(isInit){
            this.initSeries(_data, data.nowWeek);
          }

          this.riskExponent.series = this.riskExponent.series.map(item => this.changeChartData(item, _data, 'riskExponent'));

          this.seriousRate.series = this.seriousRate.series.map(item => this.changeChartData(item, _data, 'seriousRate'));

          this.lightRate.series = this.lightRate.series.map(item => this.changeChartData(item, _data, 'lightRate'));

          this.typical.series = this.typical.series.map(item => this.changeChartData(item, _data, 'typical'));
        })
        .catch(err => {
          this.loading = false;
          this.$message({
            type: 'error',
            message: err
          });
        })
    },
    formatterData(chartData){
      const data = {};

      chartData.percent.forEach(item => {
        const year = item.date.split('-')[0] - 0;
        const month = item.date.split('-')[1] - 0;

        if(data[`${year}年`]){
          data[`${year}年`].riskExponent[month] = item.riskIndex;
          data[`${year}年`].seriousRate[month] = item.lv4Percent;
          data[`${year}年`].lightRate[month] = item.lv3Percent;
        }else{
          data[`${year}年`] = {
            riskExponent: {
              [month]: item.riskIndex
            },
            seriousRate: {
              [month]: item.lv4Percent
            },
            lightRate: {
              [month]: item.lv3Percent
            }
          }
        };
      });

      chartData.typic.forEach(item => {
        const year = item.date.split('年')[0] - 0;
        const week = parseInt(item.date.split('年')[1]);

        if(data[`${year}年`]){
          if(data[`${year}年`].typical){
            data[`${year}年`].typical[week] = item.typicCount;
          }else{
            data[`${year}年`].typical = {
              [week]: item.typicCount
            }
          }
        }else{
          data[`${year}年`] = {
            typical: {
              [week]: item.typicCount
            }
          }
        }
      });

      return data;
    },
    changeChartData(item, _data, name){
      const dataObj = _data[item.name][name];

      Object.keys(dataObj).forEach(key => {
        item.dataObj[key] = dataObj[key];
      });

      return item;
    },
    initSeries(data, nowWeek){
      const keyArr = Object.keys(data);
      const nowYear = (parseInt(keyArr[0]) > parseInt(keyArr[1])) ? keyArr[0] : keyArr[1];
      const lastYear = (parseInt(keyArr[0]) > parseInt(keyArr[1])) ? keyArr[1] : keyArr[0];

      this.riskExponent.series = [
        {name: lastYear, type: 'line', dataObj: this.initDataObj(12)},
        {name: nowYear, type: 'line', dataObj: this.initDataObj(12)}
      ];

      this.seriousRate.series = [
        {name: lastYear, type: 'line', dataObj: this.initDataObj(12)},
        {name: nowYear, type: 'line', dataObj: this.initDataObj(12)}
      ];

      this.lightRate.series = [
        {name: lastYear, type: 'line', dataObj: this.initDataObj(12)},
        {name: nowYear, type: 'line', dataObj: this.initDataObj(12)}
      ];

      this.typical.series = [
        {name: lastYear, type: 'line', dataObj: this.initDataObj(53, 0)},
        {name: nowYear, type: 'line', dataObj: this.initDataObj(nowWeek, 0)}
      ];
    },
    initDataObj(weekCount, initVal = '-'){
      const dataObj = Array(weekCount).fill(initVal).reduce((result, cur, index) => {
        result[index + 1] = cur;
        return result;
      }, {});

      return dataObj;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.hr {
  height: 1px;
  background-color: #e7eaec;
  margin: 20px 0;
}
</style>
