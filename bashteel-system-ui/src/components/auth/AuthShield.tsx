import Box from '@mui/material/Box';
import { ReactKeycloakProvider, } from '@react-keycloak/web';
// import Cervello from 'data-gateway/cervello';
// import { authorizationToken } from 'data-gateway/http';
import keycloak from './keycloak';
import GlobalLoader from '../loader';


// function InitCervello(token: string) {
//   Cervello.init({
//     token,
//     config: {
//       apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
//       keyCloakBaseUrl: import.meta.env.VITE_KEY_CLOAK_BASE_URL,
//     },
//   });
//   Cervello.params = {
//     organizationId: import.meta.env.VITE_ORGANIZATION_ID,
//     applicationId: import.meta.env.VITE_APPLICATION_ID,
//   };
// }

export default function AuthShield({ children }: { children: React.ReactNode }) {
  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        onload: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/silent-check-sso.html',
      }}
      LoadingComponent={
        <Box width="100vw" height="100vh">
          <GlobalLoader fullHeight fullWidth />
        </Box>
      }
      onEvent={(event, error) => {
        switch (event) {
          case 'onReady':
            console.log('------------------onReady------------------', keycloak.authenticated);

            if (!keycloak.authenticated) {
              keycloak.login();
            }
            break;

          case 'onInitError':
            console.log('------------------onInitError------------------', error);
            break;
          case 'onAuthSuccess':
            console.log('------------------onAuthSuccess------------------', keycloak.authenticated);
            break;
          case 'onAuthError':
            console.log('------------------onAuthError------------------', error);
            break;
          case 'onAuthRefreshSuccess':
            console.log('------------------onAuthRefreshSuccess------------------', keycloak.authenticated);
            break;
          case 'onAuthRefreshError':
            console.log('------------------onAuthRefreshError------------------', error);
            break;
          case 'onTokenExpired':
            console.log('------------------onTokenExpired------------------', keycloak.authenticated);
            break;
          case 'onAuthLogout':
            console.log('------------------onAuthLogout------------------', keycloak.authenticated);
            break;
          default:
            console.log('keycloak events', { event, error, keycloak });
            break;
        }
      }}
    >
      {children}
    </ReactKeycloakProvider>
  );
}
