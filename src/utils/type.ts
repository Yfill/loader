export const getType = (value: unknown) => ({}).toString.call(value).slice(8, -1).toLowerCase();

export const isArray = (value: unknown) => getType(value) === 'array';

export const isString = (value: unknown) => getType(value) === 'string';

export const isFunction = (value: unknown) => getType(value) === 'function';

export const isObject = (value: unknown) => getType(value) === 'object';

function check(fn: (value: unknown) => boolean, arg: unknown, typeName: string, errMes?: string) {
  if (!fn(arg)) throw new TypeError(errMes || `${arg} is not a ${typeName}`);
}

export function assertionArray<T>(arg: unknown, errMes?: string): asserts arg is Array<T> {
  check(isArray, arg, 'array', errMes);
}

export function assertionString(arg: unknown, errMes?: string): asserts arg is String {
  check(isString, arg, 'string', errMes);
}

export function assertionFunction(arg: unknown, errMes?: string): asserts arg is Function {
  check(isFunction, arg, 'function', errMes);
}

export default {
  getType,
  isArray,
  isString,
  isFunction,
  isObject,
  assertionArray,
  assertionString,
  assertionFunction,
};
