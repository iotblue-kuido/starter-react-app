import {useCallback, useState} from 'react';
import {UN_INITIALIZED_ERROR} from '../../../shared/helpers/common';
import Cervello, {cervelloInstance} from '../index';
import {
  ListResponse,
  Options,
  Reading as Telemetry,
} from 'cervello.js/lib/interfaces/Common';
import {Device} from 'cervello.js/lib/modules/devices';
import {
  ListOptions,
  TelemetriesGroup,
} from 'cervello.js/lib/modules/telemetries';
import {Asset} from 'cervello.js/lib/modules/assets';

export interface TelemetriesModule {
  getTagTelemetries(
    tag: string,
    options?: Options,
  ): Promise<ListResponse<Telemetry[]>>;
  listenToTagTelemetries(
    tag: string,
    callback: (data: Telemetry | Telemetry[]) => void,
  ): void;
  unListenToTagTelemetries(tag: string): void;
  getDeviceTelemetries(
    deviceId: string,
    options?: Options,
  ): Promise<ListResponse<Telemetry[]>>;
  getDeviceTelemetriesGroup(
    deviceId: string,
    options?: Pick<Options, 'pageNumber' | 'pageSize'>,
  ): Promise<ListResponse<TelemetriesGroup[]>>;
  listenToDeviceTelemetries(
    deviceId: string,
    callback: (data: Telemetry | Telemetry[]) => void,
  ): void;
  unListenToDeviceTelemetries(deviceId: string): void;
  getAssetTelemteries(
    assetId: string,
    options?: Options,
  ): Promise<ListResponse<Telemetry[]>>;
  listenToAssetTelemetries(
    deviceId: string,
    callback: (data: Telemetry | Telemetry[]) => void,
  ): void;
  unListenToAssetTelemetries(deviceId: string): void;
}

export default function useTelemetries(): TelemetriesModule {
  const [isInitialized, setIsInitialized] = useState<boolean>(
    Cervello.isInitialized,
  );
  Cervello.observeOnInit(() => {
    setIsInitialized(true);
  });

  const getTagTelemetries = useCallback(
    (tag: string, options: ListOptions) => {
      if (!isInitialized) {
        return new Promise<ListResponse<Telemetry[]>>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return cervelloInstance.tags
        .telemetries({
          params: {organizationId: Cervello.params.organizationId || '', tag},
        })
        .list({
          pageSize: 5000,
          ...options,
        })
        .then((result) => result );
    },
    [isInitialized],
  );

  const listenToTagTelemetries = useCallback(
    (tag: string, callback: (data: Telemetry | Telemetry[]) => void) => {
      if (!isInitialized) {
        return;
      }

      cervelloInstance.tags
        .telemetries({
          params: {organizationId: Cervello.params.organizationId || '', tag},
        })
        .listen((data) => {
          callback(data);
          return {};
        });
    },
    [isInitialized],
  );

  const unListenToTagTelemetries = useCallback(
    (tag: string) => {
      if (!isInitialized) {
        return;
      }

      return cervelloInstance.tags
        .telemetries({
          params: {organizationId: Cervello.params.organizationId || '', tag},
        })
        .removeListener();
    },
    [isInitialized],
  );

  const getDeviceTelemetries = useCallback(
    (deviceId: string, options: ListOptions) => {
      if (!isInitialized) {
        return new Promise<ListResponse<Telemetry[]>>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
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
      }).telemetries
        .list({
          pageSize: 5000,
          ...options,
        })
        .then((result) => result );
    },
    [isInitialized],
  );

  const getDeviceTelemetriesGroup = useCallback(
    (deviceId: string, options: Pick<Options, 'pageNumber' | 'pageSize'>) => {
      if (!isInitialized) {
        return new Promise<ListResponse<TelemetriesGroup[]>>(
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
      }).telemetries
        .group(options)
        .then((result) => result );
    },
    [isInitialized],
  );

  const listenToDeviceTelemetries = useCallback(
    (deviceId: string, callback: (data: Telemetry | Telemetry[]) => void) => {
      if (!isInitialized) {
        return;
      }

      new Device({
        id: deviceId,
        organizationId: import.meta.env.VITE_ORGANIZATION_ID,
        name: '',
        deviceType: 'STANDALONE',
        connectivityMedia: 'OTHER',
        communicationProtocol: 'DEFAULT',
        customFields: null,
        lastConnectionStatus: false,
        lastConnectionTime: '',
      }).telemetries.listen((data) => {
        callback(data);
        return {};
      });
    },
    [isInitialized],
  );

  const unListenToDeviceTelemetries = useCallback(
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
      }).telemetries.removeListener();
    },
    [isInitialized],
  );

  const getAssetTelemteries = useCallback(
    (assetId: string, options: ListOptions) => {
      if (!isInitialized) {
        return new Promise<ListResponse<Telemetry[]>>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return new Asset({
        id: assetId,
        organizationId: import.meta.env.VITE_ORGANIZATION_ID,
        applicationId: import.meta.env.VITE_APPLICATION_ID,
        name: '',
        customFields: null,
      }).telemetries
        .list({
          pageSize: 5000,
          ...options,
        })
        .then((result) => result );
    },
    [isInitialized],
  );

  const unListenToAssetTelemetries = useCallback(
    (assetId: string) => {
      if (!isInitialized) {
        return;
      }

      return new Asset({
        id: assetId,
        organizationId: import.meta.env.VITE_ORGANIZATION_ID,
        applicationId: import.meta.env.VITE_APPLICATION_ID,
        name: '',
        customFields: null,
      }).telemetries.removeListener();
    },
    [isInitialized],
  );
  const listenToAssetTelemetries = useCallback(
    (assetId: string, callback: (data: Telemetry | Telemetry[]) => void) => {
      if (!isInitialized) {
        return;
      }

      new Asset({
        id: assetId,
        organizationId: import.meta.env.VITE_ORGANIZATION_ID,
        applicationId: import.meta.env.VITE_APPLICATION_ID,
        name: '',
        customFields: null,
      }).telemetries.listen((data) => {
        callback(data);
        return {};
      });
    },
    [isInitialized],
  );

  return {
    getTagTelemetries,
    listenToTagTelemetries,
    unListenToTagTelemetries,
    getDeviceTelemetries,
    getDeviceTelemetriesGroup,
    listenToDeviceTelemetries,
    unListenToDeviceTelemetries,
    getAssetTelemteries,
    listenToAssetTelemetries,
    unListenToAssetTelemetries,
  };
}