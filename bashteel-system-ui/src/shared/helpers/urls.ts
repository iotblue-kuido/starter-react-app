const URLS = {
  apiBaseUrl: 'api/v1',
  cctvBaseMiddleWare: import.meta.env.VITE_CCTV_MIDDLEWARE_URL,
  lightBaseMiddleWare: import.meta.env.VITE_LIGHT_MIDDLEWARE_URL,
  fireBaseMiddleWare: import.meta.env.VITE_FIRE_MIDDLEWARE_URL,
  fuelBaseMiddleWare: import.meta.env.VITE_FUEL_MIDDLEWARE_URL,
  iconsBaseUrl: `${import.meta.env.PUBLIC_URL}/assets/icons`,
  sopBaseUrl: import.meta.env.VITE_SOP_MIDDLEWARE_URL,
  wasteBaseMiddleWare: import.meta.env.VITE_WASTE_MIDDLEWARE_URL,
  accessControlMiddleWare: import.meta.env.VITE_ACCESS_CONTROL_MIDDLEWARE_URL,
  maintenanceMiddleWare: `${import.meta.env.VITE_MENTENANCE_MIDDLEWARE_URL}/organizations/${import.meta.env.VITE_ORGANIZATION_ID}/applications/${import.meta.env.VITE_APPLICATION_ID}`,
  ReportsMiddleWare: `${import.meta.env.VITE_REPORTING_MIDDLEWARE_URL}/api/v1/organizations/${import.meta.env.VITE_ORGANIZATION_ID}/applications/${import.meta.env.VITE_APPLICATION_ID}`,
};
export default URLS;
