/* eslint-disable sort-keys-fix/sort-keys-fix */
import {transform} from 'lodash-es';

import {withBackendPath, withBasePath} from '@/utils/basePath';

const mapWithBasePath = <T extends object>(apis: T): T => {
  return transform(apis, (result, value, key) => {
    if (typeof value === 'string') {
      // @ts-ignore
      result[key] = withBasePath(value);
    } else {
      result[key] = value;
    }
  });
};

export const API_ENDPOINTS = mapWithBasePath({
  config: '/api/config',
  proxy: '/api/proxy',
  oauth: '/api/auth',

  // agent markets
  market: '/api/market',
  marketItem: (identifier: string) => withBasePath(`/api/market/${identifier}`),

  // plugins
  gateway: '/api/plugin/gateway',
  pluginStore: '/api/plugin/store',

  // chat
  chat: (provider: string) => withBasePath(`/api/chat/${provider}`),

  // trace
  trace: '/api/trace',

  // image
  images: '/api/openai/images',

  // TTS & STT
  stt: '/api/openai/stt',
  tts: '/api/openai/tts',
  edge: '/api/tts/edge-speech',
  microsoft: '/api/tts/microsoft-speech',
});

export const API_BACKEND_ENDPOINTS = mapWithBasePath({
  // saveMessage
  saveMessage: () => withBackendPath(`/api/chat/message/add`),
  // login
  login: () => withBackendPath(`/api/user/login`),
  // savePoints
  savePoints: () => withBackendPath(`/api/chat/require/add`),
  // getPoints
  getPoints: () => withBackendPath(`/api/chat/require/list`),
  // pointDetail
  pointDetail: (id:number) => withBackendPath(`/api/chat/require/${id}`),
  // getComments
  getComments: () => withBackendPath(`/api/chat/require/plan/list`),
  // addComment
  addComment: () => withBackendPath(`/api/chat/require/plan/add`),
  // getPlans
  getPlans: () => withBackendPath(`/api/chat/require/summary/list`),
})
