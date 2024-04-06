import type {Store} from './store';

const getLoginToken = (s: Store) => s.loginToken;

export const customSelectors = {
  getLoginToken,
}
