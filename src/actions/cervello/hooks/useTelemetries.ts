import {useCallback, useState} from 'react';
import {UN_INITIALIZED_ERROR} from '../../../shared/helpers/common';
import Cervello, {cervelloInstance} from '../index';
import {
  ListResponse,
  Options,
  Reading as Telemetry,
} from 'cervello.js/lib/interfaces/Common';
import {Device} from 'cervello.js/lib/modules/devices';
import {TelemetriesGroup} from 'cervello.js/lib/modules/telemetries';
import {Asset} from 'cervello.js/lib/modules/assets';

export interface TelemetriesModule {
  getTagTelemetries(
    tag: string,
    options?: Options,
  ): Promise<ListResponse<Telemetry[]>>;
  listenToTagTelemetries(
    tag: string,
    callback: (data: Telemetry[]) => void,
  ): void;
  unListenToTagTelemetries(tag: string): void;
  getDeviceTelemetries(
    deviceId: string,
    options?: Options,
  ): Promise<ListResponse<Telemetry[]>>;
  getAssetTelemteries(
    assetId: string,
    options?: Options,
  ): Promise<ListResponse<Telemetry[]>>;
  getDeviceTelemetriesGroup(
    deviceId: string,
    options?: Pick<Options, 'pageNumber' | 'pageSize'>,
  ): Promise<ListResponse<TelemetriesGroup[]>>;
  listenToDeviceTelemetries(
    deviceId: string,
    callback: (data: Telemetry[]) => void,
  ): void;
  unListenToDeviceTelemetries(deviceId: string): void;
  listenToAssetTelemetries(
    deviceId: string,
    callback: (data: Telemetry[]) => void,
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
    (tag, options) => {
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
          aggregation: 'last',
          ...options,
        })
        .then((result) => result as ListResponse<Telemetry[]>);
    },
    [isInitialized],
  );

  const listenToTagTelemetries = useCallback(
    (tag, callback) => {
      if (!isInitialized) {
        return;
      }

      cervelloInstance.tags
        .telemetries({
          params: {organizationId: Cervello.params.organizationId || '', tag},
        })
        .listen(callback);
    },
    [isInitialized],
  );

  const unListenToTagTelemetries = useCallback(
    (tag) => {
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
    (deviceId, options) => {
      if (!isInitialized) {
        return new Promise<ListResponse<Telemetry[]>>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return new Device({
        id: deviceId,
        organizationId: process.env.REACT_APP_ORGANIZATION_ID!,
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
          aggregation: 'last',
          ...options,
        })
        .then((result) => result as ListResponse<Telemetry[]>);
    },
    [isInitialized],
  );
  const getAssetTelemteries = useCallback(
    (assetId, options) => {
      if (!isInitialized) {
        return new Promise<ListResponse<Telemetry[]>>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return new Asset({
        id: assetId,
        organizationId: process.env.REACT_APP_ORGANIZATION_ID!,
        applicationId: process.env.REACT_APP_APPLICATION_ID!,
        name: '',
        customFields: null,
      }).telemetries
        .list({
          pageSize: 5000,
          aggregation: 'last',
          ...options,
        })
        .then((result) => result as ListResponse<Telemetry[]>);
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
        organizationId: process.env.REACT_APP_ORGANIZATION_ID!,
        name: '',
        deviceType: 'STANDALONE',
        connectivityMedia: 'OTHER',
        communicationProtocol: 'DEFAULT',
        customFields: null,
        lastConnectionStatus: false,
        lastConnectionTime: '',
      }).telemetries
        .group(options)
        .then((result) => result as ListResponse<TelemetriesGroup[]>);
    },
    [isInitialized],
  );

  const listenToDeviceTelemetries = useCallback(
    (deviceId, callback) => {
      if (!isInitialized) {
        return;
      }

      new Device({
        id: deviceId,
        organizationId: process.env.REACT_APP_ORGANIZATION_ID!,
        name: '',
        deviceType: 'STANDALONE',
        connectivityMedia: 'OTHER',
        communicationProtocol: 'DEFAULT',
        customFields: null,
        lastConnectionStatus: false,
        lastConnectionTime: '',
      }).telemetries.listen(callback);
    },
    [isInitialized],
  );

  const unListenToAssetTelemetries = useCallback(
    (assetId) => {
      if (!isInitialized) {
        return;
      }

      return new Asset({
        id: assetId,
        applicationId: process.env.REACT_APP_APPLICATION_ID!,
        organizationId: process.env.REACT_APP_ORGANIZATION_ID!,
        name: '',
        customFields: null,
      }).telemetries.removeListener();
    },
    [isInitialized],
  );
  const listenToAssetTelemetries = useCallback(
    (assetId, callback) => {
      if (!isInitialized) {
        return;
      }

      new Asset({
        id: assetId,
        applicationId: process.env.REACT_APP_APPLICATION_ID!,
        organizationId: process.env.REACT_APP_ORGANIZATION_ID!,
        name: '',
        customFields: null,
      }).telemetries.listen(callback);
    },
    [isInitialized],
  );

  const unListenToDeviceTelemetries = useCallback(
    (deviceId) => {
      if (!isInitialized) {
        return;
      }

      return new Device({
        id: deviceId,
        organizationId: process.env.REACT_APP_ORGANIZATION_ID!,
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

  return {
    getTagTelemetries,
    listenToTagTelemetries,
    unListenToTagTelemetries,
    getDeviceTelemetries,
    getDeviceTelemetriesGroup,
    listenToDeviceTelemetries,
    unListenToDeviceTelemetries,
    listenToAssetTelemetries,
    unListenToAssetTelemetries,
    getAssetTelemteries,
  };
}
