import { setAuthority } from '@/utils/authority';
import { parse } from 'qs';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const isUrl = (path: string): boolean => {
  return reg.test(path);
};

const getPageQuery = (): any => {
  return parse(window.location.href.split('?')[1]);
};

export { isUrl, setAuthority, getPageQuery };
