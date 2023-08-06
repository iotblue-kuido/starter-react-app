import {useCallback, useState} from 'react';
import { UN_INITIALIZED_ERROR } from '../../../shared/helpers/common';
import Cervello, {cervelloInstance} from '../index';
import {ListResponse, Options, Reading} from 'cervello.js/lib/interfaces/Common';

export interface AttributesModule {
  getTagAttributes(tag: string, options: Options): Promise<Reading[]>;
  getDeviceAttribute(deviceId: string, options: Options): Promise<Reading[]>;
}

export default function useAttributes(): AttributesModule {
  const [isInitialized, setIsInitialized] = useState<boolean>(Cervello.isInitialized);
  Cervello.observeOnInit(() => {
    setIsInitialized(true);
  });

  const getTagAttributes = useCallback(
    (tag: any, options: Options) => {
      if (!isInitialized) {
        return new Promise<Reading[]>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return cervelloInstance.tags
        .attributes({
          params: {organizationId: Cervello.params.organizationId || '', tag},
        })
        .list({
          pageSize: 5000,
          ...options,
        })
        .then(result => {
          const {data} = result ;

          return data;
        });
    },
    [isInitialized],
  );

  const getDeviceAttribute = useCallback(
    (deviceId: string, options: Options) => {
      if (!isInitialized) {
        return new Promise<Reading[]>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return cervelloInstance.attributesModules
        .getDeviceAttributesModule({
          organizationId: Cervello.params.organizationId || '',
          deviceId,
        })
        .list({
          pageSize: 5000,
          ...options,
        })
        .then(result => {
          const {data} = result ;

          return data;
        });
    },
    [isInitialized],
  );

  return {getTagAttributes, getDeviceAttribute};
}
