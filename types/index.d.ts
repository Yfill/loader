import './vue';
import type { AsyncComponent } from 'vue/types/options';
import type { PluginObject } from 'vue/types/plugin';
export declare type LoadStatus = 'loading' | 'loaded' | 'loadFailed';
export declare type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;
export declare type Target = string | {
    name: string;
    style?: boolean;
    deps?: Target[];
    scriptAlias?: string;
    styleAlias?: string;
};
export declare type Dep = Target;
export declare type LibAlias = [scriptAlias: string, styleAlias?: string, deps?: Dep[]];
export interface LibAliasMap {
    [key: string]: LibAlias;
}
export interface Options {
    crossOrigin?: CrossOrigin;
    registry?: string;
    vueComponentRegistry?: string;
    enableSuffix?: boolean;
    versionHandling?: boolean;
    prefetch?: boolean;
    libAliasMap?: LibAliasMap;
    loadedMap?: {
        [name: string]: unknown;
    };
    [key: string]: unknown;
}
interface Loaded {
    <T>(name: string): T;
    <T>(names: string[]): T[];
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
    load: Load;
    unload: Unload;
    vueComponentLoad: VueComponentLoad;
}
interface LoaderFactory {
    (options?: Options): Loader;
    create(options?: Options): Loader;
}
declare const Loader: LoaderFactory;
export default Loader;
