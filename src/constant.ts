import { Options } from './index';

export const JSDELIVR_REGISTRY = 'https://cdn.jsdelivr.net/npm';

export const DEFAULT_OPT: Options = {
  registry: JSDELIVR_REGISTRY,
  enableSuffix: false,
  versionHandling: false,
  crossOrigin: undefined,
  prefetch: true,
  libAliasMap: {},
};

export default {
  JSDELIVR_REGISTRY,
  DEFAULT_OPT,
};
