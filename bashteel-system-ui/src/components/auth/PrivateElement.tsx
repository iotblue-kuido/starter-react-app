import keycloak from './keycloak';
import React, { useMemo } from 'react';

interface Props {
  roles?: string[];
  children: typeof React.Children | JSX.Element;
}

export default function PrivateElement({ roles: permissions, children }: Props) {

  const isMatching = useMemo(() => {
    if (!permissions || !permissions.length) {
      return true;
    }
    return permissions.some((per) =>
      keycloak.tokenParsed?.realm_access?.roles.includes(per),
    );
  }, [keycloak.tokenParsed?.realm_access?.roles, permissions]);
  if (!isMatching) {
    return <></>;
  }
  return <>{children}</>;
}
