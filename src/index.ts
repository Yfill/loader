import './vue';
import type { Vue } from 'vue/types/vue';
import type { AsyncComponent } from 'vue/types/options';
import type { PluginObject } from 'vue/types/plugin';
import { JSDELIVR_REGISTRY, DEFAULT_OPT } from './constant';
import { prefetchMulti } from './utils/prefetch';
import { warn } from './utils/log';
import {
  vueComponentLoad, loaded, load, unload,
} from './utils/load';

import { setLoadedObj, getLoadBase } from './utils/store';
import { isArray, isObject } from './utils/type';

declare const window: Window & { define: Function };

export type LoadStatus = 'loading' | 'loaded' | 'loadFailed'

export type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined

export type Target = string | {
  name: string,
  style?: boolean,
  deps?: Target[],
  scriptAlias?: string,
  styleAlias?: string,
}

export type Dep = Target

export type LibAlias = [scriptAlias: string, styleAlias?: string, deps?: Dep[]]

export interface LibAliasMap {
  [key: string]: LibAlias;
}

export interface Options {
  crossOrigin?: CrossOrigin,
  registry?: string,
  vueComponentRegistry?: string,
  enableSuffix?: boolean,
  versionHandling?: boolean,
  prefetch?: boolean,
  libAliasMap?: LibAliasMap
  loadedMap?: { [name: string]: unknown }

  [key: string]: unknown
}

const initGlobalVariables = () => {
  function define(...arg: unknown[]) {
    const factory = arg.slice(-1)[0];
    const deps = [undefined, ...arg].slice(-2)[0];
    setLoadedObj({
      deps,
      factory,
    });
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
  const {
    prefetch,
    libAliasMap,
  } = options;
  if (!prefetch) return;
  const prefetchLibList = Object.keys(libAliasMap || {});
  prefetchMulti(options, <string[]>prefetchLibList);
};

const initSupportsPromiseDetection = () => {
  if (typeof Promise === 'undefined') throw new Error('Promise is a dependency of Loader, but Promise does not exist');
};

interface Loaded {
  <T>(name: string): T;

  <T>(names: string[]): T[];
}

interface Add {
  (name: string, targetLoaded: unknown): void;
}

interface Load {
  <T>(target: Target): Promise<T>;

  <T>(target: Target[]): Promise<T[]>;
}

interface Unload {
  (name: string): void;

  (names: string[]): void;
}

interface VueComponentLoad {
  (target: Target): AsyncComponent;
}

export interface Loader extends PluginObject<never>, Load {
  options: Options;
  loaded: Loaded;
  add: Add;
  load: Load;
  unload: Unload;
  vueComponentLoad: VueComponentLoad;
}

interface LoaderFactory {
  (options?: Options): Loader;

  create(options?: Options): Loader;
}

initSupportsPromiseDetection();
initGlobalVariables();

function loaderFactory(options?: Options): Loader {
  const {
    registry,
    libAliasMap,
  } = options || {};
  const useJsdelivr = !registry || registry === JSDELIVR_REGISTRY;
  const loadedMap: { [key: string]: unknown } = isObject(options?.LoadedMap)
    ? { ...(<object>options?.LoadedMap) }
    : {};
  const opt = {
    ...DEFAULT_OPT,
    loadedMap,
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

  function handler<T>(target: Target): Promise<T>
  function handler<T>(targetList: Target[]): Promise<T[]>
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
  function loadedWrap<T>(name: string): T
  function loadedWrap<T>(names: string[]): T[]
  function loadedWrap<T>(arg: string | string[]) {
    if (isArray(arg)) return loaded<T>(<string[]>arg, opt.loadedMap);
    return loaded<T>(<string>arg, opt.loadedMap);
  }
  function add(name: string, targetLoaded: unknown) {
    if (loadedWrap(name)) {
      warn(`${name} already exists`);
      return;
    }
    opt.loadedMap[name] = targetLoaded;
  }

  if (!opt.loadedMap.$loader) opt.loadedMap.$loader = handler;
  handler.options = opt;
  handler.install = install;
  handler.add = add;
  handler.load = handler;
  handler.loaded = loadedWrap;
  handler.unload = unload;
  handler.vueComponentLoad = (target: Target) => vueComponentLoad(opt, target);
  return handler;
}

loaderFactory.create = (options?: Options) => loaderFactory(options);

const Loader: LoaderFactory = loaderFactory;

export default Loader;
