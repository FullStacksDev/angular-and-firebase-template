export const environment = {
  useEmulators: true,
  logLevel: Number.NEGATIVE_INFINITY, // See https://unjs.io/packages/consola#log-level
  // logLevel: 5, // Uncomment this out, and comment the line above, to enable logging during tests. Warning: this will produce VERY verbose output!
  firebaseConfig: {
    apiKey: 'this-is-a-demo-project',
    authDomain: 'this-is-a-demo-project',
    databaseURL: 'https://demo-test.europe-west1.firebasedatabase.app',
    projectId: 'demo-test',
    storageBucket: 'this-is-a-demo-project',
    messagingSenderId: 'this-is-a-demo-project',
    appId: 'this-is-a-demo-project',
  },
};
