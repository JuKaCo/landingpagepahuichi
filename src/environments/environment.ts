// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url_api_slim3: "https://apis300-dev.grupo-lafuente.com/v3",
  url_api_crm: "https://dev-crm.elpahuichi.com.bo/Api",
  url_crm: "https://dev-crm.elpahuichi.com.bo",
  url_crm_oauth2: "https://dev-crm.elpahuichi.com.bo/Api/access_token",
  data_oauth: {
    grant_type: "client_credentials",
    client_id: "86a4fbcc-24b1-7e34-dffd-611a60058cfd",
    client_secret: "12345678"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
