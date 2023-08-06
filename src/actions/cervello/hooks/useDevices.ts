import {useCallback, useState} from 'react';
import {UN_INITIALIZED_ERROR} from '../../../shared/helpers/common';
import Cervello, {cervelloInstance} from '../index';
import {
  FeedBack,
  ListResponse,
  operators,
  CreateDevice,
  Options,
} from 'cervello.js/lib/interfaces/Common';
import {Device, DeviceData, DeviceLog} from 'cervello.js/lib/modules/devices';
import {Asset} from 'cervello.js/lib/modules/assets';

export interface DevicesModule {
  getDevice(deviceId: string): Promise<Device>;
  getTagDevicesCount(
    tag: string,
    options?: Options,
  ): Promise<ListResponse<{count: number; lastConnectionStatus: boolean}[]>>;
  getTagDevices(
    tag: string,
    options?: Options,
  ): Promise<ListResponse<DeviceData[]>>;
  listenToDevicesStatus(callback: (log: DeviceLog) => void): void;
  unListenToDevicesStatus(): void;
  listDevices(options?: Options): Promise<DeviceData[]>;
  getAllAssetDevices(assetId: string, options?: Options): Promise<DeviceData[]>;
  createDevice(device: DeviceData): Promise<CreateDevice>;
  updateDevice(device: DeviceData): Promise<FeedBack>;
  deleteDevice(deviceId: string): Promise<FeedBack>;
  listenToTagConnectivity(
    tag: string,
    callback: (log: DeviceLog) => void,
  ): void;
  unListenToTagConnectivity(tag: string): void;
}

export default function useDevices(): DevicesModule {
  const [isInitialized, setIsInitialized] = useState<boolean>(
    Cervello.isInitialized,
  );

  Cervello.observeOnInit(() => {
    setIsInitialized(true);
  });

  const getDevice = useCallback(
    (deviceId: string) => {
      if (!isInitialized) {
        return new Promise<Device>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return cervelloInstance.devices.get({
        params: {
          organizationId: Cervello.params.organizationId || '',
          deviceId,
        },
      });
    },
    [isInitialized],
  );

  const getTagDevices = useCallback(
    (tag: string, options?: Options) => {
      if (!isInitialized) {
        return new Promise<ListResponse<DeviceData[]>>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return cervelloInstance.devices.list({
        params: {
          organizationId: Cervello.params.organizationId || '',
        },
        options: {
          ...options,
          filters: [
            {key: 'tags', operator: operators.contains, value: tag},
            ...(options?.filters || []),
          ],
        },
      });
    },
    [isInitialized],
  );

  const getTagDevicesCount = useCallback(
    (tag: string, options?: Options) => {
      if (!isInitialized) {
        return new Promise<
          ListResponse<{count: number; lastConnectionStatus: boolean}[]>
        >((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return cervelloInstance.devices
        .list({
          params: {
            organizationId: Cervello.params.organizationId || '',
          },
          options: {
            ...options,
            filters: [
              {key: 'tags', operator: operators.contains, value: tag},
              ...(options?.filters || []),
            ],
            group: 'lastConnectionStatus',
          },
        })
        .then(
          (res) =>
            res as unknown as ListResponse<
              {count: number; lastConnectionStatus: boolean}[]
            >,
        );
    },
    [isInitialized],
  );

  const listenToDevicesStatus = useCallback(
    (callback: (arg0: DeviceLog) => void) => {
      if (!isInitialized) {
        return;
      }

      return cervelloInstance.devices.listenOnStatus(
        Cervello.params.organizationId || '',
        (data: DeviceLog) => {
          callback(data);
        },
      );
    },
    [isInitialized],
  );

  const unListenToDevicesStatus = useCallback(() => {
    return cervelloInstance.devices.removeConnectivityListener(
      Cervello.params.organizationId || '',
      Cervello.params.organizationId || '',
    );
  }, []);

  const listenToTagConnectivity = useCallback(
    (tag: any, callback: (arg0: DeviceLog) => void) => {
      if (!isInitialized) {
        return;
      }

      return cervelloInstance.devices.listenOnConnectivity(
        Cervello.params.organizationId || '',
        tag || '',
        (data: DeviceLog) => {
          callback(data);
        },
      );
    },
    [isInitialized],
  );

  const unListenToTagConnectivity = useCallback((tag: any) => {
    if (cervelloInstance)
      return cervelloInstance.devices.removeConnectivityListener(
        Cervello.params.organizationId || '',
        tag || '',
      );
  }, []);

  const getAllAssetDevices = useCallback(
    (assetId: string, options?: Options) => {
      if (!isInitialized) {
        return new Promise<DeviceData[]>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return new Asset({
        id: assetId,
        organizationId: Cervello.params.organizationId!,
        applicationId: Cervello.params.applicationId!,
        name: '',
        customFields: null,
      })
        .getDevices(options || {descendant: 1, pageSize: 5000})
        .then(({data}) => data);
    },
    [isInitialized],
  );

  const createDevice = useCallback(
    (device: DeviceData) => {
      if (!isInitialized) {
        return new Promise<CreateDevice>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return cervelloInstance.devices
        .create({
          params: {
            organizationId: Cervello.params.organizationId || '',
          },
          data: device,
        })
        .then((res) => {
          return res;
        });
    },
    [isInitialized],
  );
  const updateDevice = useCallback(
    (device: DeviceData) => {
      if (!isInitialized) {
        return new Promise<FeedBack>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return cervelloInstance.devices
        .update({
          params: {
            organizationId: Cervello.params.organizationId || '',
            deviceId: device.id,
          },
          data: device,
        })
        .then((res) => {
          return res;
        });
    },
    [isInitialized],
  );

  const deleteDevice = useCallback(
    (deviceId: string) => {
      if (!isInitialized) {
        return new Promise<FeedBack>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return cervelloInstance.devices
        .delete({
          params: {
            organizationId: Cervello.params.organizationId || '',
            deviceId: deviceId,
          },
        })
        .then((res) => {
          return res;
        });
    },
    [isInitialized],
  );

  const listDevices = useCallback(
    (options: Options = {}) => {
      if (!isInitialized) {
        return new Promise<DeviceData[]>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return cervelloInstance.devices
        .list({
          params: {
            organizationId: Cervello.params.organizationId || '',
          },
          options,
        })
        .then(({data}) => {
          return data;
        });
    },
    [isInitialized],
  );

  return {
    getTagDevicesCount,
    getTagDevices,
    listenToDevicesStatus,
    unListenToDevicesStatus,
    listDevices,
    getDevice,
    getAllAssetDevices,
    createDevice,
    updateDevice,
    deleteDevice,
    listenToTagConnectivity,
    unListenToTagConnectivity,
  };
}
