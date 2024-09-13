import {Button, Tooltip} from "antd"
import {
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons'
import {DeleteUserAPI, GetListUserAPI} from "service/listUser.api"
import React, {useEffect, useState} from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'

import HomeComponent from '../Component/HomeComponent'
import { IListUserDAO } from "../DAO/listUser.dao"
import Image from "next/image";
import ModalAddUserContainer from "./ModalAddUserContainer"
import ModalConfirm from "component/ModalConfirm"
import { toast } from "react-toastify"

export default function HomeContainer() {
const [modalUser, setModalUser] = useState<boolean>(false);
const [pageIndex, setPageIndex] = useState(1)
const [pageSize, setPageSize] = useState(10)
const [selectedRows, setSelectedRows] = useState<any[]>([])
const [selectedData, setSelectedData] = useState<any>()
const [pageQuery, setPageQuery] = useState<string | any>("")
const [filteredUsers, setFilteredUsers] = useState<IListUserDAO[]>([]);
const {data: dataListUser, isFetching: isFetchingDataListUser, refetch: retechDataListUser} = useQuery(['Get List User', pageIndex, pageSize], GetListUserAPI)

  const mutateDeleteUser = useMutation(DeleteUserAPI, {
    onSuccess: () => {
      toast.success("Berhasil Di Hapus")
      retechDataListUser()
      setSelectedRows([])
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
  const handlePaginationServerSide = (index: number, size: number) =>{
    setPageIndex(index)
    setPageSize(size)
  }
 const handleChangeGlobalFilter = (v: string) => {
  setPageQuery(v.toLowerCase());
};
  useEffect(()=>{
    setPageIndex(1)
  }, [pageQuery])
  useEffect(()=>{
    let filtered:any;
  if (pageQuery === "") {
    filtered = dataListUser?.data;
  } else {
     filtered = dataListUser?.data?.filter((item: any) => {
      const firstName = item?.first_name?.toLowerCase().replace(/ /g, '') || "";
      const lastName = item?.last_name?.toLowerCase().replace(/ /g, '') || "";
       const namaLengkap = `${firstName} ${lastName}`.toLowerCase().replace(/ /g, '') || ""
      const email = item?.email?.toLowerCase().replace(/ /g, '') || "";
      
      return firstName.includes(pageQuery) || lastName.includes(pageQuery) || email.includes(pageQuery) || namaLengkap.includes(pageQuery);
    });
  }
    setFilteredUsers(filtered)
  },[dataListUser, pageQuery])
  const toggleRow = (id: any) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId: any) => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }
    let initialValues: any;
    if(selectedData){
          initialValues = {
          ...selectedData,
          name: selectedData?.first_name + " " + selectedData?.last_name,
          job: ""
        }
    }
    if(selectedData == null || selectedData.length == 0 ){
      initialValues = {
        name: "",
        job: ""
      }
    }

    
    const handleDeleteUser = (rowData:any) => {
     mutateDeleteUser.mutate(rowData.id)
    }
    const handleAllDelete = () =>{
      selectedRows?.map((item:any)=>{
        mutateDeleteUser.mutate(item.id)
      })
    }
    const handleOpenUser = () =>{
      setModalUser(true);
      setSelectedRows([]);
      setSelectedData(null)
    }
    const columnHeaderPending = [
        {
      header: 'NO.',
      centerHeader: true,
      cell: (row: any) => (
        <div className="text-center w-1/2 ">
          {(pageIndex - 1) * pageSize + (row.row.index + 1)}
        </div>
      ),
    },
    {
      header: <div className="text-left w-auto ">SELECT</div>,
      accessorKey: 'SELECT',
      enableSorting: false,
      cell: (row: any) => {
        return (
         <div className="w-1/6 text-center">
            <input
              onChange={() => toggleRow(row.row.original)}
              checked={selectedRows.includes(row.row.original)}
              className="h-4 w-4 rounded-lg"
              type="checkbox"
            />
          </div>
        )
      },
    },
    {
      header: <div className="text-center w-auto  bg-red- ml-1">Panggilan</div>,
      accessorKey: `first_name`,
      enableSorting: true,
      cell: (row: any) => {
        const rowData = row?.row?.original
        return (
          <Tooltip placement="topLeft" title={`${rowData?.first_name}`}>
          <div className="whitespace-nowrap overflow-x-hidden w-1/2 ml-1">
            {`${rowData?.first_name}`}
          </div>
          </Tooltip>
        )
      },
    },
    {
      header: <div className="text-center w-auto -ml-8">Nama</div>,
      accessorKey: `last_name`,
      enableSorting: true,
      cell: (row: any) => {
        const rowData = row?.row?.original
        return (
          <Tooltip placement="topLeft" title={`${rowData?.first_name.toLowerCase()} ${rowData?.last_name.toLowerCase()}`} className="text-left w-1/2 ">
          <div className="whitespace-nowrap overflow-x-hidden w-4/5 -ml-8">
            {`${rowData?.first_name} ${rowData?.last_name}`}
          </div>
          </Tooltip>
        )
      },
    },
    {
      header: <div className="text-center w-auto -ml-12">Email</div>,
      accessorKey: 'email',
      enableSorting: true,
      centerHeader: false,
      cell: (row: any) => {
        const rowData = row?.row?.original
        return (
          <Tooltip placement="topLeft" title={rowData?.email.toLowerCase()} className="text-left w-[16vw]">
          <div className="whitespace-nowrap overflow-x-hidden w-[8vw] -ml-10 ">
            {rowData?.email.toLowerCase()}
          </div>
          </Tooltip>
        )
      },
    },
    {
      header: <div className="text-center w-auto -ml-4">Photo</div>,
      accessorKey: 'avatar',
      centerHeader: false,
      cell: (row: any) => {
        const rowData = row?.row?.original
        const index = row.row.index
        return (
          <div className="w-[7vw] -ml-4">
            <Image src={rowData?.avatar} alt={`ImageAvatar_${index}`} width={40} height={30} className="rounded-sm"/>
          </div>
        )
      },
    },
    {
      header: <div className="text-center  w-auto -ml-6">AKSI</div>,
      accessorKey: 'AKSI',
      centerHeader: false,      cell: (row: any) => {
        const rowOriginal = row.row.original
        return (
              <div className="w-[6vw] -ml-6 flex flex-col gap-1 md:flex-row">
            <Tooltip title="Edit User" color="#000000">
              <Button
                className="w-[3vw]"
                size="small"
                type="text"
                onClick={() => {
                  setSelectedData(row.row.original)
                  setModalUser(true)
                }}
                icon={
                  <EditOutlined className="text-blue-500 font-medium text-sm" />
                }
              />
            </Tooltip>
            <Tooltip title="Delete User" color="#000000">
              <ModalConfirm icon={<DeleteOutlined className="text-red-500"/>} size="small" type={"link"} okText="Hapus" title={`Apakah Anda Yakin Ingin Menghapus User ${rowOriginal.first_name} ?`} onOk={()=> handleDeleteUser(rowOriginal)}/>
            </Tooltip>
          </div>
        )
      },
    },
  ]
  return (
    <>
    <HomeComponent handleChangeGlobalFilter={handleChangeGlobalFilter} handleDeleteAllUser={handleAllDelete} selectedRows={selectedRows} isLoadingTable={isFetchingDataListUser} handlePaginatinServerSide={handlePaginationServerSide} pageIndex={pageIndex} columnListUser={columnHeaderPending} dataListUser={filteredUsers} handleOpenModalUser={handleOpenUser}/>
    {modalUser && (
      <ModalAddUserContainer initialValues={initialValues} onClose={() => {
        retechDataListUser() 
        setModalUser(false)
      }}/>
    )}
    </>
  )
}
