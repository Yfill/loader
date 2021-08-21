import type { AsyncComponent } from 'vue/types/options';
import type { Options, Target, Dep } from '../index';
import { transformToUrl } from './url';
import { isArray, getType } from './type';
import { loadStyle, unloadStyle } from './style';
import { loadScript, unloadScript } from './script';

export const loadSingle = <T>(options: Options, target: Target): Promise<T> => {
  const { enableSuffix, crossOrigin, libAliasMap } = options;
  const {
    name, style = false, deps = [], scriptAlias = '', styleAlias = '',
  } = typeof target === 'string' ? { name: target } : target;
  const [scAlias, stAlias, lamDeps] = (libAliasMap || {})[name] || [];
  const scriptUrl = transformToUrl(options, name, scriptAlias || scAlias, enableSuffix ? '.js' : '');
  if (style || styleAlias || stAlias) {
    const styleUrl = transformToUrl(options, name, styleAlias || stAlias, '.css');
    loadStyle(styleUrl, name);
  }
  const dependencies = (isArray(deps) && deps.length && deps)
    || (isArray(lamDeps) && (<Target[]>lamDeps).length && <Target[]>lamDeps)
    || [];
  return Promise.all(dependencies.map((dep: Dep) => loadSingle<T>(options, dep)))
    .then((loadedDeps) => loadScript<T>(name, options, scriptUrl, crossOrigin, loadedDeps));
};

export const unloadSingle = (name: string) => {
  unloadScript(name);
  unloadStyle(name);
};

export const loadMulti = <T>(
  options: Options, targetList: Target[],
): Promise<T[]> => Promise.all(targetList.map((target: Target) => loadSingle<T>(options, target)));

export const unloadMulti = (names: string[]) => { names.forEach((name) => unloadSingle(name)); };

export function load<T>(options: Options, target: Target): Promise<T>
export function load<T>(options: Options, targetList: Target[]): Promise<T[]>
export function load<T>(options: Options, arg: Target | Target[]): Promise<T | T[] | void> {
  const argType = getType(arg);
  if (isArray(arg)) return loadMulti<T>(options, arg as Target[]);
  if (
    ({ object: true, string: true } as { [key: string]: boolean })[argType]
  ) return loadSingle<T>(options, arg as Target);
  return Promise.resolve();
}

export function unload(name: string): void
export function unload(names: string[]): void
export function unload(arg: string | string[]): void {
  if (isArray(arg)) return unloadMulti(arg as string[]);
  return unloadSingle(arg as string);
}

export function vueComponentLoad(options: Options, arg: Target) {
  return (() => Promise.resolve(
    load({
      ...options,
      registry: options.vueComponentRegistry || options.registry,
      vueComponentRegistry: undefined,
    }, arg),
  )) as AsyncComponent;
}

export default {
  load, unload, vueComponentLoad,
};
