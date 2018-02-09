import Mock from 'mockjs';
import { param2Obj } from 'utils';

function mountedData(){
  const data = {
    acrNumber: [],
    eventId: [],
    eventLevel: [],
    airport: [],
    runway: [],
    actLong: [],
    pilotType: [],
    pilotTech: [],
    uevtGroup: [{
      name: '全部',
      value: '',
      children: [{
        name: '重点事件',
        value: 'p1'
      }, {
        name: '按事件特性',
        value: 'p2',
        children: [
          { name: '速度类', value: 'c1' },
          { name: '姿态类', value: 'c2' },
          { name: '坡度类', value: 'c3' },
          { name: '推力类', value: 'c4' },
          { name: '高度类', value: 'c5' },
          { name: '过载类', value: 'c6' },
          { name: '升降类', value: 'c7' },
          { name: '剖面类', value: 'c8' },
          { name: '告警类', value: 'c9' },
          { name: '发动机类', value: 'c10' },
          { name: '构型类', value: 'c11' },
        ]
      }, {
        name: '不稳定进近',
        value: 'p3'
      }]
    }],
    airportGroup: [{
      name: '全部',
      value: '',
      children: [{
        name: '标高类型',
        value: 'p1',
        children: [
          { name: '2500ft以下', value: 'c1' },
          { name: '2501ft-4921ft', value: 'c2' },
          { name: '4922ft-8000ft', value: 'c3' },
          { name: '8001ft以上', value: 'c4' },
        ]
      }, {
        name: '跑道类型',
        value: 'p2',
        children: [
          { name: '普通跑道', value: 'c5' },
          { name: '短跑道', value: 'c6' },
          { name: '平行跑道', value: 'c7' },
        ]
      }, {
        name: '运行类型',
        value: 'p3',
        children: [
          { name: 'ⅠA', value: 'c8' },
          { name: 'ⅠB', value: 'c9' },
          { name: 'ⅡA', value: 'c10' },
          { name: 'ⅡB', value: 'c11' },
          { name: 'Ⅱ高原', value: 'c12' },
          { name: 'Ⅲ', value: 'c13' },
          { name: 'Ⅲ国际', value: 'c14' },
          { name: 'Ⅳ', value: 'c15' },
          { name: 'Ⅳ国际', value: 'c16' },
        ]
      }]
    }],
    groupSel: [{
      name: '全部',
      value: '',
      children: [{
        name: 'A FLEET',
        value: 'p1',
        children: [
          { name: 'A17', value: 'c1' },
          { name: 'A12', value: 'c1' },
          { name: 'A16', value: 'c1' },
          { name: 'A13', value: 'c1' },
          { name: 'A14', value: 'c1' },
          { name: 'A15', value: 'c1' },
          { name: 'AF', value: 'c1' },
          { name: 'A11', value: 'c1' },
          { name: 'AJ', value: 'c1' },
          { name: 'AN', value: 'c1' },
          { name: 'AW', value: 'c1' },
        ]
      }, {
        name: 'B FLEET',
        value: 'p2',
        children: [
          { name: 'BX', value: 'c1' },
          { name: 'BC', value: 'c1' },
          { name: 'B15', value: 'c1' },
          { name: 'B16', value: 'c1' },
          { name: 'B11', value: 'c1' },
          { name: 'B12', value: 'c1' },
          { name: 'B13', value: 'c1' },
          { name: 'B14', value: 'c1' },
          { name: 'BF', value: 'c1' },
          { name: 'BG', value: 'c1' },
          { name: 'B33', value: 'c1' },
          { name: 'BS', value: 'c1' },
        ]
      }]
    }]
  };

  const actLong = ['B737-900', 'B737-800', 'B737-700', 'A320-200', 'A319-100', 'A330-343'];
  const eventLevel = ['严重偏差', '轻度偏差', '典型事件'];
  const pilotType = ['在座', '操作者', '责任机长'];
  const pilotTech = ['F1', 'F2', 'F3', 'F4', 'FL', 'FR', '正驾驶', '机长二阶段', '新机长(一阶段)', '机长', '教员', 'F0'];

  for(let i = 1; i < 30; i++){
    let acr = Mock.mock(/B\-\d{4}/);
    let event = Mock.mock({name: '@cword(5, 9)', id: '@id()'});
    let city = Mock.mock('@city()');

    data.acrNumber.push({value: acr, label: acr});

    data.eventId.push({value: event.id, label: event.name});

    data.airport.push({value: i, label: city})
  };

  data.eventLevel = eventLevel.reduce((result, cur, index) => {
    result.push({value: `LV${index}`, label: cur});
    return result;
  }, []);

  data.actLong = actLong.reduce((result, cur) => {
    result.push({value: cur, label: cur});
    return result;
  }, []);

  data.pilotType = pilotType.reduce((result, cur, index) => {
    result.push({value: index, label: cur});
    return result;
  }, []);

  data.pilotTech = pilotTech.reduce((result, cur, index) => {
    result.push({value: index, label: cur});
    return result;
  }, []);

  return data;
}

function filterName(req){
  const name = param2Obj(req.url).name;
  const orgList = ["范丽", "郑超", "姜秀英", "段静", "任超", "雷伟", "孙敏", "锺洋", "蔡敏", "任强", "邹秀英", "范强", "邓伟", "孔敏", "康艳", "彭刚", "阎秀兰", "刘磊", "侯芳", "罗秀兰", "史明", "马秀英", "曹艳", "郝平", "郭敏", "曾敏", "梁艳", "任平", "邹娜", "苏伟", "熊秀英", "彭娟", "于霞", "熊洋", "史娟", "毛秀兰", "贾强", "姜刚", "陈霞", "赖娜", "吕霞", "卢明", "彭涛", "赵娟", "黄娜", "马丽", "汪涛", "阎超", "龚杰", "蔡涛", "武平", "魏强", "康磊", "程芳", "田敏", "赵勇", "任娟", "夏刚", "杜敏", "魏刚", "郝静", "萧涛", "赵霞", "袁敏", "毛杰", "邹超", "康超", "傅杰", "龚涛", "金秀英", "石强", "韩刚", "袁刚", "傅霞", "曾磊", "任杰", "范涛", "石秀英", "高磊", "彭秀兰", "冯平", "秦洋", "李娟", "曹磊", "程敏", "冯秀英", "阎秀英", "石秀英", "冯磊", "戴霞", "廖秀兰", "郭敏", "郝明", "阎秀英", "蒋丽", "田秀英", "赖丽", "熊杰", "黎刚"]
  const nameList = orgList.reduce((result, cur, index) => {
    result.push({value: cur, jcode: `A${index}`});
    return result;
  }, []);

  let data = [];

  if(name === ''){
    data = nameList.slice(0, 10);
  }else{
    const reg = new RegExp(`(?=${name})`, 'g');
    data = orgList.filter(item => {
      return reg.test(item);
    }).slice(0, 10).reduce((result, cur, index) => {
      result.push({value: cur, jcode: `A${index}`});
      return result;
    }, []);
  }

  return data;
}

export default {
  getMounted: (req) => ({
    code: 0,
    data: mountedData()
  }),
  getPilotName: (req) => ({
    code: 0,
    data: filterName(req)
  })
}
