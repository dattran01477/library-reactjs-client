import React from "react";
import { withKeycloak } from "react-keycloak";

const LoginPage = ({ keycloak, keycloakInitialized }) => {
  // Here you can access all of keycloak methods and variables.
  // See https://www.keycloak.org/docs/latest/securing_apps/index.html#javascript-adapter-reference
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          return keycloak.login();
        }}
      >
        Login
      </button>
      <div>
        <div>User is {console.log(keycloak)} authenticated</div>
      </div>
    </div>
  );
};

export default withKeycloak(LoginPage);
