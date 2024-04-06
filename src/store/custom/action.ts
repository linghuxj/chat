import {StateCreator} from "zustand/vanilla";
import {Store} from "./store";
import useSWR, {SWRResponse} from "swr";
import {Login, Point} from "@/types/custom";
import {customService} from "@/services/custom";
import {setNamespace} from "@/utils/storeDebug";
import {useChatStore} from "@/store/chat";

const n = setNamespace('custom');

export interface StoreAction {
  login: (param: any) => Promise<void>,
  getPoints: (sessionId: string, topicId: string | undefined) => Promise<void>,
}

export const createCustomAction: StateCreator<
  Store,
  [['zustand/devtools', never]],
  [],
  StoreAction
> = (set, get) => ({
  login: async (param) => {
    const username = param.username;
    const code = param.code;
    const data = await customService.login(username, code);
    set({loginToken: data.token}, false, 'setLoginToken');
    set({isLogin: true}, false, 'isLogin' as string);
  },
  getPoints: async (sessionId, topicId) => {
    set({initPoints: false});
    const resp = await customService.getPoints(sessionId, topicId);
    set({initPoints: true, points: resp.data})
  },
})
