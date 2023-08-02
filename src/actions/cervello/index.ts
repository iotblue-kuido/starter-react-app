import * as CervelloJS from 'cervello.js';
import useOrganization from './hooks/useOrganization';
import useDevices from './hooks/useDevices';
import useAlarms from './hooks/useAlarms';
import useTelemetries from './hooks/useTelemetries';
import useAttributes from './hooks/useAttributes';
import useAssets from './hooks/useAssets';
import {Params} from 'cervello.js/lib/interfaces/Common';
import {Organization} from 'cervello.js/lib/modules/organizations';
import {Options as AuthOptions} from 'cervello.js/lib/adapters/auth';

export let cervelloInstance: CervelloJS.Modules;

export default class Cervello {
  static params: Partial<Params> = {};
  static observers: Function[] = [];
  static socketObservers: ((status: boolean) => void)[] = [];
  static isInitialized = false;
  static organization: Organization;

  static init(config: AuthOptions): void {
    CervelloJS.init(config)
      .then(instance => {
        cervelloInstance = instance as CervelloJS.Modules;

        if (Cervello.params.organizationId) {
          cervelloInstance.organizations
            .get({params: {organizationId: Cervello.params.organizationId}})
            .then((organization: Organization) => {
              Cervello.organization = organization;
              Cervello.isInitialized = true;

              Cervello.observers.forEach(observer => {
                observer();
              });

              Cervello.socketObservers.forEach(observer => {
                instance.observeOnSocketStatus(observer);
              });
            });
        }
      })
      .catch(e => {
        console.log({e});
        Cervello.socketObservers.forEach(observer => {
          observer(false);
        });
      });
  }
  static observeOnInit(callback: Function): void {
    Cervello.observers.push(callback);
  }

  static observeOnSocketStatus(callback: (status: boolean) => void): void {
    Cervello.socketObservers.push(callback);
  }
}

export {useDevices, useAlarms, useAssets, useAttributes, useOrganization, useTelemetries};
