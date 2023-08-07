import * as KuidoJS from 'kuido-sdk';
// import useOrganization from './hooks/useOrganization';
import useAlarms from './hooks/useAlarms';
// import useDevices from './hooks/useDevices';
// import useTelemetries from './hooks/useTelemetries';
// import useAttributes from './hooks/useAttributes';
// import useAssets from './hooks/useAssets';
import {Options as AuthOptions} from 'kuido-sdk/lib/adapters/auth';
import { Params } from 'kuido-sdk/lib/interfaces/Common';
import { Project } from 'kuido-sdk/lib/modules/entities/projects';

export let kuidoInstance: KuidoJS.Modules;

export default class Kuido {
  static params: Partial<Params> = {};
  static observers: Function[] = [];
  static socketObservers: ((status: boolean) => void)[] = [];
  static isInitialized = false;
  static project: Project;

  static init(config: AuthOptions): void {
    KuidoJS.init(config)
      .then(instance => {
        kuidoInstance = instance ;

        if (Kuido.params.projectId) {
          kuidoInstance.projects
            .get(Kuido.params.projectId)
            .then((project:Project ) => {
              Kuido.project = project;
              Kuido.isInitialized = true;

              Kuido.observers.forEach(observer => {
                observer();
              });

              Kuido.socketObservers.forEach(observer => {
                instance.observeOnSocketStatus(observer);
              });
            });
        }
      })
      .catch(e => {
        console.log({e});
        Kuido.socketObservers.forEach(observer => {
          observer(false);
        });
      });
  }
  static observeOnInit(callback: Function): void {
    Kuido.observers.push(callback);
  }

  static observeOnSocketStatus(callback: (status: boolean) => void): void {
    Kuido.socketObservers.push(callback);
  }
}

export { useAlarms};
