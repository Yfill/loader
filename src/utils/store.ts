import type { LoadStatus } from '../index';

type LoadedData = { deps: unknown, factory: unknown }

const LoadedMap: { [key: string]: unknown } = { exports: {} };

const LoadStatusMap: { [key: string]: LoadStatus } = {};

const ResolveMap: { [key: string]: Function[] } = {};

const RejectMap: { [key: string]: Function[] } = {};

let LoadedObj: LoadedData | undefined;

declare const window: Window & { $LOADER_STORE: {LoadedObj: LoadedData | undefined} };

window.$LOADER_STORE = { LoadedObj: undefined };

export const getLoadBase = () => ({
  LoadedMap, LoadStatusMap, ResolveMap, RejectMap, LoadedObj,
});

export const setLoadedObj = (value?: LoadedData) => {
  LoadedObj = value;
  window.$LOADER_STORE.LoadedObj = value;
};

export const clearLoadedTemp = (name: string) => {
  LoadedMap.exports = {};
  setLoadedObj(undefined);
  delete ResolveMap[name];
  delete RejectMap[name];
};
