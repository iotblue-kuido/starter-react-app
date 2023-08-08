import isEqual from 'lodash.isequal';
import xorWith from 'lodash.xorwith';
import isEmpty from 'lodash.isempty';
import intersection from 'lodash.intersection';
import {ERROR_CODES, ERROR_MESSAGES} from './errors';
import {Options, operators} from 'kuido-sdk/lib/interfaces/Common';
import SYSTEMS, {systemsType} from './systems';
import { AlarmData } from 'kuido-sdk/lib/types';

export const isArrayEqual = (x: any[], y: any[]): boolean =>
  isEmpty(xorWith(x, y, isEqual));

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = (): void => {};

export const chunkArray = (myArray: any[], chunkSize: number): any[][] => {
  const arrayLength = myArray.length;
  const tempArray = [];

  for (let index = 0; index < arrayLength; index += chunkSize) {
    const chunk = myArray.slice(index, index + chunkSize);
    tempArray.push(chunk);
  }

  return tempArray;
};

export const generateUniqueId = (): string => {
  return `${Math.floor(
    Math.random() * Math.floor(Math.random() * Date.now()),
  )}`;
};

export const range = (
  start: number,
  step: number,
  length: number,
): number[] => {
  return Array.from(Array(length), (x, index) => start + index * step);
};

export const UN_INITIALIZED_ERROR =
  ERROR_MESSAGES[ERROR_CODES.UN_INITIALIZED_ERROR];

export const filterAlarms = (
  alarms: AlarmData[],
  options?: Options,
): AlarmData[] => {
  if (!options) {
    return alarms;
  }

  if (!options.filters || options.filters.length === 0) {
    return alarms;
  }

  return alarms.filter((alarm) => {
    // check if alarm matching all filters
    return options.filters?.some(({key, operator, value}) => {
      switch (operator) {
        case operators.any:
          return Array.isArray(value)
            ? Boolean(
                intersection(
                  alarm[key as keyof AlarmData] as Array<string>,
                  value,
                ).length,
              )
            : false;
        case operators.in:
          return Array.isArray(value)
            ? value.includes(`${alarm[key as keyof AlarmData]}`)
            : false;
        case operators.contains:
          return Array.isArray(value)
            ? false
            : (
                alarm[key as keyof AlarmData] as string | Array<string>
              ).includes(`${value}`);
        case operators.eq:
          return alarm[key as keyof AlarmData] === value;
        default:
          console.error(
            new Error(
              `Operator "${operator}" is not supported in filtering local alarms!`,
            ),
          );
          return true;
      }
    });
  });
};

export const sortAlarms = (alarms: AlarmData[]): AlarmData[] => {
  // sort alarms by status asc and date desc
  return alarms.sort(
    ({status, startTime}, {status: status2, startTime: startTime2}) =>
      Number(status) - Number(status2) ||
      new Date(startTime2).getTime() - new Date(startTime).getTime(),
  );
};

export enum STATUS_MAP {
  'not_verified',
  'active',
  'acknowledged',
  'false',
}
export enum SEVERTIES_MAP {
  'minor' = 1,
  'major',
  'critical',
}

export const SYSTEMS_TAGS = Object.keys(SYSTEMS);

export const SYSTEMS_COLORS: {[key in keyof typeof systemsType]: string} = {
  maintenance: '#d9e76c',
  waste: '#d9e76c',
  light: '#d9e76c',
  fire: '#fe9a3b',
  modbuspowerstation: '#e58f65',
  scada: '#83bca9',
  digitalSignage: '#b33f62',
  iptv: '#48a9a6',
  screenmonitoring: 'black',
  accesscontrol: 'orange',
  parking: '#48a9a6',
  publicaddress: 'white',
  bms: 'yellow',
  its: 'green',
  fuel: '#d05353',
  cctv: '#d05353',
};

export const injectParamsIntoUrl = <P = {[key: string]: string}>(
  url: string,
  params?: P,
): string => {
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null || value !== undefined) {
        url = url.replace(`:${key}`, encodeURIComponent(value as string));
      }
    });
  }

  return url;
};

export const getTagsSystem = (tags: string[]) =>
  Object.values(SYSTEMS).find((sys) => tags.includes(sys.tag!));

export const replaceUnderscroolBySpace = (word: string) => {
  return word.replaceAll('_', ' ');
};

export const cutLongWords = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + '...';
  } else {
    return text;
  }
};

export const getNestedValue = function (
  obj: Record<string, any> = {},
  targetPath = '',
) {
  for (
    let i = 0, path = targetPath.split('.'), len = path.length;
    i < len;
    i++
  ) {
    obj = obj[path[i]];
  }
  return obj;
};
