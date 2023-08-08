import {operators} from 'cervello.js/lib/interfaces/Common';

export const extractIdFromEsri = (id?: string): string | undefined => {
  if (!id) {
    return;
  }
  const [, extractedId] = /{(.*?)}/.exec(id) || [];

  return extractedId?.toLocaleLowerCase();
};

export const getIntegrationIdFromCervello = (id: string): string => {
  return `'{${id.toUpperCase()}}'`;
};

export const activeAlarmsOptions = {
  filters: [
    {
      key: 'status',
      operator: operators.in,
      value: ['0', '1', '2'],
    },
  ],
};
