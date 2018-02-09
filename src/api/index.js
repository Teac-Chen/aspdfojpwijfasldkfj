import fetch from 'utils/fetch';
import store from 'store';
import { param } from 'utils';

export function fetchData(sUrl, oParams) {
  if (!sUrl || sUrl === '') return;

  return fetch.post(sUrl, oParams, {
    baseURL: store.getters.baseURL, // baseURL
    timeout: 5000 // 请求超时时间
  })
}

export function fetchVoData(sUrl, oParams) {
  if (!sUrl || sUrl === '') return;

  return fetch.post(sUrl, { data: oParams || {} }, {
    baseURL: store.getters.baseURL, // baseURL
    timeout: 5000 // 请求超时时间
  })
}

export function fetchGetVoData(sUrl, oParams) {
  if (!sUrl || sUrl === '') return;

  if(oParams){
    sUrl = sUrl + '?' + param(oParams);
  }

  return fetch.get(sUrl, {
    baseURL: store.getters.baseURL, // baseURL
    timeout: 5000 // 请求超时时间
  })
}

export function downFile(sUrl, oParams) {
  if (!sUrl || sUrl === '') return;

  return fetch.post(sUrl, { data: oParams || {} }, {
    baseURL: store.getters.baseURL, // baseURL
    timeout: 5000 // 请求超时时间
  })
}

