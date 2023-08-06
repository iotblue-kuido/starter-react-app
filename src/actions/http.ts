import axios, {AxiosError} from 'axios';
import Qs from 'qs';
import {injectParamsIntoUrl} from '../shared/helpers/common';
import URLS from '../shared/helpers/urls';
export interface ApiResult<R> {
  result: {
    data: R;
    pageNumber: number;
    pageSize: number;
    totalCount: number;
  };
}
export interface ListResponse<R> extends ApiResult<R> {
  pageNmber: number;
  pageSize: number;
}
export const authorizationToken = {
  get: (): string => instance.defaults.headers['Authorization'],
  set: (token: string): void => {
    instance.defaults.headers['Authorization'] = `Bearer ${token}`;
  },
  remove: (): void => {
    delete instance.defaults.headers['Authorization'];
  },
};

const baseUrl = URLS.lightBaseMiddleWare;
const token = '';

const instance = axios.create({
  baseURL: baseUrl,
  paramsSerializer: function (params) {
    return Qs.stringify(params, {
      arrayFormat: 'indices',
      allowDots: false,
      encode: true,
    });
  },
  headers: {Authorization: `Bearer  ${token}`},
});

export const get = <R>(
  url: string,
  options?: {
    baseUrl?: string;
    params?: {[key: string]: any};
    body?: {[key: string]: any};
    auth?: {username: string; password: string};
  },
  params?: {[key: string]: any},
): Promise<R> => {
  const injectedUrl = injectParamsIntoUrl(url, params);
  // const searchParams = new URLSearchParams();

  // if (options?.params) {
  //   Object.entries(options.params).forEach(([key, value]) => {
  //     searchParams.append(key, value);
  //   });
  // }
  // console.log('SEEARCH PARAMS ', searchParams);
  return instance
    .get(injectedUrl, {
      params: params,
      data: options?.body,
      auth: options?.auth,
      baseURL: options?.baseUrl || baseUrl,
    })
    .then((response) => response.data);
};

export const post = <R>(
  url: string,
  options?: {baseUrl?: string; body?: {[key: string]: any}},
  params?: {[key: string]: string},
): Promise<R> => {
  const injectedUrl = injectParamsIntoUrl(url, params);

  return instance
    .post(injectedUrl, options?.body || {}, {
      baseURL: options?.baseUrl || baseUrl,
    })
    .then((response) => response.data);
};

export const put = <R>(
  url: string,
  options?: {baseUrl?: string; body?: {[key: string]: any}},
  params?: {[key: string]: string | number},
): Promise<R> => {
  const injectedUrl = injectParamsIntoUrl(url, params);

  return instance
    .put(injectedUrl, options?.body || {}, {
      baseURL: options?.baseUrl || baseUrl,
    })
    .then((response) => response.data)
    .catch(async (error: AxiosError) => {
      const parsedError = error.response?.data;
      throw parsedError;
    });
};

export const delete2 = <R>(
  url: string,
  params?: {[key: string]: string},
): Promise<R> => {
  const injectedUrl = injectParamsIntoUrl(url, params);
  return instance.delete(injectedUrl);
};