import {StateCreator} from "zustand/vanilla";
import {createCustomAction, StoreAction} from "./action";
import type {StoreState} from "./initialState";
import {initialState} from "./initialState";
import {createWithEqualityFn} from "zustand/traditional";
import {devtools, persist, PersistOptions} from "zustand/middleware";
import {isDev} from "@/utils/env";
import {shallow} from "zustand/shallow";
import {createHyperStorage} from "@/store/middleware/createHyperStorage";

export type Store = StoreAction & StoreState;

const BACKEND_CUSTOM = 'CHAT_CUSTOM';

const createStore: StateCreator<Store, [['zustand/devtools', never]]> = (...parameters) => ({
  ...initialState,
  ...createCustomAction(...parameters),
})

const persistOptions: PersistOptions<Store> = {
  name: BACKEND_CUSTOM,

  skipHydration: true,

  storage: createHyperStorage({}),

  version: 0,
};

export const useCustomStore = createWithEqualityFn<Store>()(
  persist(
    devtools(createStore, {
      name: BACKEND_CUSTOM + (isDev ? '_DEV' : ''),
    }),
    persistOptions,
  ),
  shallow,
);
