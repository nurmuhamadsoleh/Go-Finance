import {CreateUserAPI, UpdateUserAPI} from "service/listUser.api"

import { IListUserDAO } from "../DAO/listUser.dao"
import ModalAddUserComponent from '../Component/ModalAddUserComponent'
import React from 'react'
import dayjs from "dayjs"
import { toast } from "react-toastify"
import { useMutation } from '@tanstack/react-query'

interface IProps {
  onClose: () => void
  initialValues: IListUserDAO
}
export default function ModalAddUserContainer(props: IProps) {
  const { onClose, initialValues } = props
  const mutateCreateUser = useMutation(CreateUserAPI,{
    onSuccess: (data:any) => {
      toast.success(`Create User ${data?.name} Dan Pekerjaan ${data?.job} Berhasil`)
      onClose()
    },
    onError: (error: any) => {
      if (error.message === 'Network Error') {
        toast.warning(error.message)
        return
      } else {
        toast.error(error.message)
        return
      }
    },
  })
   const mutateUpdateUser = useMutation(UpdateUserAPI, {
        onSuccess: (data: IListUserDAO) => {
          toast.success(`Berhasil Di Update Nama ${data?.name} Dan ${data?.job !== "" ? `Pekerjaan ${data?.job}` : `Terakhir Update ${dayjs().format("YYYY-MM-DD HH:mm:ss")}`}`)
          onClose()
        },
        onError: (error: any) => {
          if (error.message === 'Network Error') {
            toast.warning(error.message)
            return
          } else {
            toast.error(error.message)
            return
          }
        },
    })
  const handleSubmit = (vals: any) => {
    if(initialValues?.id){
      mutateUpdateUser.mutate(vals)
    }
    if(!initialValues?.id){
      mutateCreateUser.mutate({
        name: vals?.name,
        job: vals?.job,
        id: "",
        createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss")
      })
    }
  }
  return (
    <ModalAddUserComponent initialValues={initialValues} onClose={onClose} handleSubmit={handleSubmit}/>
  )
}
