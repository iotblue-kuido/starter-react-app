import {SystemLayers} from 'shared/interfaces/common';

export enum systemsType {
  'parking' = 'parking',
  'maintenance' = 'maintenance',
  'waste' = 'waste',
  'fire' = 'fire',
  'light' = 'light',
  'modbuspowerstation' = 'modbuspowerstation',
  'scada' = 'scada',
  'digitalSignage' = 'digitalSignage',
  'iptv' = 'iptv',
  'publicaddress' = 'publicAddress',
  'screenmonitoring' = 'screen',
  'accesscontrol' = 'ACont',
  'bms' = 'bms',
  'its' = 'its',
  'fuel' = 'fuel',
  'cctv' = 'cctv',
}

type Systems = {
  [key in keyof typeof systemsType]: SystemLayers & {
    icon: string;
    color?: string;
  };
};

export const BUILDING_LAYERS: SystemLayers = {
  name: 'building',
};

const SYSTEMS: Systems = {
  maintenance: {
    icon: 'public',
    color: undefined,
    name: `الصيانة الدورية`,
  },
  fuel: {
    name: 'Fuel Station',
    tag: 'fuel',
    dashboardURL: '/fuel/',
    icon: 'fuel',
    isEnabled: true,
    color: '#d05353',
  },
  waste: {
    name: 'Waste',
    icon: 'waste',
    tag: 'waste',
    dashboardURL: '/waste',
    isEnabled: true,
    color: '#61A922',
  },
  light: {
    name: 'Lighting System',
    icon: 'light',
    tag: 'light',
    dashboardURL: '/lighting',
    isEnabled: true,
    color: '#d9e76c',
  },
  fire: {
    name: 'Fire',
    tag: 'fire',
    color: '#fe9a3b',
    icon: 'fire',
    dashboardURL: '/fire/',
    isEnabled: true,
  },
  modbuspowerstation: {
    name: 'Power Station',
    icon: 'powerstation',
    dashboardURL: '/powerstations',
    isEnabled: true,
    tag: 'modbuspowerstation',
    color: '#e58f65',
  },

  scada: {
    name: 'Scada System',
    tag: 'scada',
    icon: 'scada',
    dashboardURL: '/scada',
    isEnabled: true,
    color: '#83bca9',
  },

  digitalSignage: {
    name: 'اللافتات',
    icon: 'digitalSignage',
    isEnabled: true,
    color: '#b33f62',
  },
  iptv: {
    name: 'البث التليفزيوني',
    icon: 'iptv',
    isEnabled: true,
    color: '#48a9a6',
  },
  parking: {
    name: 'Parking',
    icon: 'parking',
    tag: 'parking',
    isEnabled: true,
    color: '#48a9a6',
    dashboardURL: '/parking',
  },
  publicaddress: {
    name: 'Public Address',
    icon: 'publicAddress',
    tag: 'publicAddress',
    isEnabled: true,
    color: '#48a9a6',
    dashboardURL: '/publicAddress',
  },
  screenmonitoring: {
    name: 'Screen Monitoring',
    icon: 'screenMointeringIcon',
    isEnabled: true,
    tag: 'screen',
    color: '#48a9a6',
    dashboardURL: '/screenMonitoring',
  },
  accesscontrol: {
    name: 'Access Control',
    icon: 'accessControl',
    isEnabled: true,
    color: '#D9AF27',
    tag: systemsType.accesscontrol,
    dashboardURL: '/accessControl',
  },
  bms: {
    name: 'BMS System',
    tag: 'bms',
    icon: 'bms',
    isEnabled: true,
    color: '#48a9a6',
    dashboardURL: '/bms',
  },
  its: {
    name: 'ادارة المرور',
    icon: 'public',
    isEnabled: true,
    color: '#48a9a6',
  },
  cctv: {
    name: 'CCTV',
    icon: 'camera',
    isEnabled: true,
    color: '#D9AF27',
    tag: systemsType.cctv,
    dashboardURL: '/cctv',
  },
};

export default SYSTEMS;
