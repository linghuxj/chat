export interface StoreState {
  isLogin: boolean,
  loginToken: string,
}

export const initialState: StoreState = {
  isLogin: false,
  loginToken: '',
}
