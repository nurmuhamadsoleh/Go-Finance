import { Button, Result } from 'antd'
import Store, { IStore } from 'store'

import React from 'react'
import { useRouter } from 'next/router'

export default function PageNoAccessComponent() {
  const { auth, logOut }: IStore = Store()
  const router = useRouter()
  return (
     <Result
      status="404"
      title={'Halaman Tidak Ditemukan'}
      subTitle={
        <>
          Halaman <strong>{router?.pathname}</strong> tidak diizinkan mengakses
          halaman ini. Mohon kembali ke halaman sebelumnya klik tombol muat
          ulang.
        </>
      }
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
