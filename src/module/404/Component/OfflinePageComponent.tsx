import { Button, Result } from 'antd'
import Store, { IStore } from 'store'

import React from 'react'
import { useRouter } from 'next/router'

export default function OfflinePageComponent() {
const router = useRouter()
const { auth, logOut }: IStore = Store()
  return (
    <Result
        status="500"
        title="Jaringan Internet Anda Bermasalah, Check Koneksi Internet"
        subTitle="Anda sedang offline. silahkan cek koneksi internet."
        extra={
          <Button
            type="default" className='bg-[#0571E1] text-white'
            onClick={() => {
              if (auth?.token) {
                router.push('/home')
              } else {
                logOut()
                location.reload()
                router.push('/login')
              }
            }}
          >
            Muat Ulang
          </Button>
        }
      />
  )
}
