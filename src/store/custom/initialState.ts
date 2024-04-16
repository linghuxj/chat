import {Comment, DataStatistics, Plan, Point} from "@/types/custom";

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
  stat: DataStatistics,
  totalStat: DataStatistics,
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
    countPlan: 0,
    countSummary: 0,
  },
  initPoint: false,
  comments: [],
  initComments: false,
  plans: [],
  initPlans: false,
  stat: {
    chatRequirePlanData: 0,
    chatRequireData: 0,
    chatRequireSummaryData: 0,
    userLoginData: 0
  },
  totalStat: {
    chatRequirePlanData: 0,
    chatRequireData: 0,
    chatRequireSummaryData: 0,
    userLoginData: 0
  }
}
