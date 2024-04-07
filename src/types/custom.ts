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
  content: string
}

export interface Comment {
  id: number,
  content: string,
  user: {
    id: number,
    username: string,
    avatar: string,
  },
  createTime: string,
  ipAddress: string,
  liked: number,
}
