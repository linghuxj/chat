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
}

export interface Plan {
  id: number,
  mainImage: string,
  tag: string,
  content: string,
  amount: number,
  createTime: string,
  user: {
    id: number,
    userName: string,
    avatar: string,
  },
  companyName: string,
}
