import type { Vue } from 'vue/types/vue';
import type { AsyncComponent } from 'vue/types/options';
import type { PluginObject } from 'vue/types/plugin';
import { JSDELIVR_REGISTRY, DEFAULT_OPT } from './constant';
import { prefetchMulti } from './utils/prefetch';
import { vueComponentLoad, load, unload } from './utils/load';
import { setLoadedObj, getLoadBase } from './utils/store';

declare const window: Window & { define: Function };

declare module 'vue/types/vue' {
  // eslint-disable-next-line no-shadow
  interface Vue {
    // eslint-disable-next-line no-use-before-define
    $loader: Loader
  }
}

export type LoadStatus = 'loading' | 'loaded' | 'loadFailed'

export type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined

export type Target = string | {
  name: string,
  style?: boolean,
  deps?: Target[],
  nameAlias?: string,
  styleAlias?: string,
}

export type Dep = Target

export type LibAlias = [nameAlias: string, styleAlias?: string, deps?: Dep[]]

export interface LibAliasMap {
  [key: string]: LibAlias
}

export interface Options {
  crossOrigin?: CrossOrigin,
  registry?: string,
  vueComponentRegistry?: string,
  enableSuffix?: boolean,
  versionHandling?: boolean,
  prefetch?: boolean,
  libAliasMap?: LibAliasMap
}

const initGlobalVariables = () => {
  function define(...arg: unknown[]) {
    const factory = arg.slice(-1)[0];
    const deps = [undefined, ...arg].slice(-2)[0];
    setLoadedObj({ deps, factory });
  }
  define.amd = {};
  window.define = define;
};

const initDnsPrefetch = (options: Options) => {
  const { registry } = options;
  const href = registry || JSDELIVR_REGISTRY;
  if (document.head.querySelector(`[dns-prefetch="${href}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'dns-prefetch';
  link.href = href;
  link.setAttribute('dns-prefetch', href);
  document.head.appendChild(link);
};

const initPrefetch = (options: Options) => {
  const { prefetch, libAliasMap } = options;
  if (!prefetch) return;
  const prefetchLibList = Object.keys(libAliasMap || {});
  prefetchMulti(options, <string[]>prefetchLibList);
};

const initSupportsPromiseDetection = () => {
  if (typeof Promise === 'undefined') throw new Error('promise is a dependency of Loader, but Promise does not exist');
};

interface Load {
  <T>(arg: Target): Promise<T>
  <T>(arg: Target[]): Promise<T[]>
}

interface Unload {
  (arg: string): void
  (arg: string[]): void
}

interface VueComponentLoad {
  (arg: Target): AsyncComponent
}

interface Loader extends PluginObject<never>, Load {
  options: Options
  load: Load
  unload: Unload
  vueComponentLoad: VueComponentLoad
}

interface LoaderFactory {
  (options?: Options): Loader
  create(options?: Options): Loader
}

initSupportsPromiseDetection();
initGlobalVariables();

function loaderFactory(options?: Options): Loader {
  const { registry, libAliasMap } = options || {};
  const useJsdelivr = !registry || registry === JSDELIVR_REGISTRY;
  const opt = {
    ...DEFAULT_OPT,
    enableSuffix: !useJsdelivr,
    versionHandling: !useJsdelivr,
    ...(options ?? {}),
    libAliasMap: {
      ...DEFAULT_OPT.libAliasMap,
      ...(libAliasMap || {}),
    },
  };
  initDnsPrefetch(opt);
  initPrefetch(opt);
  function handler<T>(arg: Target): Promise<T>
  function handler<T>(arg: Target[]): Promise<T[]>
  function handler<T>(arg: Target | Target[]): Promise<T | T[]> {
    if (arg instanceof Array) return load<T>(opt, arg);
    return load<T>(opt, arg);
  }
  function install(V: typeof Vue) {
    const { LoadedMap } = getLoadBase();
    LoadedMap.vue = V;
    V.mixin({
      beforeCreate() {
        this.$loader = handler;
      },
    });
  }
  handler.options = opt;
  handler.install = install;
  handler.load = handler;
  handler.unload = unload;
  handler.vueComponentLoad = (arg: Target) => vueComponentLoad(opt, arg);
  return handler;
}
loaderFactory.create = (options?: Options) => loaderFactory(options);

// eslint-disable-next-line no-redeclare
const Loader: LoaderFactory = loaderFactory;

export default Loader;
