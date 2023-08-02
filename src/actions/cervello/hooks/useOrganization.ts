import {useCallback, useState} from 'react';
import Cervello from '../index';
import {
  CommandFeedBack,
  queryResourceType,
} from 'cervello.js/lib/modules/organizations';
import {UN_INITIALIZED_ERROR} from 'shared/helpers/common';

export interface OrganizationModule {
  listenToTopic<T>(topic: string, callback: (feedback: T) => void): void;
  listenToTemplate(
    templateId: string,
    callback: (templateFeedback: CommandFeedBack) => void,
  ): void;
  unlistenToTemplate(templateId: string): void;
  query(resouce: queryResourceType, query: any): Promise<any>;
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
    (templateId, callback) => {
      if (!isInitialized) {
        return;
      }

      Cervello.organization.templates.listenOnTemplate(templateId, callback);
    },
    [isInitialized],
  );

  const unlistenToTemplate = useCallback(
    (templateId) => {
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

  return {listenToTopic, listenToTemplate, unlistenToTemplate, query};
}
