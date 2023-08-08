import {useCallback, useState} from 'react';
import Kuido, {kuidoInstance} from '../index';
import {ListResponse, Options} from 'kuido-sdk/lib/interfaces/Common';
import {UN_INITIALIZED_ERROR} from '../../../shared/helpers/common';
import {AlarmStatistcs, AlarmData} from 'kuido-sdk/lib/types';

export interface AlarmsModule {
  getProjectAlarms(options?: Options): Promise<ListResponse<AlarmData[]>>;
  getProjectAlarmsStatistics(
    options: Options & {group: string},
  ): Promise<ListResponse<AlarmStatistcs[]>>;
  listenToProjectAlarms(callback: (alarm: AlarmData) => void): void;
  // unListenToProjectAlarms(): void;
  getAlarmsByThingsProfile(
    thingsProfileId: string,
    options?: Options,
  ): Promise<ListResponse<AlarmData[]>>;
  getAlarmsStatisticsByThingsProfile(
    thingsProfileId: string,
    options?: Options & {group: string},
  ): Promise<ListResponse<AlarmStatistcs[]>>;
  listenToLabelAlarms(label: string, callback: (alarm: AlarmData) => void): void;
  // unListenToLabelAlarms(label: string): void;
  // getThingAlarms(
  //   thingId: string,
  //   options?: Options,
  // ): Promise<ListResponse<AlarmData[]>>;
  // getThingAlarmsStatistics(
  //   thingId: string,
  //   options?: Options & {group: string},
  // ): Promise<ListResponse<AlarmStatistcs[]>>;
  // listenToThingAlarms(
  //   thingId: string,
  //   callback: (alarm: AlarmData) => void,
  // ): void;
  // unListenToThingAlarms(thingId: string): void;
}

export default function useAlarms(): AlarmsModule {
  const [isInitialized, setIsInitialized] = useState<boolean>(
    Kuido.isInitialized,
  );

  Kuido.observeOnInit(() => {
    setIsInitialized(true);
  });

  const getProjectAlarms = useCallback(
    (options: any) => {
      if (!isInitialized) {
        return new Promise<ListResponse<AlarmData[]>>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }
      return Kuido.project.alarms
        .list(options || {})
        .then((result) => result );
    },
    [isInitialized],
  );
  const getProjectAlarmsStatistics = useCallback(
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

      return Kuido.project.alarms
        .statistics(options || {})
        .then((result) => result );
    },
    [isInitialized],
  );
  const listenToProjectAlarms = useCallback(
    (callback: (arg0: AlarmData) => void) => {
      if (!isInitialized) {
        return;
      }

      return Kuido.project.alarms.listen((alarm: AlarmData) => {
        callback(alarm);
      });
    },
    [isInitialized],
  );

  

  // const unListenToProjectAlarms = useCallback(() => {
  //   if (!isInitialized) {
  //     return;
  //   }

  //   return Kuido.project.alarms.removeListener();
  // }, [isInitialized]);

  // const getThingAlarms = useCallback(
  //   (deviceId: string, options: any) => {
  //     if (!isInitialized) {
  //       return new Promise<ListResponse<AlarmData[]>>((resolve, reject) => {
  //         reject(UN_INITIALIZED_ERROR);
  //       });
  //     }

  //     return new Thing({
  //       id: deviceId,
  //       projectId: import.meta.env.VITE_APPLICATION_ID,
  //       name: '',
  //       deviceType: 'STANDALONE',
  //       connectivityMedia: 'OTHER',
  //       communicationProtocol: 'DEFAULT',
  //       customFields: null,
  //       lastConnectionStatus: false,
  //       lastConnectionTime: '',
  //     }).alarms
  //       .list(options || {})
  //       .then((result) => result );
  //   },
  //   [isInitialized],
  // );

  // const getThingAlarmsStatistics = useCallback(
  //   (deviceId: string, options: Options & { group: string; }) => {
  //     if (!isInitialized) {
  //       return new Promise<ListResponse<AlarmStatistcs[]>>(
  //         (resolve, reject) => {
  //           reject(UN_INITIALIZED_ERROR);
  //         },
  //       );
  //     }

  //     return new Device({
  //       id: deviceId,
  //       projectId: import.meta.env.VITE_APPLICATION_ID,
  //       name: '',
  //       deviceType: 'STANDALONE',
  //       connectivityMedia: 'OTHER',
  //       communicationProtocol: 'DEFAULT',
  //       customFields: null,
  //       lastConnectionStatus: false,
  //       lastConnectionTime: '',
  //     }).alarms
  //       .statistics({offset: 1, limit: 10, ...options, groupBy:"mina"} || {})
  //       .then((result) => result );
  //   },
  //   [isInitialized],
  // );
  // const listenToThingAlarms = useCallback(
  //   (deviceId: string, callback: (arg0: AlarmData) => void) => {
  //     if (!isInitialized) {
  //       return;
  //     }

  //     return new Device({
  //       id: deviceId,
  //       projectId: import.meta.env.VITE_APPLICATION_ID,
  //       name: '',
  //       deviceType: 'STANDALONE',
  //       connectivityMedia: 'OTHER',
  //       communicationProtocol: 'DEFAULT',
  //       customFields: null,
  //       lastConnectionStatus: false,
  //       lastConnectionTime: '',
  //     }).alarms.listen((alarm: AlarmData) => {
  //       callback(alarm);
  //     });
  //   },
  //   [isInitialized],
  // );
  // const unListenToThingAlarms = useCallback(
  //   (deviceId: string) => {
  //     if (!isInitialized) {
  //       return;
  //     }

  //     return new Device({
  //       id: deviceId,
  //       projectId: import.meta.env.VITE_APPLICATION_ID,
  //       name: '',
  //       deviceType: 'STANDALONE',
  //       connectivityMedia: 'OTHER',
  //       communicationProtocol: 'DEFAULT',
  //       customFields: null,
  //       lastConnectionStatus: false,
  //       lastConnectionTime: '',
  //     }).alarms.removeListener();
  //   },
  //   [isInitialized],
  // );

  const getAlarmsByThingsProfile = useCallback(
    (label: string, options: Options) => {
      if (!isInitialized) {
        return new Promise<ListResponse<AlarmData[]>>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return kuidoInstance.labels
        .alarms({
          params: {
            projectId: Kuido.params.projectId || '',
            label,
          },
        })
        .list(options || {})
        .then((result) => {
          return result ;
        });
    },
    [isInitialized],
  );
  const getAlarmsStatisticsByThingsProfile = useCallback(
    (
      label: string,
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

      return kuidoInstance.labels
        .alarms({
          params: {
            projectId: Kuido.params.projectId || '',
            label,
          },
        })
        .statistics(options)
        .then((result) => {
          return result ;
        });
    },
    [isInitialized],
  );
  const listenToLabelAlarms = useCallback(
    (label: any, callback: (arg0: AlarmData) => void) => {
      if (!isInitialized) {
        return;
      }
      try {
        return kuidoInstance.labels
          .alarms({
            params: {
              projectId: Kuido.params.projectId || '',
              label,
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
  // const unListenToLabelAlarms = useCallback(
  //   (label: string) => {
  //     if (!isInitialized) {
  //       return;
  //     }

  //     return kuidoInstance.labels
  //       .alarms({
  //         params: {
  //           projectId: Kuido.params.projectId || '',
  //           label,
  //         },
  //       })
  //       .removeListener();
  //   },
  //   [isInitialized],
  // );

  return {
    getProjectAlarms,
    getProjectAlarmsStatistics,
    listenToProjectAlarms,
    // unListenToProjectAlarms,
    // getThingAlarms,
    // getThingAlarmsStatistics,
    // listenToThingAlarms,
    // unListenToThingAlarms,
    getAlarmsByThingsProfile,
    getAlarmsStatisticsByThingsProfile,
    listenToLabelAlarms,
    // unListenToLabelAlarms,
  };
}
