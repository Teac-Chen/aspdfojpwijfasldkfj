// 航班状态
export const FLIGHT_STATE_DICT = [
  { text: '未完成的航班', value: 'NotCompleted' },
  { text: '取消', value: 'Cancel' },
  { text: '备降', value: 'Alternate' },
  { text: '返航', value: 'Return' }
];

// FPN数据状态
export const FPN_STATE_DICT = [
  { text: '无航路数据', value: 'No Route', icon_name: '', color: '#BFBFBF' },
  { text: '新数据可上传', value: 'New Available', icon_name: 'green', color: '#5AA966' },
  { text: '正在上传...', value: 'Uploading', icon_name: 'spinner', color: '#B1B1B1' },
  { text: '已上传', value: 'Updated', icon_name: 'blue', color: '#06DAFE' },
  { text: '上传失败', value: 'Upload Failed', icon_name: 'warning', color: '' } // #FF0204
];

// PWI数据状态
export const PWI_STATE_DICT = [
  { text: '无航路数据', value: 'No Route', icon_name: '', color: '#BFBFBF' },
  { text: '新数据可上传', value: 'New Available', icon_name: 'green', color: '#5AA966' },
  { text: '正在上传...', value: 'Uploading', icon_name: 'spinner', color: '#B1B1B1' },
  { text: '已上传', value: 'Updated', icon_name: 'blue', color: '#06DAFE' },
  { text: '数据可更新', value: 'Up to Date', icon_name: '' },
  { text: '数据过期', value: 'Out of Date', icon_name: 'red', color: '' },
  { text: '上传失败', value: 'Upload Failed', icon_name: 'warning', color: '' }
];

// 报文类型
export const MSG_TYPE_STATE_DICT = [
  { text: 'REQFPN', value: '0', desc: '航路下行报' },
  { text: 'REQPER', value: '1', desc: '初始化下行报' },
  { text: 'REQPWI', value: '2', desc: '风温下行报' },
  { text: 'REQLDI', value: '3', desc: '起飞性能下行报' },
  { text: 'REQLANDING', value: '3', desc: '着陆性能下行报' },
  { text: 'CMD', value: '4', desc: '自由报' },
  { text: 'ORIGIN', value: '5', desc: '原始报文' }
];

// 原始报文-报文类型
export const ORG_MSG_TYPE_STATE_DICT = [
  { text: 'REQFPN', value: '0', desc: '航路下行报' },
  { text: 'FPN', value: '1', desc: '航路上行报' },
  { text: 'REQPER', value: '2', desc: '初始化下行报' },
  { text: 'PER', value: '3', desc: '初始化上行报' },
  { text: 'REQPWI', value: '4', desc: '风温下行报' },
  { text: 'PWI', value: '5', desc: '风温上行报' },
  { text: 'REQLDI', value: '6', desc: '起飞性能下行报' },
  { text: 'LDI', value: '7', desc: '起飞性能上行报' },
  { text: 'REQLANDING', value: '6', desc: '着陆性能下行报' },
  { text: 'LANDING', value: '7', desc: '着陆性能上行报' },
  { text: 'CMD', value: '8', desc: '自由报' },
  { text: 'MAS', value: '9', desc: '通道响应' },
  { text: 'REJFPN', value: '10', desc: '拒绝航路报' },
  { text: 'REJPER', value: '11', desc: '拒绝初始化报' },
  { text: 'REJPWI', value: '12', desc: '拒绝风温报' },
  { text: 'REJLDI', value: '13', desc: '拒绝性能报' },
  { text: 'RESFPN', value: '14', desc: '飞机响应航路报' },
  { text: 'RESPER', value: '15', desc: '飞机响应初始化报' },
  { text: 'RESPWI', value: '16', desc: '飞机响应风温报' },
  { text: 'RESLDI', value: '17', desc: '飞机响应性能报' },
  { text: 'ORIGIN', value: '18', desc: '原始报文' },
  { text: 'TEST', value: '19', desc: '测试报文' }
];

// 报文状态
export const MSG_STATE_DICT = [
  { text: 'REQ', value: '0', desc: '请求' },
  { text: 'REQFAIL', value: '1', desc: '请求失败' },
  { text: 'SEND', value: '2', desc: '已发送' },
  { text: 'SENDFAIL', value: '3', desc: '发送失败' },
  { text: 'DSPAK', value: '4', desc: 'MAS识别' },
  { text: 'DSPAC', value: '5', desc: 'MAS接收' },
  { text: 'DSPX', value: '6', desc: 'MAS不支持' },
  { text: 'DSPF', value: '7', desc: 'MAS不能传输' },
  { text: 'AK', value: '8', desc: '飞机识别' },
  { text: 'AC', value: '9', desc: '飞机接收' },
  { text: 'RJ', value: '10', desc: '飞机拒绝' }
];

// 错误原因
export const REASON_STATE_DICT = [
  { value: '0', text: '飞机下行报文超时' },
  { value: '1', text: '飞机下行报文无定义' },
  { value: '2', text: '飞机下行报文处理成功' },

  { value: '10', text: '请求前置系统接口失败' },
  { value: '11', text: '请求前置系统接口超时' },
  { value: '12', text: '请求前置系统接口超时' },

  { value: '20', text: '报文下行成功' },
  { value: '21', text: '报文未授权' },
  { value: '22', text: '报文授权失效' },
  { value: '23', text: '获取不到航班' },
  { value: '24', text: '报文对应的航班状态不允许或者未配置' },
  { value: '25', text: '航班未在报文允许的时间范围' },
  { value: '26', text: '无对应报文处理服务' },
  { value: '27', text: '请求航班不匹配' },

  { value: '40', text: '请求报文处理服务成功' },
  { value: '41', text: '请求报文处理服务失败' },
  { value: '42', text: '请求报文处理服务超时' },
  { value: '43', text: '服务正常处理' },
  { value: '44', text: '拒绝飞行中的报文请求' },
  { value: '45', text: '拒绝航班未放行的报文请求' },
  { value: '46', text: '航班参数缺失' },
  { value: '47', text: '请联系签派进行手工上传' },

  { value: '60', text: '上行报文解析错误' },
  { value: '61', text: '上行报文组装成功' },
  { value: '62', text: '上行报文组装失败' },
  { value: '63', text: '上行报文发送成功' },
  { value: '64', text: '上行报文发送失败' },

  { value: '70', text: '上行报文DSP设备确认' },
  { value: '71', text: '上行报文DSP设备收到' },
  { value: '72', text: '上行报文DSP不支持' },
  { value: '73', text: '上行报文DSP不能传输' },

  { value: '80', text: '上行报文飞机FMS设备收到' },
  { value: '81', text: '上行报文飞机FMS设备确认' },
  { value: '82', text: '上行报文飞机FMS设备拒绝' },

  { value: '99', text: '服务内部错误' }
];
// 效益项目
export const BENEFIT_ITEM_DICT = [
  { value: 'FPN', text: '航路上传' },
  { value: 'PWI', text: '巡航段风温' },
  { value: 'PWI', text: '下降段风温' },
  { value: 'LDI', text: '上传起飞性能' },
  { value: 'LANDING', text: '上传着陆性能' },
  { value: 'CCC', text: '刹车能量余度提醒' },
  { value: 'DDD', text: '离地轮速余度提醒' },
  { value: 'EEE', text: '起飞中断距离余度提醒' },
  { value: 'FFF', text: '着陆距离余度提醒' }
];

// 空调开关
export const STATE_AC_DICT = [
  { value: '0', text: 'AUTO' },
  { value: '2', text: 'OFF' }
];
// 改进爬升(波音)
export const IMPROVE_CLIMB_DICT = [
  { value: '1', text: 'YES' },
  { value: '2', text: 'NO' }
];
// 防滞刹车(波音)
export const ANTI_SKID_DICT = [
  { value: '0', text: 'On' },
  { value: '2', text: 'Inoperative' }
];
// 起飞襟翼(波音)
export const TAKEOFF_FLAP_DICT = ['1', '5', '10', '15', '25'];
// 起飞构型(空客)
export const TKO_MODAL_DICT = ['Auto Max', 'CONF 1+F', 'CONF 2', 'CONF 3'];

// 进近襟翼(波音)
export const APPROACH_FLAP_B_DICT = ['1', '15'];
// 着陆襟翼(波音)
export const LANDING_FLAP_B_DICT = ['15', '30', '40'];
// 进近襟翼(空客)
export const APPROACH_FLAP_K_DICT = ['CONF 1+F', 'CONF 2', 'CONF 3'];
// 着陆襟翼(空客)
export const LANDING_FLAP_K_DICT = ['3', 'FULL'];

// 跑道专用情况
export const RUNWAY_STATE_DICT = [
  { value: '1', text: '仅起飞' },
  { value: '2', text: '仅着陆' },
  { value: '3', text: '禁用' }
];

// AES加密
export const AES_CRYPT = {
  key: '1234567890abcdef'
}
