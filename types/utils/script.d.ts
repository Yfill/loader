import type { CrossOrigin, Options } from '../index';
export declare const loadScript: <T>(name: string, options: Options, url: string, crossOrigin: CrossOrigin, loadedDeps: T[]) => Promise<T>;
export declare const unloadScript: (name: string) => void;
declare const _default: {
    loadScript: <T>(name: string, options: Options, url: string, crossOrigin: CrossOrigin, loadedDeps: T[]) => Promise<T>;
    unloadScript: (name: string) => void;
};
export default _default;
