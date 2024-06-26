export interface Data {
  code: number,
  msg: string
}

export interface Login extends Data {
  token: string,
}

export interface Point {
  id: number,
  title: string,
  content: string,
  tags: string,
  createTime: string,
  countPlan: number,
  countSummary: number,
  identify?: string,
}

export interface Comment {
  id: number,
  content: string,
  user: {
    id: number,
    userName: string,
    avatar: string,
  },
  createTime: string,
  ipAddress: string,
  liked: number,
  tags?: string,
}

export interface Plan {
  id: number,
  mainImage?: string,
  tag?: string,
  tags: string,
  content: string,
  prePrice?: string,
  createTime: string,
  user: {
    id: number,
    userName: string,
    avatar: string,
  },
  companyName?: string,
  status?: string,
}

export interface DataStatistics {
  chatRequireData: number, // 商机
  chatRequirePlanData: number, // 意向合作
  chatRequireSummaryData: number, // 推荐合作
  userLoginData: number, // DAU
}
