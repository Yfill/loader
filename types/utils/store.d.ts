import type { LoadStatus } from '../index';
declare type LoadedData = {
    deps: unknown;
    factory: unknown;
};
export declare const getLoadBase: () => {
    LoadedMap: {
        [key: string]: unknown;
    };
    LoadStatusMap: {
        [key: string]: LoadStatus;
    };
    ResolveMap: {
        [key: string]: Function[];
    };
    RejectMap: {
        [key: string]: Function[];
    };
    LoadedObj: LoadedData | undefined;
};
export declare const setLoadedObj: (value?: LoadedData | undefined) => void;
export declare const clearLoadedTemp: (name: string) => void;
export {};
