import _ from 'lodash';
import { arrSort } from 'utils';

export function setSeries(series){
  const itemStyle = {
    normal: {
      borderWidth: 1,
      borderColor: '#fff',
      shadowColor: 'rgba(0, 0, 0, 0.3)',
      shadowBlur: 6
    }
  };

  series.symbol = 'circle';
  series.symbolSize = 8;
  series.itemStyle = _.merge(itemStyle, series.itemStyle || {});
  series.lineStyle = {
    normal: {
      width: 1.5
    }
  };

  series.data = [];

  Object.keys(series.dataObj).map(key => {
    series.data.push([key + '', series.dataObj[key]]);
  });

  return series;
};

export function setOption(option, series){
  let axisLength = 0;
  option.legend.data = [];

  if(!option.tooltip.formatter){
    option.tooltip.formatter = (params) => {
      let tooltip = '';

      if(params.forEach){
        params.forEach((item, index) => {
          if(index ===0) tooltip = `${item.axisValue}<br/>`;
          tooltip += `${item.marker}${item.seriesName}: ${item.data[1]}<br/>`;
        })
      }else{
        tooltip = `${params.data[0]}<br/>${params.marker}${params.seriesName}: ${params.data[1]}`
      }
      
      return tooltip;
    }
  }

  series.map(item => {
    option.legend.data.push(item.name);
    if(item.data.length > axisLength){
      axisLength = item.data.length;
      set2Daxis(item, option);
    }
  });

  return option;
}

function set2Daxis(series, option){
  option.xAxis.data = arrSort(Object.keys(series.dataObj));

  if(!option.xAxis.boundaryGap){
    option.xAxis.boundaryGap = false;
  }
}