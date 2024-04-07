import {StateCreator} from "zustand/vanilla";
import {Store} from "./store";
import {customService} from "@/services/custom";
import {setNamespace} from "@/utils/storeDebug";

const n = setNamespace('custom');

export interface StoreAction {
  login: (param: any) => Promise<void>,
  getPoints: (sessionId: string | undefined | null, topicId: string | undefined | null) => Promise<void>,
  getAllPoint: () => Promise<void>,
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
  getAllPoint: async () => {
    return get().getPoints(null, null);
  }
})
