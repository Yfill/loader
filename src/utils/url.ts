import type { Options } from '../index';

export const urlReg = /^((https|http|file):)?\/\//;

export const transformToUrl = (
  options: Options,
  name: string,
  alias: string | undefined,
  suffix: string,
) => {
  const { registry, versionHandling } = options;
  const [libName, version = 'index'] = `${name}`.split(/(?!^@)+@/);
  const preUrl = alias || (versionHandling ? `${libName}/${version}${suffix}` : `${name}${suffix}`);
  if (urlReg.test(preUrl)) return preUrl;
  return `${`${registry || ''}`.slice(-1) === '/' ? registry : `${registry || ''}/`}${preUrl}`;
};

export default {
  transformToUrl,
};
