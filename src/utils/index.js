import CryptoJS from 'crypto-js';
import { AES_CRYPT, MSG_TYPE_STATE_DICT, MSG_STATE_DICT, ORG_MSG_TYPE_STATE_DICT, REASON_STATE_DICT } from 'utils/dict';

export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

// url处理
export function param(json) {
  if (!json) return '';
  return cleanArray(Object.keys(json).map(key => {
    if (json[key] === undefined) return '';
    return encodeURIComponent(key) + '=' +
      encodeURIComponent(json[key]);
  })).join('&');
}

export function param2Obj(url) {
  const search = url.split('?')[1];
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
}

// 日期处理
export function addYear(time, iYear) {
  const tmp = new Date(time.getTime());
  const year = tmp.getFullYear() + iYear;
  tmp.setFullYear(year);
  return tmp;
}
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

export function formatTime(time, option) {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

// 数组
export function fetchFieldToArray(oTargetArray, sKey) {
  return oTargetArray.reduce((acc, cur) => {
    acc.push(cur[sKey]);
    return acc
  }, []);
}
export function fetchFieldFromDict(srcArray, sValue, sValueField, sTextFeild) {
  sValueField = sValueField || 'value';
  sTextFeild = sTextFeild || 'text';
  const result = srcArray.find(curr => curr[sValueField] === sValue + '');
  return result ? result[sTextFeild] : '';
}
export function deDuplication(arr) {
  const temp = {};
  for (let i = 0; i < arr.length; i++) {
    if (!temp[arr[i]]) {
      temp[arr[i]] = true;
    }
  }
  return Object.keys(temp);
}
export function concatAndDeDuplication(arr1, arr2) {
  const arr = arr1.concat(arr2);
  return deDuplication(arr);
}

// 其他
export function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  const difference = to - element.scrollTop;
  const perTick = difference / duration * 10;
  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}
export function html2Text(val) {
  const div = document.createElement('div');
  div.innerHTML = val;
  return div.textContent || div.innerText;
}
export function resetModel(model, assignObject) {
  for (const m in model) {
    const mo = model[m];
    if (typeof mo === 'undefined') {
      model[m] = '';
    } else if (typeof mo === 'number') {
      model[m] = 0;
    } else if (typeof mo === 'boolean') {
      model[m] = false;
    } else if (Array.isArray(mo)) {
      model[m] = [];
    } else if (mo === 'object') {
      model[m] = {};
    } else {
      model[m] = '';
    }
  }
  if (assignObject) {
    Object.assign(model, assignObject);
  }
}
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {};
  }
  if (Array.isArray(source)) {
    return source.slice();
  }
  for (const property in source) {
    if (source.hasOwnProperty(property)) {
      const sourceProperty = source[property];
      if (typeof sourceProperty === 'object') {
        target[property] = objectMerge(target[property], sourceProperty);
        continue;
      }
      target[property] = sourceProperty;
    }
  }
  return target;
}
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone');
  }
  const targetObj = source.constructor === Array ? [] : {};
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      } else {
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}

export function aesEncrypt(str) {
  const key = CryptoJS.enc.Latin1.parse(AES_CRYPT.key);
  const iv = CryptoJS.enc.Latin1.parse(AES_CRYPT.key);

  return CryptoJS.AES.encrypt(str, key, { iv, mode: CryptoJS.mode.CBC }).toString();
}

export function aesDecrypt(encrypted) {
  const key = CryptoJS.enc.Latin1.parse(AES_CRYPT.key);
  const iv = CryptoJS.enc.Latin1.parse(AES_CRYPT.key);

  return CryptoJS.AES.decrypt(encrypted, key, { iv }).toString(CryptoJS.enc.Utf8);
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;
    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function(...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
}

export function arrSort(array){
  let i = 0, len = array.length, j, d;
  for(; i < len; i++){
    for(j = 0; j < len; j++){
      if(Number(array[i].replace(/[^0-9|\\.]+/g, '')) < Number(array[j].replace(/[^0-9|\\.]+/g, ''))){
        d = array[j]; array[j] = array[i]; array[i] = d;
      }
    }
  }

  return array;
}
