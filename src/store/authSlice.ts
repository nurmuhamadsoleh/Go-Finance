import { ILoginDAO } from "module/Login/DAO/login.dao";

export interface IAuthState {
  setAuth: (_params?: ILoginDAO) => void
  auth?:{
    token: string
  }
  logOut: () => void
}

const createAuthSlice = (set: any, _get: any) =>
  <IAuthState>{
    setAuth: (params: ILoginDAO) => {
      const data = params;
      set(() => ({ auth: data}));
    },
    logOut: () => {
      localStorage.clear()
      set(() => ({
        auth: undefined,
      }))
    },
  };

export default createAuthSlice;
