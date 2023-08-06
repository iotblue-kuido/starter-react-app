import {useCallback, useState} from 'react';
import Cervello from '../index';
import {
  queryResourceType,
} from 'cervello.js/lib/modules/organizations';
import {UN_INITIALIZED_ERROR} from '../../../shared/helpers/common';
import {Options} from 'cervello.js/lib/interfaces/Common';
import { CommandFeedBack } from 'cervello.js/lib/modules/commandTemplates';

export interface OrganizationModule {
  listenToTopic<T>(topic: string, callback: (feedback: T) => void): void;
  listenToTemplate(
    templateId: string,
    callback: (templateFeedback: CommandFeedBack) => void,
  ): void;
  unlistenToTemplate(templateId: string): void;
  query(resouce: queryResourceType, query: any): Promise<any>;
  getAuditLogs(options?: Options): Promise<any>;
}

export default function useOrganization(): OrganizationModule {
  const [isInitialized, setIsInitialized] = useState<boolean>(
    Cervello.isInitialized,
  );
  Cervello.observeOnInit(() => {
    setIsInitialized(true);
  });

  const listenToTopic = useCallback(
    <T>(topic: string, callback: (feedback: T) => void) => {
      if (!isInitialized) {
        return;
      }
      Cervello.organization.listenOnTopic(topic, callback);
    },
    [isInitialized],
  );

  const listenToTemplate = useCallback(
    (
      templateId: string,
      callback: (templateFeedback: CommandFeedBack) => void,
    ) => {
      if (!isInitialized) {
        return;
      }

      Cervello.organization.templates.listenOnTemplate(templateId, callback);
    },
    [isInitialized],
  );

  const unlistenToTemplate = useCallback(
    (templateId: string) => {
      if (!isInitialized) {
        return;
      }

      Cervello.organization.templates.unListenOnTemplate(templateId);
    },
    [isInitialized],
  );
  const query = useCallback(
    (resouce: queryResourceType, query: any) => {
      if (!isInitialized) {
        return new Promise<any>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }

      return Cervello.organization.query(resouce, query);
    },
    [isInitialized],
  );
  const getAuditLogs = useCallback(
    (options: Options) => {
      if (!isInitialized) {
        return new Promise<any>((resolve, reject) => {
          reject(UN_INITIALIZED_ERROR);
        });
      }
      return Cervello.organization.logs(options);
    },
    [isInitialized],
  );

  return {
    listenToTopic,
    listenToTemplate,
    unlistenToTemplate,
    query,
    getAuditLogs,
  };
}