import Mock from 'mockjs';
import { param2Obj } from 'utils';

function mockChartData(req){
  const nowWeek = getNowWeek();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const data = {
    nowWeek: nowWeek,
    percent: [],
    typic: [],
    acrType: param2Obj(req.url).acrType
  };

  for(let i = 1; i <= 12; i++){
    data.percent.push(Mock.mock({
      'date': `${year - 1}-${i < 10 ? '0' + i : i}`,
      'riskIndex|0-99.2': 1,
      'lv3Percent|0-10.2': 1,
      'lv4Percent|0-5.2': 1
    }))
  };

  for(let i = 1; i <= month; i++){
    data.percent.push(Mock.mock({
      'date': `${year}-${i < 10 ? '0' + i : i}`,
      'riskIndex|0-99.2': 1,
      'lv3Percent|0-10.2': 1,
      'lv4Percent|0-5.2': 1
    }))
  };

  for(let i = 1; i <= 53; i++){
    data.typic.push(Mock.mock({
      'date': `${year - 1}年${i}周`,
      'typicCount|1-10': 1
    }))
  };

  for(let i = 1; i <= nowWeek; i++){
    data.typic.push(Mock.mock({
      'date': `${year}年${i}周`,
      'typicCount|1-10': 1
    }))
  };

  return data;
};

function getNowWeek(){
  const now = new Date();
  const year = now.getFullYear();
  const nowDays = Math.ceil((now - new Date(`${year}-01-01 00:00:00`)) / (24 * 60 * 60 * 1000));
  const nowWeek = Math.ceil(nowDays / 7);

  return nowWeek;
}

export default {
  getChartData: (req) => ({
    code: 0,
    data: mockChartData(req)
  })
}