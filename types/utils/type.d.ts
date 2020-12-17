export declare const getType: (value: unknown) => string;
export declare const isArray: (value: unknown) => boolean;
export declare const isString: (value: unknown) => boolean;
export declare const isFunction: (value: unknown) => boolean;
export declare function assertionArray<T>(arg: unknown, errMes?: string): asserts arg is Array<T>;
export declare function assertionString(arg: unknown, errMes?: string): asserts arg is String;
export declare function assertionFunction(arg: unknown, errMes?: string): asserts arg is Function;
declare const _default: {
    getType: (value: unknown) => string;
    isArray: (value: unknown) => boolean;
    isString: (value: unknown) => boolean;
    isFunction: (value: unknown) => boolean;
    assertionArray: typeof assertionArray;
    assertionString: typeof assertionString;
    assertionFunction: typeof assertionFunction;
};
export default _default;
