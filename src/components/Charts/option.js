import * as line from './line';
import _ from 'lodash';

const baseOption = {
  color: [
    '#32D2C9','#F8A20F','#6EB5E5','#F86B4F','#B279FF',
    '#FF90C9','#9BCA63','#FAD860','#F3A43B','#60C0DD',
    '#C6E579','#D7504B','#F4E001','#F0805A','#26C0C0',
    '#F93C3C','#9EF74E','#FAEC4B','#FEA965','#3F8BFC'
  ],
  title: {
    show: true,
    left: 'left',
    textStyle: {
      color: '#777'
    }
  },
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  yAxis: {
    show: true,
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#f0f0f0'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#777777',
      margin: 12
    },
    nameTextStyle: {
      color: '#777777'
    },
    splitLine: {
      lineStyle: {
        color: '#f8f8f8'
      }
    }
  },
  xAxis: {
    show: true,
    type: 'category',
    axisLine: {
      lineStyle: {
        color: '#f0f0f0'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#777777',
      margin: 12
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#f8f8f8'
      }
    },
    nameTextStyle: {
      color: '#777777'
    }
  },
  legend: {
    show: true,
    left: 'right',
    orient: 'vertical',
    data: []
  }
}

export function getOptions(chartData, title, option){
  const seriesObj = setSeries(chartData);

  let options = _.merge({
    title: {
      text: title
    }
  }, baseOption, option);

  options = line.setOption(options, seriesObj.series);

  return _.merge(options, seriesObj);
}

export function setSeries(chartData){
  const seriesObj = {
    series: []
  };

  chartData.map(series => {
    switch(series.type){
      case 'line':
        seriesObj.series.push(line.setSeries(series));
        break;
    }
  });

  return seriesObj;
}
