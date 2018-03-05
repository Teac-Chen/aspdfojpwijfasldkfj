import _ from 'lodash';
import PY from './py';

function exchange(list, j) {
  const temp = list[j];
  list[j] = list[j + 1];
  list[j + 1] = temp;
};

function getValue(tdVal, sortBy) {
  switch (sortBy) {
    case 'int':
      return parseInt(tdVal) || 0;
    case 'float':
      return parseFloat(tdVal) || 0;
    case 'date':
      return Date.parse(tdVal) || 0;
    case 'string':
    default: {
      if (tdVal.toString()) {
        return PY.GetQP(tdVal.toString());
      }

      return tdVal;
    }
  }
}

export default function (list, { sortBy, order, prop }) {
  const cacheList = _.merge([], list);
  const newList = cacheList.reduce((arr, item) => {
    arr.push(getValue(eval('item.' + prop), sortBy));
    return arr;
  }, []);

  const l = newList.length;
  let isExchanged = false;

  for (let i = 0; i < l; i++) {
    isExchanged = false
    for (let j = 0; j < l - 1 - i; j++) {
      // ascending 由小到大
      // descending 由大到小
      const cur = newList[j];
      const next = newList[j + 1];
      const compareRes = order === 'ascending' ? (cur > next) : (cur < next);
      if (compareRes) {
        exchange(cacheList, j);
        exchange(newList, j);
        isExchanged = true;
      }
    }

    if (!isExchanged) break;
  }

  return cacheList;
}
