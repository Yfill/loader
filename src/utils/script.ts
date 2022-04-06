import { warn } from './log';
import { JSDELIVR_REGISTRY } from '../constant';
import { getLoadBase, clearLoadedTemp } from './store';
import { loadMulti } from './load';
import { assertionFunction, isArray } from './type';
import { urlReg } from './url';
import type { CrossOrigin, Options } from '../index';

const getScriptElementByName = (name: string) => document.head.querySelector(`script[name="${name}"]`) as HTMLScriptElement | null;
const switchCurrentScript = (currentScript: HTMLScriptElement | null) => Object.defineProperty(document, 'currentScript', { get: () => currentScript, configurable: true });
const removeLoadImpact = (name: string) => {
  const { LoadedMap, LoadStatusMap } = getLoadBase();
  const script = getScriptElementByName(name);
  script?.parentNode?.removeChild(script);
  delete LoadedMap[name];
  delete LoadStatusMap[name];
};
const afterError = (name: string, reject: Function, err: unknown) => {
  const { LoadStatusMap, RejectMap } = getLoadBase();
  LoadStatusMap[name] = 'loadFailed';
  (RejectMap[name] || []).forEach((r) => r(err));
  reject(err);
  clearLoadedTemp(name);
};
const afterSuccess = <T>(name: string, resolve: Function, result: T) => {
  const { LoadedMap, LoadStatusMap, ResolveMap } = getLoadBase();
  LoadedMap[name] = result;
  LoadStatusMap[name] = 'loaded';
  (ResolveMap[name] || []).forEach((r) => r(result));
  resolve(result);
  clearLoadedTemp(name);
};
const onloadInner = <T>(
  name: string,
  options: Options,
  loadedDeps: T[],
  resolve: Function,
  reject: Function,
) => {
  const { LoadedMap, LoadedObj } = getLoadBase();
  const { deps: loDeps, factory } = LoadedObj || {};
  const registry = options?.registry;
  const useJsdelivr = !urlReg.test(name) && (!registry || registry === JSDELIVR_REGISTRY);

  try {
    const [libName, version] = `${name}`.split(/(?!^@)+@/);
    assertionFunction(factory, `the library(${name}) does not point to umd or amd resources by default, you can point to the correct resource by setting scriptAlias${useJsdelivr ? `, you can go to the website(https://www.jsdelivr.com/package/npm/${libName}?version=${version || ''}) to find the corresponding resources` : ''}`);
  } catch (err) {
    afterError(name, reject, err);
    return;
  }
  const handler = (deps: T[]) => {
    const { currentScript } = document;
    switchCurrentScript(getScriptElementByName(name));
    const result: T = factory(...deps) || <T>LoadedMap.exports;
    switchCurrentScript(currentScript as HTMLScriptElement | null);
    if (factory.length > deps.length) warn('the library that the library depends on may not be injected correctly, please check whether deps is correctly declared');
    afterSuccess(name, resolve, result);
  };
  if (loadedDeps.length > 0 || !isArray(loDeps) || !(<string[]>loDeps).length) handler(loadedDeps);
  else loadMulti(options, <string[]>loDeps).then((deps) => handler(<T[]>deps));
};

const onerrorInner = (name: string, reject: Function) => {
  const err = new Error(`${name} load failed`);
  afterError(name, reject, err);
};
export const loadScript = <T>(
  name: string,
  options: Options,
  url: string,
  crossOrigin: CrossOrigin,
  loadedDeps: T[],
): Promise<T> => new Promise((resolve, reject) => {
    const {
      LoadedMap, LoadStatusMap, ResolveMap, RejectMap,
    } = getLoadBase();
    const optLoaded = <T | undefined>options?.loadedMap?.[name];
    const loaded = <T | undefined>LoadedMap[name];
    if (optLoaded) {
      resolve(optLoaded);
      return;
    }
    if (loaded) {
      resolve(loaded);
      return;
    }
    if (LoadStatusMap[name] === 'loadFailed') {
      onerrorInner(name, reject);
      return;
    }
    if (LoadStatusMap[name] === 'loading') {
      const resolveList = ResolveMap[name] || [];
      const rejectList = RejectMap[name] || [];
      resolveList.push(resolve);
      rejectList.push(reject);
      ResolveMap[name] = resolveList;
      RejectMap[name] = rejectList;
      return;
    }
    LoadStatusMap[name] = 'loading';
    const script = document.createElement('script');
    if (crossOrigin !== undefined) script.crossOrigin = crossOrigin;
    script.src = url;
    script.async = true;
    script.setAttribute('name', name);
    script.onload = () => onloadInner<T>(name, options, loadedDeps, resolve, reject);
    script.onerror = () => onerrorInner(name, reject);
    document.head.appendChild(script);
  });
export const unloadScript = (name: string) => {
  removeLoadImpact(name);
};
export default {
  loadScript,
  unloadScript,
};
