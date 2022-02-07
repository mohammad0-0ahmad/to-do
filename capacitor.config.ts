import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'se.todo.app',
    appName: 'To-do',
    webDir: 'out',
    loggingBehavior: 'debug',
    bundledWebRuntime: false,
    ...(process.env?.NODE_ENV_NATIVE === 'enabled'
        ? {}
        : {
              server: {
                  url: `http://${require('ip').address()}:3000}`,
                  cleartext: true,
              },
          }),
};

export default config;
