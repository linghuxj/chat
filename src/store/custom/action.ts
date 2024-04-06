import {StateCreator} from "zustand/vanilla";
import {Store} from "./store";
import useSWR, {SWRResponse} from "swr";
import {Login} from "@/types/custom";
import {customService} from "@/services/custom";

export interface StoreAction {
  useLogin: (username: string, code: string) => SWRResponse<Login>,
}

export const createCustomAction: StateCreator<
  Store,
  [['zustand/devtools', never]],
  [],
  StoreAction
> = (set, get) => ({
  useLogin: (username, code) => useSWR<Login>(
    [username, code],
    async ([username, code]: [string, string]) =>
      customService.login(username, code),
    {
      onSuccess: (data) => {
        set({loginToken: data.token, isLogin: true}, false, 'useLogin',)
      }
    },
  ),
})
