import {useCallback, useState} from 'react';
import {UN_INITIALIZED_ERROR} from '../../../shared/helpers/common';
import Cervello, {cervelloInstance} from '../index';
import {ListResponse, Options} from 'cervello.js/lib/interfaces/Common';
import {Asset, AssetData} from 'cervello.js/lib/modules/assets';

export interface AssetsModule {
  getDeviceAssets(id: string, options?: Options): Promise<AssetData[]>;
  getAsset(id: string): Promise<Asset>;
  getAssets(options?: Options): Promise<ListResponse<AssetData[]>>;
}

export default function useAssets(): AssetsModule {
  const [isInitialized, setIsInitialized] = useState<boolean>(
    Cervello.isInitialized,
  );

  Cervello.observeOnInit(() => {
    setIsInitialized(true);
  });

  const getDeviceAssets = useCallback(
    (id: string, options: Options) => {
      if (!isInitialized) {
        return new Promise<AssetData[]>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return cervelloInstance.assets
        .list({
          params: {
            organizationId: Cervello.params.organizationId || '',
            applicationId: Cervello.params.applicationId || '',
            deviceId: id,
          },
          options,
        })
        .then((result) => {
          const {data} = result as ListResponse<AssetData[]>;

          return data;
        });
    },
    [isInitialized],
  );

  const getAsset = useCallback(
    (id: string) => {
      if (!isInitialized) {
        return new Promise<Asset>((resolve, reject) => {
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
        .then((result) => {
          return result as Asset;
        });
    },
    [isInitialized],
  );

  const getAssets = useCallback(
    (options: Options) => {
      if (!isInitialized) {
        return new Promise<ListResponse<AssetData[]>>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return cervelloInstance.assets
        .list({
          params: {
            organizationId: Cervello.params.organizationId || '',
            applicationId: Cervello.params.applicationId || '',
          },
          options,
        })
        .then((result) => {
          return result as ListResponse<AssetData[]>;
        });
    },
    [isInitialized],
  );

  return {getDeviceAssets, getAsset, getAssets};
}
