import {Comment, Plan, Point} from "@/types/custom";

export interface StoreState {
  activeId: number,
  isLogin: boolean,
  loginToken: string,
  points: Point[],
  initPoints: boolean,
  point: Point,
  initPoint: boolean,
  comments: Comment[],
  initComments: boolean,
  plans: Plan[],
  initPlans: boolean,
}

export const initialState: StoreState = {
  activeId: 0,
  isLogin: false,
  loginToken: '',
  points: [],
  initPoints: false,
  point: {
    id: 0,
    title: '',
    content: '',
    tags: '',
    createTime: '',
  },
  initPoint: false,
  comments: [],
  initComments: false,
  plans: [],
  initPlans: false,
}
