import { transformToUrl } from './url';
import { isArray } from './type';
import type { Options, Target, Dep } from '../index';

const addPrefetchElToHead = (name: string, url: string) => {
  const el = document.createElement('link');
  el.href = url;
  el.rel = 'prefetch';
  el.setAttribute('prefetch-name', name);
  document.head.appendChild(el);
};
export const prefetchSingle = (options: Options, target: Target) => {
  const { enableSuffix, libAliasMap } = options;
  const {
    name, style = false, deps = [], scriptAlias = '', styleAlias = '',
  } = typeof target === 'string' ? { name: target } : target;
  if (document.head.querySelector(`link[prefetch-name="${name}"]`)) return;
  const [scAlias, stAlias, lamDeps] = (libAliasMap || {})[name] || [];
  const scriptUrl = transformToUrl(options, name, scriptAlias || scAlias, enableSuffix ? '.js' : '');
  if (style || styleAlias || stAlias) {
    const styleUrl = transformToUrl(options, name, styleAlias || stAlias, '.css');
    addPrefetchElToHead(name, styleUrl);
  }
  const dependencies = (isArray(deps) && deps.length && deps)
        || (isArray(lamDeps) && (<Target[]>lamDeps).length && <Target[]>lamDeps)
        || [];
  dependencies.forEach((dep: Dep) => prefetchSingle(options, dep));
  addPrefetchElToHead(name, scriptUrl);
};
export const prefetchMulti = (options: Options, targetList: Target[]) => {
  targetList.forEach((target) => prefetchSingle(options, target));
};
export default {
  prefetchSingle,
  prefetchMulti,
};
