import type { Loader } from './index';
declare module 'vue/types/vue' {
    interface Vue {
        $loader: Loader;
    }
}
