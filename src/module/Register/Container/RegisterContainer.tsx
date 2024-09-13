import {CreateRegisterAPI} from "service/login.api"
import { IRegisterDTO } from "../DTO/register.dto"
import React from 'react'
import RegisterComponent from '../Component/RegisterComponent'
import { toast } from "react-toastify"
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'

export default function RegisterContainer() {
  const router = useRouter()
  const mutateRegister = useMutation(CreateRegisterAPI, {
    onSuccess: () => {
      toast.success("Register Berhasil")
      router.push("/login")
    },
    onError: (error: any) => {
      if (error.message === 'Network Error') {
        toast.warning(error.message)
        return
      } else if(error.status == 400){
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
          theme: 'dark',
          autoClose: 10000,
        })
        return
      } else{
        toast.error(error.message)
        return
      }
    },
  })
  const handleSubmit = (vals: IRegisterDTO) => {
    mutateRegister.mutate(vals)
  }
  return (
    <RegisterComponent handleSubmit={handleSubmit} isLoading={mutateRegister.isLoading}/>
  )
}
