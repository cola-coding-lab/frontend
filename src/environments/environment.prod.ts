import { environment as defaultEnvironment } from "./environment.defaults";

export const environment = {
  ...defaultEnvironment,
  baseHref: '/vcl/',
  production: true,
};
