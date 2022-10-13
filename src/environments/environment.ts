// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: 'https://hr-ocean.com:8090',
  X_API_KEY: 'aHJtcy1wcm9qZWN0LXhhcGlrZXktc2Vj',
  dateFormat: 'dd-MMM-yyyy',
  dateTimeFormat: 'dd-MMM-yyyy hh:mm a',
  timeFormat: 'hh:mm a',
  fileDestination: 'LOCAL',
  loginUrl: '/auth/login',
  firebaseConfig: {
    apiKey: "AIzaSyD6AiLKPTm_nl3gEEVlhzPXyEy19lfqlOo",
    authDomain: "hrms-815a7.firebaseapp.com",
    projectId: "hrms-815a7",
    storageBucket: "hrms-815a7.appspot.com",
    messagingSenderId: "870690161174",
    appId: "1:870690161174:web:8404a87e361234ff346b37",
    measurementId: "G-MXGF4NV9FM"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
