import Keycloak from "keycloak-js";
import initOptions from "./keycloakServiceConfig";

class keycloakService {
  init() {
    let keycloak = Keycloak("/keycloak.json");
    keycloak
      .init({ onLoad: initOptions.onLoad })
      .success(auth => {
        if (!auth) {
          window.location.reload();
        } else {
          console.info("Authenticated");
        }
      })
      .error(() => {
        console.error("Authenticated Failed");
      });
  }
}

const instance = new keycloakService();

export default instance;
