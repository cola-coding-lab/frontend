import { environment as defaultEnvironment } from './environment.defaults';

export const environment = {
  ...defaultEnvironment,
  api: {
    src: 'http://localhost:8065',
    version: 'v1',
  },
};
