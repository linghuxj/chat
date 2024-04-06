import {Point} from "@/types/custom";

export interface StoreState {
  isLogin: boolean,
  loginToken: string,
  points: Point[],
  initPoints: boolean,
}

export const initialState: StoreState = {
  isLogin: false,
  loginToken: '',
  points: [],
  initPoints: false,
}
