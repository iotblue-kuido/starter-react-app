import Keycloak from 'keycloak-js'

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'

const keycloak: Keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_BASE_URL!,
  realm: import.meta.env.VITE_KEYCLOAK_REALM!,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT!,
});
export default keycloak