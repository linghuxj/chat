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
  // 保存对话消息到后台
  saveMessage: () => withBackendPath(`/api/chat/message/add`),
  // login
  login: () => withBackendPath(`/api/user/login`),
  // 保存商机
  savePoints: () => withBackendPath(`/api/chat/require/add`),
  // 商机列表
  getPoints: () => withBackendPath(`/api/chat/require/list`),
  // 商机详情
  pointDetail: (id: number) => withBackendPath(`/api/chat/require/${id}`),
  // 合作意向列表 - 留言区
  getComments: () => withBackendPath(`/api/chat/require/plan/list`),
  // 新增合作意向
  addComment: () => withBackendPath(`/api/chat/require/plan/add`),
  // 推荐合作 - 解决方案
  getPlans: () => withBackendPath(`/api/chat/require/summary/list`),
  // 总结AI对话内容生成商机
  summaryMessages: () => withBackendPath(`/api/chat/message/gpt`),
})
