import type { AsyncComponent } from 'vue/types/options';
import type { PluginObject } from 'vue/types/plugin';
declare module 'vue/types/vue' {
    interface Vue {
        $loader: Loader;
    }
}
export declare type LoadStatus = 'loading' | 'loaded' | 'loadFailed';
export declare type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;
export declare type Target = string | {
    name: string;
    style?: boolean;
    deps?: Target[];
    nameAlias?: string;
    styleAlias?: string;
};
export declare type Dep = Target;
export declare type LibAlias = [nameAlias: string, styleAlias?: string, deps?: Dep[]];
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
}
interface Load {
    <T>(arg: Target): Promise<T>;
    <T>(arg: Target[]): Promise<T[]>;
}
interface Unload {
    (arg: string): void;
    (arg: string[]): void;
}
interface VueComponentLoad {
    (arg: Target): AsyncComponent;
}
interface Loader extends PluginObject<never>, Load {
    options: Options;
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
