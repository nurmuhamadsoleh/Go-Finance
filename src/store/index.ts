import createAuthSlice, { IAuthState } from "store/authSlice";
import { devtools, persist } from "zustand/middleware";

import { create } from "zustand";


export interface IStore extends IAuthState {}

const store: any = persist(
  (set: any, get: any) =>
    <IStore>{
      ...createAuthSlice(set, get),
    },
  {
    name: "GoFinance",
    partialize: (state: any) => ({
      auth: state.auth,
    }),
  }
);

const createStore: any = create(
  devtools<IAuthState>(store, { name: "GoFinance" })
);
export default createStore;
