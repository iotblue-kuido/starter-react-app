import {useCallback, useState} from 'react';
import Cervello, {cervelloInstance} from '../index';
import {ListResponse, Options} from 'cervello.js/lib/interfaces/Common';
import {
  Event as EventData,
  EventStatistcs,
} from 'cervello.js/lib/modules/events';
import {UN_INITIALIZED_ERROR} from 'shared/helpers/common';

export interface EventsModule {
  getOrganizationEvents(
    options?: Options,
  ): Promise<ListResponse<EventStatistcs[]>>;
  getOrganizationEventsStatistics(
    options: Options & {group: string},
  ): Promise<ListResponse<EventStatistcs[]>>;
  listenToOrganizationEvents(callback: (alarm: EventData) => void): void;
  unListenToOrganizationEvents(): void;
  getTagEvents(
    tag: string,
    options?: Options,
  ): Promise<ListResponse<EventData[]>>;
  getTagEventsStatistics(
    tag: string,
    options?: Options & {group: string},
  ): Promise<ListResponse<EventStatistcs[]>>;
  listenToTagEvents(
    tag: string,
    callback: (alarm: EventData | EventData[]) => void,
  ): void;
  unListenToTagEvents(tag: string): void;
  // getDeviceEvents(
  //   deviceId: string,
  //   options?: Options,
  // ): Promise<ListResponse<EventData[]>>;
  // getDeviceEventsStatistics(
  //   deviceId: string,
  //   options?: Options & {group: string},
  // ): Promise<ListResponse<EventStatistcs[]>>;
  // listenToDeviceEvents(
  //   deviceId: string,
  //   callback: (alarm: EventData) => void,
  // ): void;
  // unListenToDeviceEvents(deviceId: string): void;
  getAssetEvents(
    assetId: string,
    options?: Options,
  ): Promise<ListResponse<EventData[]>>;
  getAssetEventsStatistics(
    id: string,
    options: Options & {group: string},
  ): Promise<ListResponse<EventStatistcs[]>>;
  listenToAssetEvents(
    assetId: string,
    callback: (alarm: EventData) => void,
  ): void;
  unListenToAssetEvents(assetId: string): void;
}

export default function useEvents(): EventsModule {
  const [isInitialized, setIsInitialized] = useState<boolean>(
    Cervello.isInitialized,
  );

  Cervello.observeOnInit(() => {
    setIsInitialized(true);
  });

  const getOrganizationEvents = useCallback(
    (options) => {
      if (!isInitialized) {
        return new Promise<ListResponse<EventData[]>>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return Cervello.organization.events
        .list(options || {})
        .then((result) => result as ListResponse<EventData[]>);
    },
    [isInitialized],
  );
  const getOrganizationEventsStatistics = useCallback(
    (
      options: Options & {
        group: string;
      },
    ) => {
      if (!isInitialized) {
        return new Promise<ListResponse<EventData[]>>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return Cervello.organization.events
        .statistics(options || {})
        .then((result) => result as ListResponse<EventStatistcs[]>);
    },
    [isInitialized],
  );
  const listenToOrganizationEvents = useCallback(
    (callback) => {
      if (!isInitialized) {
        return;
      }

      return Cervello.organization.events.listen((event) => {
        return callback(event);
      });
    },
    [isInitialized],
  );
  const unListenToOrganizationEvents = useCallback(() => {
    if (!isInitialized) {
      return;
    }

    return Cervello.organization.events.removeListener();
  }, [isInitialized]);

  // const getDeviceAlarms = useCallback(
  //   (deviceId: string, options) => {
  //     if (!isInitialized) {
  //       return new Promise<ListResponse<AlarmData[]>>((resolve, reject) => {
  //         reject(UN_INITIALIZED_ERROR);
  //       });
  //     }

  //     return new Device({
  //       id: deviceId,
  //       organizationId: process.env.REACT_APP_ORGANIZATION_ID!,
  //       name: '',
  //       deviceType: 'STANDALONE',
  //       connectivityMedia: 'OTHER',
  //       communicationProtocol: 'DEFAULT',
  //       customFields: null,
  //       lastConnectionStatus: false,
  //       lastConnectionTime: '',
  //     }).alarms
  //       .list(options || {})
  //       .then((result) => result as ListResponse<AlarmData[]>);
  //   },
  //   [isInitialized],
  // );

  // const getDeviceAlarmsStatistics = useCallback(
  //   (deviceId: string, options) => {
  //     if (!isInitialized) {
  //       return new Promise<ListResponse<AlarmStatistcs[]>>(
  //         (resolve, reject) => {
  //           reject(UN_INITIALIZED_ERROR);
  //         },
  //       );
  //     }

  //     return new Device({
  //       id: deviceId,
  //       organizationId: process.env.REACT_APP_ORGANIZATION_ID!,
  //       name: '',
  //       deviceType: 'STANDALONE',
  //       connectivityMedia: 'OTHER',
  //       communicationProtocol: 'DEFAULT',
  //       customFields: null,
  //       lastConnectionStatus: false,
  //       lastConnectionTime: '',
  //     }).alarms
  //       .statistics({pageNumber: 1, pageSize: 10, ...options} || {})
  //       .then((result) => result as ListResponse<AlarmStatistcs[]>);
  //   },
  //   [isInitialized],
  // );

  // const listenToDeviceAlarms = useCallback(
  //   (deviceId: string, callback) => {
  //     if (!isInitialized) {
  //       return;
  //     }

  //     return new Device({
  //       id: deviceId,
  //       organizationId: process.env.REACT_APP_ORGANIZATION_ID!,
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
  // const unListenToDeviceAlarms = useCallback(
  //   (deviceId: string) => {
  //     if (!isInitialized) {
  //       return;
  //     }

  //     return new Device({
  //       id: deviceId,
  //       organizationId: process.env.REACT_APP_ORGANIZATION_ID!,
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

  const getTagEvents = useCallback(
    (tag: string, options: Options) => {
      if (!isInitialized) {
        return new Promise<ListResponse<EventData[]>>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return cervelloInstance.tags
        .events({
          params: {
            organizationId: Cervello.params.organizationId || '',
            tag,
          },
        })
        .list(options || {})
        .then((result) => {
          return result as ListResponse<EventData[]>;
        });
    },
    [isInitialized],
  );
  const getTagEventsStatistics = useCallback(
    (
      tag: string,
      options: Options & {
        group: string;
      },
    ) => {
      if (!isInitialized) {
        return new Promise<ListResponse<EventStatistcs[]>>(
          (resolve, reject) => {
            reject(UN_INITIALIZED_ERROR);
          },
        );
      }

      return cervelloInstance.tags
        .events({
          params: {
            organizationId: Cervello.params.organizationId || '',
            tag,
          },
        })
        .statistics(options)
        .then((result) => {
          return result as ListResponse<EventStatistcs[]>;
        });
    },
    [isInitialized],
  );
  const listenToTagEvents = useCallback(
    (tag, callback) => {
      if (!isInitialized) {
        return;
      }
      try {
        return cervelloInstance.tags
          .events({
            params: {
              organizationId: Cervello.params.organizationId || '',
              tag,
            },
          })
          .listen((event) => {
            callback(event);
            return {};
          });
      } catch (err: any) {
        console.error(err);
      }
    },
    [isInitialized],
  );
  const unListenToTagEvents = useCallback(
    (tag) => {
      if (!isInitialized) {
        return;
      }

      return cervelloInstance.tags
        .events({
          params: {
            organizationId: Cervello.params.organizationId || '',
            tag,
          },
        })
        .removeListener();
    },
    [isInitialized],
  );

  const getAssetEvents = useCallback(
    (id: string, options) => {
      if (!isInitialized) {
        return new Promise<ListResponse<EventData[]>>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return cervelloInstance.assets
        .get({
          params: {
            organizationId: Cervello.params.organizationId || '',
            applicationId: Cervello.params.applicationId || '',
            assetId: id,
          },
        })
        .then((asset) => {
          return asset.events.list(options || {}).then((result) => {
            return result as ListResponse<EventData[]>;
          });
        });
    },
    [isInitialized],
  );
  const getAssetEventsStatistics = useCallback(
    (
      assetId: string,
      options: Options & {
        group: string;
      },
    ) => {
      if (!isInitialized) {
        return new Promise<ListResponse<EventStatistcs[]>>(
          (resolve, reject) => {
            reject(UN_INITIALIZED_ERROR);
          },
        );
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
          return asset.events
            .statistics(options || {})
            .then((result) => result as ListResponse<EventStatistcs[]>);
        });
    },
    [isInitialized],
  );
  const listenToAssetEvents = useCallback(
    (assetId, callback) => {
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
          return asset.events.listen((event) => {
            return callback(event);
          });
        });
    },
    [isInitialized],
  );
  const unListenToAssetEvents = useCallback(
    (assetId) => {
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
          return asset.events.removeListener();
        });
    },
    [isInitialized],
  );

  return {
    getOrganizationEvents,
    getOrganizationEventsStatistics,
    listenToOrganizationEvents,
    unListenToOrganizationEvents,
    getTagEvents,
    getTagEventsStatistics,
    listenToTagEvents,
    unListenToTagEvents,
    getAssetEvents,
    getAssetEventsStatistics,
    listenToAssetEvents,
    unListenToAssetEvents,
    // getDeviceAlarms,
    // getDeviceAlarmsStatistics,
    // listenToDeviceAlarms,
    // unListenToDeviceAlarms,
  };
}
