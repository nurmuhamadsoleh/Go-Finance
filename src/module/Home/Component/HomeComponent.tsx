import {
  PlusOutlined,
  UsergroupDeleteOutlined
} from '@ant-design/icons'

import {Button} from "antd"
import { IListUserDAO } from "module/Home/DAO/listUser.dao"
import React from 'react'
import Table from 'component/Table'

interface IProps{
  columnListUser: any[]
  dataListUser?: IListUserDAO | any
  filteredUsers?: IListUserDAO | any
  handleOpenModalUser: () => void;
  pageIndex:number;
  handlePaginatinServerSide: (_index: number, _size: number) => void;
  handleChangeGlobalFilter: (_query: any) => void
  isLoadingTable: boolean
  handleDeleteAllUser : (_vals:any) => void
  selectedRows: any[]
}
export default function HomeComponent(props: IProps) {
  const { columnListUser, dataListUser, handleOpenModalUser, pageIndex, handlePaginatinServerSide, isLoadingTable, handleDeleteAllUser, selectedRows, handleChangeGlobalFilter, filteredUsers } = props
  return (
    <>
      <main className=' -mt-6'>
        <section className="w-full mt-9">
          <div className="flex justify-end mr-2 mb-3 md:mb-1 gap-2">
             <Button icon={<UsergroupDeleteOutlined />} size="middle" type="default" className='bg-[#0571E1] text-white' onClick={handleDeleteAllUser} disabled={selectedRows?.length === 0 ?? false}>Hapus Semua</Button>
            <Button icon={<PlusOutlined />} size="middle" type="default" className='bg-[#0571E1] text-white' onClick={handleOpenModalUser}>Tambah</Button>
          </div>
          <section>
            <Table columns={columnListUser} 
            dataSource={filteredUsers || []} 
            serverSide
            isLoading={isLoadingTable}
            fixedHeader 
            handleChangeGlobalFilter={handleChangeGlobalFilter}
            handlePaginationServerSide={handlePaginatinServerSide}
            useFilterGlobal 
            globalFilterLabel="Cari" 
            usePagination
            pageIndex={pageIndex - 1} 
            totalData={dataListUser? parseInt(dataListUser?.total, 10) : 0} 
            // className="w-auto md:w-screen"
            height="h-[78vh] md:h-[63vh]"
            thTable={'!py-0'}
            tdTable={'!py-0'}
            bodyTable={'!text-[12px]'}
            />
          </section>
        </section>  
        
      </main>
    </>
  )
}
