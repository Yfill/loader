import type { AsyncComponent } from 'vue/types/options';
import type { Options, Target } from '../index';
export declare const loadSingle: <T>(options: Options, target: Target) => Promise<T>;
export declare const unloadSingle: (name: string) => void;
export declare const loadMulti: <T>(options: Options, targetList: Target[]) => Promise<T[]>;
export declare const unloadMulti: (names: string[]) => void;
export declare function loaded<T>(name: string, optLoadedMap: {
    [name: string]: unknown;
}): T;
export declare function loaded<T>(names: string[], optLoadedMap: {
    [name: string]: unknown;
}): T[];
export declare function load<T>(options: Options, target: Target): Promise<T>;
export declare function load<T>(options: Options, targetList: Target[]): Promise<T[]>;
export declare function unload(name: string): void;
export declare function unload(names: string[]): void;
export declare function vueComponentLoad(options: Options, arg: Target): AsyncComponent<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps>;
declare const _default: {
    load: typeof load;
    unload: typeof unload;
    vueComponentLoad: typeof vueComponentLoad;
};
export default _default;
