import Box from '@mui/material/Box';
import { ReactKeycloakProvider, } from '@react-keycloak/web';
import Kuido from '../../actions/cervello';
import keycloak from './keycloak';
import GlobalLoader from '../loader';
import {authorizationToken} from '../../actions/http';

function InitCervello(token: string) {
  Kuido.init({
    token,
    config: {
      apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
      keyCloakBaseUrl: import.meta.env.VITE_KEY_CLOAK_BASE_URL,
    },
  });
  Kuido.params = {
    projectId: import.meta.env.VITE_APPLICATION_ID,
  };
}

export default function AuthShield({children}: {children: React.ReactNode}) {
  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        onload: 'check-sso',
        silentCheckSsoRedirectUri: (import.meta.env.VITE_ROUTE_BASE || '') + '/silent-check-sso.html',
      }}
      LoadingComponent={
        <Box width="100vw" height="100vh">
          <GlobalLoader fullHeight fullWidth />
        </Box>
      }
      onEvent={(event, error) => {
        switch (event) {
          case 'onReady':
            if (!keycloak.authenticated) {
              keycloak.login();
            }
            break;
          case 'onAuthSuccess':
            InitCervello(keycloak?.token);
            authorizationToken.set(keycloak?.token);
            break;

          default:
            console.log('keycloak events', {event, error, keycloak});
            break;
        }
      }}
    >
      {children}
    </ReactKeycloakProvider>
  );
}
