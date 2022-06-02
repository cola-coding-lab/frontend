import { environment as defaultEnvironment } from './environment.defaults';

export const environment = {
  ...defaultEnvironment,
  production: true,
  baseHref: '/editor/',
  title: 'CoLa Editor',
  isEditor: true,
};
