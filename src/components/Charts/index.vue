<template>
  <div :style="{height:height,width:width}" v-loading="loading" element-loading-text="拼命加载中"></div>
</template>

<script>
import echarts from 'echarts';
import { debounce } from 'utils';
import { getOptions, getSeries } from './option';

export default {
  name: 'chart',
  props: {
    type: {
      type: String,
      default: 'line'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    option: {
      type: Object,
      default: {}
    },
    chartData: Array,
    title: String
  },
  watch: {
    chartData(val){
      this.setOption(val);
    }
  },
  data(){
    return {
      chart: null
    }
  },
  activated(){
    if(this.chart) {
      this.chart.resize();
    }
  },
  mounted(){
    this.chart = echarts.init(this.$el);

    this.setOption(this.chartData);

    if(this.autoResize){
      this.__resizeHandler = debounce(() => {
        if(this.chart) {
          this.chart.resize();
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler);
    }
  },
  beforeDestroy(){
    if(!this.chart) return;

    if(this.autoResize){
      window.removeEventListener('resize', this.__resizeHandler);
    }

    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    setOption(chartData, title = this.title, option = this.option){
      const _option = getOptions(chartData, title, option);

      this.chart.setOption(_option);
    }
  }
}
</script>
