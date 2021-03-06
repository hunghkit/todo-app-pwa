// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.

var REACT_APP = /^REACT_APP_/i;

function getClientEnvironment(publicUrl) {
  var raw = Object
    .keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce((env, key) => {
      env[key] = process.env[key];
      return env;
    }, {
      // Useful for determining whether we’re running in production mode.
      // Most importantly, it switches React into the correct mode.
      NODE_ENV: process.env.NODE_ENV || 'development',
      GCM_SENDER_ID: process.env.GCM_SENDER_ID || '370430411435',
      SERVER_HOST: process.env.SERVER_HOST || 'http://localhost:3005',
      // Useful for resolving the correct path to static assets in `public`.
      // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
      // This should only be used as an escape hatch. Normally you would put
      // images into the `src` and `import` them in code to get their paths.
      PUBLIC_URL: publicUrl,
      FIREBASE_PROJECT_ID: 'todo-with-pwa',
      FIREBASE_STORAGE: 'todo-with-pwa.appspot.com',
      FIREBASE_AUTH_DOMAIN: 'todo-with-pwa.firebaseapp.com',
      FIREBASE_DATABASE_URL: 'https://todo-with-pwa.firebaseio.com',
      FIREBASE_KEY: 'AIzaSyDDo_RzQ9KvJM4rr0oMSrtPnV_ePVediYA',

    });
  // Stringify all values so we can feed into Webpack DefinePlugin
  var stringified = {
    'process.env': Object
      .keys(raw)
      .reduce((env, key) => {
        env[key] = JSON.stringify(raw[key]);
        return env;
      }, {})
  };

  return { raw, stringified };
}

module.exports = getClientEnvironment;
