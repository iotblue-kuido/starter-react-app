import {useCallback, useState} from 'react';
import Cervello, {cervelloInstance} from '../index';
import {ListResponse, Options} from 'cervello.js/lib/interfaces/Common';
import {AlarmData, AlarmStatistcs} from 'cervello.js/lib/modules/alarms';
import {UN_INITIALIZED_ERROR} from '../../../shared/helpers/common';
import {Device} from 'cervello.js/lib/modules/devices';
import {Asset} from 'cervello.js/lib/modules/assets';

export interface AlarmsModule {
  getOrganizationAlarms(options?: Options): Promise<ListResponse<AlarmData[]>>;
  getOrganizationAlarmsStatistics(
    options: Options & {group: string},
  ): Promise<ListResponse<AlarmStatistcs[]>>;
  listenToOrganizationAlarms(callback: (alarm: AlarmData) => void): void;
  unListenToOrganizationAlarms(): void;
  getTagAlarms(
    tag: string,
    options?: Options,
  ): Promise<ListResponse<AlarmData[]>>;
  getTagAlarmsStatistics(
    tag: string,
    options?: Options & {group: string},
  ): Promise<ListResponse<AlarmStatistcs[]>>;
  listenToTagAlarms(tag: string, callback: (alarm: AlarmData) => void): void;
  unListenToTagAlarms(tag: string): void;
  getDeviceAlarms(
    deviceId: string,
    options?: Options,
  ): Promise<ListResponse<AlarmData[]>>;
  getDeviceAlarmsStatistics(
    deviceId: string,
    options?: Options & {group: string},
  ): Promise<ListResponse<AlarmStatistcs[]>>;
  listenToDeviceAlarms(
    deviceId: string,
    callback: (alarm: AlarmData) => void,
  ): void;
  unListenToDeviceAlarms(deviceId: string): void;
  getAssetAlarms(
    assetId: string,
    options?: Options,
  ): Promise<ListResponse<AlarmData[]>>;
  getAssetAlarmsStatistics(
    id: string,
    options: Options & {group: string},
  ): Promise<ListResponse<AlarmStatistcs[]>>;
  listenToAssetAlarms(
    assetId: string,
    callback: (alarm: AlarmData) => void,
  ): void;
  unListenToAssetAlarms(assetId: string): void;
  clearAlarm(alarmId: string): Promise<{}>;
  acknowledgeAlarm(alarmId: string): Promise<{}>;
  verifyAlarm(alarmId: string): Promise<{}>;
  ignoreAlarm(alarmId: string): Promise<{}>;
}

export default function useAlarms(): AlarmsModule {
  const [isInitialized, setIsInitialized] = useState<boolean>(
    Cervello.isInitialized,
  );

  Cervello.observeOnInit(() => {
    setIsInitialized(true);
  });

  const getOrganizationAlarms = useCallback(
    (options: any) => {
      if (!isInitialized) {
        return new Promise<ListResponse<AlarmData[]>>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }
      return Cervello.organization.alarms
        .list(options || {})
        .then((result) => result );
    },
    [isInitialized],
  );
  const getOrganizationAlarmsStatistics = useCallback(
    (
      options: Options & {
        group: string;
      },
    ) => {
      if (!isInitialized) {
        return new Promise<ListResponse<AlarmStatistcs[]>>(
          (resolve, reject) => {
            reject(UN_INITIALIZED_ERROR);
          },
        );
      }

      return Cervello.organization.alarms
        .statistics(options || {})
        .then((result) => result );
    },
    [isInitialized],
  );
  const listenToOrganizationAlarms = useCallback(
    (callback: (arg0: AlarmData) => void) => {
      if (!isInitialized) {
        return;
      }

      return Cervello.organization.alarms.listen((alarm: AlarmData) => {
        callback(alarm);
      });
    },
    [isInitialized],
  );
  const unListenToOrganizationAlarms = useCallback(() => {
    if (!isInitialized) {
      return;
    }

    return Cervello.organization.alarms.removeListener();
  }, [isInitialized]);

  const getDeviceAlarms = useCallback(
    (deviceId: string, options: any) => {
      if (!isInitialized) {
        return new Promise<ListResponse<AlarmData[]>>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return new Device({
        id: deviceId,
        organizationId: import.meta.env.REACT_APP_ORGANIZATION_ID,
        name: '',
        deviceType: 'STANDALONE',
        connectivityMedia: 'OTHER',
        communicationProtocol: 'DEFAULT',
        customFields: null,
        lastConnectionStatus: false,
        lastConnectionTime: '',
      }).alarms
        .list(options || {})
        .then((result) => result );
    },
    [isInitialized],
  );

  const getDeviceAlarmsStatistics = useCallback(
    (deviceId: string, options: Options & { group: string; }) => {
      if (!isInitialized) {
        return new Promise<ListResponse<AlarmStatistcs[]>>(
          (resolve, reject) => {
            reject(UN_INITIALIZED_ERROR);
          },
        );
      }

      return new Device({
        id: deviceId,
        organizationId: import.meta.env.VITE_ORGANIZATION_ID,
        name: '',
        deviceType: 'STANDALONE',
        connectivityMedia: 'OTHER',
        communicationProtocol: 'DEFAULT',
        customFields: null,
        lastConnectionStatus: false,
        lastConnectionTime: '',
      }).alarms
        .statistics({pageNumber: 1, pageSize: 10, ...options} || {})
        .then((result) => result );
    },
    [isInitialized],
  );

  const listenToDeviceAlarms = useCallback(
    (deviceId: string, callback: (arg0: AlarmData) => void) => {
      if (!isInitialized) {
        return;
      }

      return new Device({
        id: deviceId,
        organizationId: import.meta.env.VITE_ORGANIZATION_ID,
        name: '',
        deviceType: 'STANDALONE',
        connectivityMedia: 'OTHER',
        communicationProtocol: 'DEFAULT',
        customFields: null,
        lastConnectionStatus: false,
        lastConnectionTime: '',
      }).alarms.listen((alarm: AlarmData) => {
        callback(alarm);
      });
    },
    [isInitialized],
  );
  const unListenToDeviceAlarms = useCallback(
    (deviceId: string) => {
      if (!isInitialized) {
        return;
      }

      return new Device({
        id: deviceId,
        organizationId: import.meta.env.VITE_ORGANIZATION_ID,
        name: '',
        deviceType: 'STANDALONE',
        connectivityMedia: 'OTHER',
        communicationProtocol: 'DEFAULT',
        customFields: null,
        lastConnectionStatus: false,
        lastConnectionTime: '',
      }).alarms.removeListener();
    },
    [isInitialized],
  );

  const getTagAlarms = useCallback(
    (tag: string, options: Options) => {
      if (!isInitialized) {
        return new Promise<ListResponse<AlarmData[]>>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return cervelloInstance.tags
        .alarms({
          params: {
            organizationId: Cervello.params.organizationId || '',
            tag,
          },
        })
        .list(options || {})
        .then((result) => {
          return result ;
        });
    },
    [isInitialized],
  );
  const getTagAlarmsStatistics = useCallback(
    (
      tag: string,
      options: Options & {
        group: string;
      },
    ) => {
      if (!isInitialized) {
        return new Promise<ListResponse<AlarmStatistcs[]>>(
          (resolve, reject) => {
            reject(UN_INITIALIZED_ERROR);
          },
        );
      }

      return cervelloInstance.tags
        .alarms({
          params: {
            organizationId: Cervello.params.organizationId || '',
            tag,
          },
        })
        .statistics(options)
        .then((result) => {
          return result ;
        });
    },
    [isInitialized],
  );
  const listenToTagAlarms = useCallback(
    (tag: any, callback: (arg0: AlarmData) => void) => {
      if (!isInitialized) {
        return;
      }
      try {
        return cervelloInstance.tags
          .alarms({
            params: {
              organizationId: Cervello.params.organizationId || '',
              tag,
            },
          })
          .listen((alarm) => {
            callback(alarm);
          });
      } catch (err: any) {
        console.error(err);
      }
    },
    [isInitialized],
  );
  const unListenToTagAlarms = useCallback(
    (tag: any) => {
      if (!isInitialized) {
        return;
      }

      return cervelloInstance.tags
        .alarms({
          params: {
            organizationId: Cervello.params.organizationId || '',
            tag,
          },
        })
        .removeListener();
    },
    [isInitialized],
  );

  const getAssetAlarms = useCallback(
    (id: string, options: any) => {
      if (!isInitialized) {
        return new Promise<ListResponse<AlarmData[]>>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      // return cervelloInstance.assets
      //   .get({
      //     params: {
      //       organizationId: Cervello.params.organizationId || '',
      //       applicationId: Cervello.params.applicationId || '',
      //       assetId: id,
      //     },
      //   })
      //   .then((asset) => {
      //     return asset.alarms.list(options || {}).then((result) => {
      //       return result as ListResponse<AlarmData[]>;
      //     });
      //   });
      return new Asset({
        id,
        organizationId: Cervello.params.organizationId!,
        applicationId: Cervello.params.applicationId!,
        name: '',
        resourceId: id,
        customFields: null,
      }).alarms.list(options || {});
      // .then((result) => result as ListResponse<AlarmData[]>);
    },
    [isInitialized],
  );
  const getAssetAlarmsStatistics = useCallback(
    (
      id: string,
      options: Options & {
        group: string;
      },
    ) => {
      if (!isInitialized) {
        return new Promise<ListResponse<AlarmStatistcs[]>>(
          (resolve, reject) => {
            reject(UN_INITIALIZED_ERROR);
          },
        );
      }

      // return cervelloInstance.assets
      //   .get({
      //     params: {
      //       organizationId: Cervello.params.organizationId || '',
      //       applicationId: Cervello.params.applicationId || '',
      //       assetId,
      //     },
      //   })
      //   .then((asset) => {
      //     return asset.alarms
      //       .statistics(options || {})
      //       .then((result) => result as ListResponse<AlarmStatistcs[]>);
      //   });
      return new Asset({
        id,
        organizationId: Cervello.params.organizationId!,
        applicationId: Cervello.params.applicationId!,
        name: '',
        resourceId: id,
        customFields: null,
      }).alarms.statistics(options || {});
    },
    [isInitialized],
  );
  const listenToAssetAlarms = useCallback(
    (assetId: any, callback: (arg0: AlarmData) => void) => {
      if (!isInitialized) {
        return;
      }

      return cervelloInstance.assets
        .get({
          params: {
            organizationId: Cervello.params.organizationId || '',
            applicationId: Cervello.params.applicationId || '',
            assetId,
          },
        })
        .then((asset) => {
          return asset.alarms.listen((alarm) => {
            callback(alarm);
          });
        });
    },
    [isInitialized],
  );
  const unListenToAssetAlarms = useCallback(
    (assetId: any) => {
      if (!isInitialized) {
        return;
      }

      return cervelloInstance.assets
        .get({
          params: {
            organizationId: Cervello.params.organizationId || '',
            applicationId: Cervello.params.applicationId || '',
            assetId,
          },
        })
        .then((asset) => {
          return asset.alarms.removeListener();
        });
    },
    [isInitialized],
  );

  const acknowledgeAlarm = useCallback(
    (alarmId: string) => {
      if (!isInitialized) {
        return new Promise<{}>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return Cervello.organization.alarms.acknowledge(alarmId);
    },
    [isInitialized],
  );
  const clearAlarm = useCallback(
    (alarmId: string) => {
      if (!isInitialized) {
        return new Promise<{}>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return Cervello.organization.alarms.clear(alarmId);
    },
    [isInitialized],
  );
  const verifyAlarm = useCallback(
    (alarmId: string) => {
      if (!isInitialized) {
        return new Promise<{}>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return Cervello.organization.alarms.verify(alarmId);
    },
    [isInitialized],
  );
  const ignoreAlarm = useCallback(
    (alarmId: string) => {
      if (!isInitialized) {
        return new Promise<{}>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return Cervello.organization.alarms.ignore(alarmId);
    },
    [isInitialized],
  );

  return {
    getOrganizationAlarms,
    getOrganizationAlarmsStatistics,
    listenToOrganizationAlarms,
    unListenToOrganizationAlarms,
    getDeviceAlarms,
    getDeviceAlarmsStatistics,
    listenToDeviceAlarms,
    unListenToDeviceAlarms,
    getTagAlarms,
    getTagAlarmsStatistics,
    listenToTagAlarms,
    unListenToTagAlarms,
    getAssetAlarms,
    getAssetAlarmsStatistics,
    listenToAssetAlarms,
    unListenToAssetAlarms,
    acknowledgeAlarm,
    clearAlarm,
    verifyAlarm,
    ignoreAlarm,
  };
}
