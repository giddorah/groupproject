// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// Michaels database is being used for testing while Ludwigs database is enabled when production is set to true.

var ludwigKey = 'AIzaSyCEbDIc88YT_UuAIwXJF9GwftdGMlZQvGY';
var ludwigAuthDomain = 'blogspot-2240c.firebaseapp.com';
var ludwigDatabaseURL = 'https://blogspot-2240c.firebaseio.com';
var ludwigProjectId = 'blogspot-2240c';
var ludwigStorageBucket = 'blogspot-2240c.appspot.com';
var ludwigMessagingSenderId = '770819581699';

var michaelKey = "AIzaSyBorV45u14jqEQuXV3z8Gl5hPR9XtG0rng";
var michaelAuthDomain = "first-project-7ecd5.firebaseapp.com";
var michaelDatabaseURL = "https://first-project-7ecd5.firebaseio.com";
var michaelProjectId = "first-project-7ecd5";
var michaelStorageBucket = "first-project-7ecd5.appspot.com";
var michaelMessagingSenderId = "219423430237";


export const environment = {
  production: false,
  firebase: {
    apiKey: michaelKey,
    authDomain: michaelAuthDomain,
    databaseURL: michaelDatabaseURL,
    projectId: michaelProjectId,
    storageBucket: michaelStorageBucket,
    messagingSenderId: michaelMessagingSenderId
  }
};
