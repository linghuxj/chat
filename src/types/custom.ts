export interface Data {
  code: number,
  msg: string
}

export interface Login extends Data {
  token: string,
}
