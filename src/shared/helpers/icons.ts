import URLS from './urls';

const ICONS = {
  accessControl: `${URLS.iconsBaseUrl}/access_control.png`,
  accessControlDoor: `${URLS.iconsBaseUrl}/access_control_door.png`,
  severity: `${URLS.iconsBaseUrl}/severity.svg`,
  status: `${URLS.iconsBaseUrl}/status.svg`,
  calendar: `${URLS.iconsBaseUrl}/calendar.svg`,
  schedule: `${URLS.iconsBaseUrl}/schedule.svg`,
  selectedSchedule: `${URLS.iconsBaseUrl}/schedule-selected.svg`,
  system: `${URLS.iconsBaseUrl}/system.svg`,
  outlineFire: `${URLS.iconsBaseUrl}/outline-fire.svg`,
  outlineLighting: `${URLS.iconsBaseUrl}/outline-lighting.svg`,
  outlineBMS: `${URLS.iconsBaseUrl}/outline-bms.svg`,
  outlinePA: `${URLS.iconsBaseUrl}/outline-pa.svg`,
  outlineScada: `${URLS.iconsBaseUrl}/outline-scada.svg`,
  outlineDS: `${URLS.iconsBaseUrl}/outline-ds.svg`,
  outlinePetrostation: `${URLS.iconsBaseUrl}/outline-petrostation.svg`,
  outlineIPTV: `${URLS.iconsBaseUrl}/outline-iptv.svg`,
  monitor: `${URLS.iconsBaseUrl}/monitor-system.svg`,
  selectedMonitor: `${URLS.iconsBaseUrl}/selected-monitor-system.svg`,
  settings: `${URLS.iconsBaseUrl}/settings.svg`,
  selectedSettings: `${URLS.iconsBaseUrl}/selected-settings.svg`,
  clipboards: `${URLS.iconsBaseUrl}/clipboards.svg`,
  selectedClipboard: `${URLS.iconsBaseUrl}/selected-clipboards.svg`,
  plus: `${URLS.iconsBaseUrl}/plus.svg`,
  plusCircle: `${URLS.iconsBaseUrl}/add.svg`,
  minus: `${URLS.iconsBaseUrl}/minus.svg`,
  more: `${URLS.iconsBaseUrl}/more.svg`,
  city: `${URLS.iconsBaseUrl}/city.svg`,
  selectedCity: `${URLS.iconsBaseUrl}/city-selected.svg`,
  controller: `${URLS.iconsBaseUrl}/controller.png`,
  connectedControllers: `${URLS.iconsBaseUrl}/controller-connected.png`,
  disconnectedControllers: `${URLS.iconsBaseUrl}/controller-disconnected.png`,
  controlerBlack: `${URLS.iconsBaseUrl}/lightControler-black.png`,
  controlerGreen: `${URLS.iconsBaseUrl}/lightControler-green.png`,
  controlerRed: `${URLS.iconsBaseUrl}/lightControler-red.png`,
  passiveControllers: `${URLS.iconsBaseUrl}/controller-standalone.png`,
  accessControlControllers: `${URLS.iconsBaseUrl}/accessControlController.png`,
  odlb: `${URLS.iconsBaseUrl}/odlb.png`,
  odlbBackground: `${URLS.iconsBaseUrl}/odlb-background.png`,
  odlpError: `${URLS.iconsBaseUrl}/odlp-error.png`,
  odlpConnected: `${URLS.iconsBaseUrl}/odlp-on.png`,
  odlpDisconnected: `${URLS.iconsBaseUrl}/odlp-off.png`,
  odlpSelected: `${URLS.iconsBaseUrl}/odlp-selected.png`,
  smartOdlpError: `${URLS.iconsBaseUrl}/smart-odlp-error.png`,
  smartOdlpConnected: `${URLS.iconsBaseUrl}/smart-odlp-on.png`,
  smartOdlpDisconnected: `${URLS.iconsBaseUrl}/smart-odlp-off.png`,
  smartOdlpSelected: `${URLS.iconsBaseUrl}/smart-odlp-selected.png`,
  selectedControllers: `${URLS.iconsBaseUrl}/controller-selected.png`,
  camera: `${URLS.iconsBaseUrl}/camera.png`,
  cctv: `${URLS.iconsBaseUrl}/camera.png`,
  connectedCameras: `${URLS.iconsBaseUrl}/camera-connected.png`,
  disconnectedCameras: `${URLS.iconsBaseUrl}/camera-disconnected.svg`,
  passiveCameras: `${URLS.iconsBaseUrl}/camera-standalone.svg`,
  selectedCameras: `${URLS.iconsBaseUrl}/camera-selected.png`,
  connectedPoles: `${URLS.iconsBaseUrl}/pole-connected.png`,
  disconnectedPoles: `${URLS.iconsBaseUrl}/pole-disconnected.png`,
  passivePoles: `${URLS.iconsBaseUrl}/pole-standalone.png`,
  selectedPoles: `${URLS.iconsBaseUrl}/pole-selected.png`,
  smartPoleConnected: `${URLS.iconsBaseUrl}/smart-pole-on.png`,
  smartPoleDisconnected: `${URLS.iconsBaseUrl}/smart-pole-error.png`,
  smartPolePassive: `${URLS.iconsBaseUrl}/smart-pole-off.png`,
  smartPoleSelected: `${URLS.iconsBaseUrl}/smart-pole-selected.png`,
  arrow: `${URLS.iconsBaseUrl}/arrow.svg`,
  arrowCircle: `${URLS.iconsBaseUrl}/arrow-circle.svg`,
  light: `${URLS.iconsBaseUrl}/lighting.png`,
  hand: `${URLS.iconsBaseUrl}/hand.svg`,
  selectedHand: `${URLS.iconsBaseUrl}/hand-selected.svg`,
  selectedSchedules: `${URLS.iconsBaseUrl}/schedule-selected.svg`,
  delete: `${URLS.iconsBaseUrl}/bin.svg`,
  edit: `${URLS.iconsBaseUrl}/pen.svg`,
  close: `${URLS.iconsBaseUrl}/close.svg`,
  correct: `${URLS.iconsBaseUrl}/correct.svg`,
  fuelPoint: `${URLS.iconsBaseUrl}/fuel-point.jpg`,
  fuel: `${URLS.iconsBaseUrl}/fuel.png`,
  fuelTank: `${URLS.iconsBaseUrl}/fuel-tank.jpg`,
  maintenance: `${URLS.iconsBaseUrl}/maintenance.svg`,
  'lighting-alarm': `${URLS.iconsBaseUrl}/lighting-alarm.gif`,
  'alarms-marker': `${URLS.iconsBaseUrl}/alarms-marker.png`,
  Heat: `${URLS.iconsBaseUrl}/device-heat.png`,
  Smoke: `${URLS.iconsBaseUrl}/device-smoke.png`,
  'multi-sensor': `${URLS.iconsBaseUrl}/multi-sensor.png`,
  'Pull Station': `${URLS.iconsBaseUrl}/device-manual.png`,
  'fire-station': `${URLS.iconsBaseUrl}/fire-station.png`,
  fire: `${URLS.iconsBaseUrl}/fire.png`,
  bms: `${URLS.iconsBaseUrl}/bms.svg`,
  scada: `${URLS.iconsBaseUrl}/scada.svg`,
  turnstile: `${URLS.iconsBaseUrl}/turnstile.png`,
  pa: `${URLS.iconsBaseUrl}/pa.svg`,
  digitalSignage: `${URLS.iconsBaseUrl}/digitalSignage.png`,
  iptv: `${URLS.iconsBaseUrl}/iptv.png`,
  'iptv-disconnected': `${URLS.iconsBaseUrl}/iptv_disconnected.png`,
  'iptv-connected': `${URLS.iconsBaseUrl}/iptv_connected.png`,
  drag: `${URLS.iconsBaseUrl}/drag-handle.svg`,
  panel: `${URLS.iconsBaseUrl}/fire-panel.png`,
  beamSensor: `${URLS.iconsBaseUrl}/beam.png`,
  warning: `${URLS.iconsBaseUrl}/warning.png`,
  critical: `${URLS.iconsBaseUrl}/critical.png`,
  connected: `${URLS.iconsBaseUrl}/connected.png`,
  disConnected: `${URLS.iconsBaseUrl}/disconnected.png`,
  major: `${URLS.iconsBaseUrl}/major.png`,
  minor: `${URLS.iconsBaseUrl}/minor.png`,
  logo: `${URLS.iconsBaseUrl}/logo.png`,
  signOut: `${URLS.iconsBaseUrl}/signOut.svg`,
  notifications: `${URLS.iconsBaseUrl}/notifications.svg`,
  dashboard: `${URLS.iconsBaseUrl}/dashboard.svg`,
  modbuspowerstation: `${URLS.iconsBaseUrl}/powerStations.png`,
  powerstation: `${URLS.iconsBaseUrl}/powerStations.png`,
  waste: `${URLS.iconsBaseUrl}/waste.png`,
  wasteGreen: `${URLS.iconsBaseUrl}/wasteGreen.png`,
  wasteYellow: `${URLS.iconsBaseUrl}/wasteYellow.png`,
  wasteRed: `${URLS.iconsBaseUrl}/wasteRed.png`,
  wasteGrey: `${URLS.iconsBaseUrl}/wasteGrey.png`,
  publicAddress: `${URLS.iconsBaseUrl}/public_address_1.png`,
  scada_water: `${URLS.iconsBaseUrl}/scada_water.png`,
  scada_electricity: `${URLS.iconsBaseUrl}/scada_electricity.jpeg`,
  scada_irrigation: `${URLS.iconsBaseUrl}/scada_irrigation.jpeg`,
  scada_sewage: `${URLS.iconsBaseUrl}/scada_sewage.png`,
  waterIcon: `${URLS.iconsBaseUrl}/waterIcon.png`,
  sewageIcon: `${URLS.iconsBaseUrl}/sewageIcon.png`,
  irrigationIcon: `${URLS.iconsBaseUrl}/irrigationIcon.png`,
  electricityIcon: `${URLS.iconsBaseUrl}/electricityIcon.png`,
  rtuIcon: `${URLS.iconsBaseUrl}/rtuIcon.png`,
  screenMointeringIcon: `${URLS.iconsBaseUrl}/screenMoniterring.png`,
  whiteCircleIcon: `${URLS.iconsBaseUrl}/whiteCircle.png`,
  bmsLight: `${URLS.iconsBaseUrl}/bmsLight.png`,
  bmsHvac: `${URLS.iconsBaseUrl}/bmsHvac.png`,
  preventiveMaintenance: `${URLS.iconsBaseUrl}/preventiveMaintenance.png`,
  parking: `${URLS.iconsBaseUrl}/parking.png`,
  uBox: `${URLS.iconsBaseUrl}/ubox.png`,
  uFlag: `${URLS.iconsBaseUrl}/uflag.png`,
  'preventive-maintenance': `${URLS.iconsBaseUrl}/maintenance.png`,
  huawei: `${URLS.iconsBaseUrl}/huawei.png`,
  noImagePreview: `${URLS.iconsBaseUrl}/noImagePreview.png`,
  parkingDemo: `${URLS.iconsBaseUrl}/parkingDemo.png`,
  car: `${URLS.iconsBaseUrl}/car.png`,
};
export default ICONS;
