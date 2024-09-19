import { CaretDownOutlined, UserOutlined } from '@ant-design/icons'

import React from 'react'

require('dayjs/locale/id')

interface IProps {
  children: any
}

export default function Template(props: IProps) {
  const { children } = props
  return (
    <>
      <header className="bg-[#0571E1] text-white flex h-[60px] text-xl w-full justify-end gap-x-5">
       <nav className='w-52 md:w-64 flex justify-between  items-center  md:px-3  px-0'>
        <div>
          <UserOutlined className='text-3xl md:text-4xl' />
        </div>
        <div className='flex flex-col gap-3 ml-2 items-start'>
          <span className='font-bold text-sm md:text-lg leading-none'>
            Nur Muhamad Soleh <CaretDownOutlined style={{ fontSize: '20px' }}/>
          </span>
          <span className='font-light text-sm leading-none'>
            Admin  
          </span>        
        </div>
       </nav>
      </header>
      {children}
    </>
  )
}
