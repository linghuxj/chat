import {StateCreator} from "zustand/vanilla";
import {Store} from "./store";
import {customService} from "@/services/custom";
import {setNamespace} from "@/utils/storeDebug";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {POINT_URL, SESSION_CHAT_URL} from "@/const/url";
import {useSessionStore} from "@/store/session";
import {Point} from "@/types/custom";

const n = setNamespace('custom');

export interface StoreAction {
  activePoint: (id: number) => void;
  switchPoint: (id: number, router?: AppRouterInstance, isMobile?: boolean) => void;
  login: (param: any) => Promise<void>;
  getPoints: (sessionId: string | undefined | null, topicId: string | undefined | null) => Promise<void>;
  getAllPoint: () => Promise<void>;
  pointDetail: (id: number) => Promise<void>;
  getComments: (id: number) => Promise<void>;
  addComment: (content: string, id: number) => Promise<void>;
  getPlans: (id: number) => Promise<void>;
  summaryMessages: (sessionId: string, topicId: string, messages: any) => Promise<void>;
  statistics: () => Promise<void>;
}

export const createCustomAction: StateCreator<
  Store,
  [['zustand/devtools', never]],
  [],
  StoreAction
> = (set, get) => ({
  activePoint: (id) => {
    if (get().activeId === id) return;

    set({activeId: id}, false, n(`activePoint/${id}`));

    // 切换请求详情
    get().pointDetail(id).then();
    get().getComments(id).then();
    get().getPlans(id).then();
  },
  switchPoint: (id, router, isMobile = false) => {
    get().activePoint(id);

    // TODO: 后续可以把 router 移除
    router?.push(POINT_URL(id, isMobile));
  },
  login: async (param) => {
    const username = param.username;
    const code = '1234';
    const data = await customService.login(username, code);
    set({loginToken: data.token}, false, 'setLoginToken');
    set({isLogin: true}, false, 'isLogin' as string);
  },
  getPoints: async (sessionId, topicId) => {
    set({initPoints: false});
    const resp = await customService.getPoints(sessionId, topicId);
    set({initPoints: true, points: resp.data})
  },
  getAllPoint: async () => {
    return get().getPoints(null, null);
  },
  pointDetail: async (id) => {
    set({initPoint: false});
    const resp = await customService.getPointDetail(id);
    set({initPoint: true, point: resp.data})
  },
  getComments: async (id) => {
    set({initComments: false});
    const resp = await customService.getComments(id);
    set({initComments: true, comments: resp.data})
  },
  addComment: async (content, id) => {
    const resp = await customService.addComment(id, content);
    if (resp.code == 200) {
      get().getComments(id).then();
    }
  },
  getPlans: async (id) => {
    set({initPlans: false});
    const resp = await customService.getPlans(id);
    set({initPlans: true, plans: resp.data})
  },
  summaryMessages: async (sessionId, topicId, messages) => {
    await customService.summaryMessages(sessionId, topicId, messages);
  },
  statistics: async () => {
    const totalResp = await customService.statistics();
    set({totalStat: totalResp.data})
    const resp = await customService.statistics(3);
    set({stat: resp.data})
  }
})
