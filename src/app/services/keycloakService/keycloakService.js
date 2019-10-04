import Keycloak from "keycloak-js";
import initOptions from "./keycloakServiceConfig";

class keycloakService {
  init() {
    let initOption = {
      url: "https://ssolibraryhcmute.herokuapp.com/auth",
      realm: "library-hcmute",
      clientId: "libraryhcmute",
      onLoad: "login-required"
    };
    let keycloak = Keycloak('/keycloak.json');
    keycloak.init({onLoad: 'login-required'}).success(authenticated => {
      console.log(authenticated);
    });
  }
}

const instance = new keycloakService();

export default instance;
