import { Warn } from './log';
import { JSDELIVR_REGISTRY } from '../constant';
import { getLoadBase, setLoadedObj, clearLoadedTemp } from './store';
import { loadMulti } from './load';
import { assertionFunction, isArray } from './type';
import { urlReg } from './url';
import type { CrossOrigin, Options } from '../index';

const removeLoadImpact = (name: string) => {
  const { LoadedMap, LoadStatusMap } = getLoadBase();
  const script = document.head.querySelector(`script[name="${name}"]`);
  script?.parentNode?.removeChild(script);
  delete LoadedMap[name];
  delete LoadStatusMap[name];
};
const onloadInner = <T>(
  name: string,
  options: Options,
  loadedDeps: T[],
  resolve: Function,
  reject: Function,
) => {
  const {
    LoadedMap, LoadStatusMap, ResolveMap, RejectMap, LoadedObj,
  } = getLoadBase();
  const { deps: loDeps, factory } = LoadedObj || {};
  const registry = options?.registry;
  const useJsdelivr = !urlReg.test(name) && (!registry || registry === JSDELIVR_REGISTRY);
  try {
    const [libName, version] = `${name}`.split(/(?!^@)+@/);
    assertionFunction(factory, `the library(${name}) does not point to umd or amd resources by default, you can point to the correct resource by setting scriptAlias${useJsdelivr ? `, you can go to the website(https://www.jsdelivr.com/package/npm/${libName}?version=${version || ''}) to find the corresponding resources` : ''}`);
  } catch (err) {
    removeLoadImpact(name);
    clearLoadedTemp(name);
    reject(err);
    return;
  }
  const handler = (deps: T[]) => {
    const result: T = factory(...deps) || <T>LoadedMap.exports;
    if (factory.length > deps.length) Warn('the library that the library depends on may not be injected correctly, please check whether deps is correctly declared');
    LoadedMap[name] = result;
    LoadStatusMap[name] = 'loaded';
    clearLoadedTemp(name);
    (ResolveMap[name] || []).forEach((r) => r(result));
    resolve(result);
  };
  if (loadedDeps.length > 0 || !isArray(loDeps) || !(<string[]>loDeps).length) handler(loadedDeps);
  else loadMulti(options, <string[]>loDeps).then((deps) => handler(<T[]>deps));
};

const onerrorInner = (name: string, reject: Function) => {
  const { LoadStatusMap, ResolveMap, RejectMap } = getLoadBase();
  const error = new Error(`${name} load failed`);
  LoadStatusMap[name] = 'loadFailed';
  reject(error);
  (RejectMap[name] || []).forEach((r) => r(error));
  setLoadedObj(undefined);
  delete ResolveMap[name];
  delete RejectMap[name];
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
    if (LoadedMap[name]) {
      resolve(LoadedMap[name] as T);
      return;
    }
    if (document.head.querySelector(`script[name="${name}"]`)) {
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
    script.onerror = (e) => onerrorInner(name, reject);
    document.head.appendChild(script);
  });
export const unloadScript = (name: string) => {
  removeLoadImpact(name);
};
export default {
  loadScript,
  unloadScript,
};
