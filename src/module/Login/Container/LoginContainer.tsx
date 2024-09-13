import Store, { IStore } from 'store'

import { ILoginDTO } from "../DTO/login.dto";
import LoginComponent from "../Component/LoginComponent";
import { LoginUserAPI } from "service/login.api";
import React from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from 'next/router'

export default function LoginContainer() {
const { setAuth, logOut }: IStore = Store()
  const router = useRouter()
  const mutateLogin = useMutation(LoginUserAPI, {
    onSuccess: (data:any) => {
      toast.success("Login Berhasil")
      setAuth(data)
      router.push("/")
      return
    },
     onError: (error: any) => {
      if (error.message === 'Network Error') {
        toast.warning(error.message)
        logOut()
        location.reload()
        router.push('/login')
        return
      } else if(error.status == 400){
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
          theme: 'dark',
          autoClose: 10000,
        })
         logOut()
        location.reload()
        router.push('/login')
        return
      } else{
        toast.error(error.message)
         logOut()
        location.reload()
        router.push('/login')
        return
      }
    },
  });
  const handleSubmit = (vals: ILoginDTO) => {
    mutateLogin.mutate(vals);
  };
  return (
    <LoginComponent
      handleSubmit={handleSubmit}
      isLoading={mutateLogin.isLoading}
    />
  );
}
