import { DatePicker, Empty, Input, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons'
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import Pagination from './Pagination'
import dayjs from 'dayjs'

interface ITable {
  className?: string
  columns: any
  controlledSort?: SortingState
  dataPerPage?: number
  dataSource: any[]
  fixedHeader?: boolean
  globalFilterLabel?: string
  handleChangeGlobalFilter?: (_query: string) => void
  handleChangeSort?: (_sortState: SortingState) => void
  handlePaginationServerSide?: (_pageIdx: number, _pageSize: number) => void
  height?: string
  isLoading?: boolean
  onClickRow?: (_val: any) => void
  onDoubleClickRow?: (_val: any) => void
  pageIndex?: number
  rowClassName?: string
  serverSide?: boolean
  totalData?: number
  useFilterGlobal?: boolean
  usePagination?: boolean
  tablePrint?: any
  bodyTable?: any
  tableBorder?: number
  tableFooter?: React.ReactNode
  useFilterDate?: boolean
  thTable?: any
  tdTable?: any
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  globalFilterLabel,
}: {
  value: string | number
  onChange: (_value: string | number) => void
  debounce?: number
  globalFilterLabel?: string
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <div className="flex gap-3 items-center w-full">
      <span>{globalFilterLabel || 'Search'}</span>
      <Input
        id="__inputGlobalFilterReactTable"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="!border-none font-poppins"
        allowClear={true}
      />
    </div>
  )
}

export default function Table(props: ITable) {
  const {
    className,
    columns,
    controlledSort,
    dataPerPage: controlledDataPerPage,
    dataSource,
    fixedHeader,
    globalFilterLabel,
    handleChangeGlobalFilter,
    handleChangeSort,
    handlePaginationServerSide,
    height,
    isLoading,
    onClickRow,
    onDoubleClickRow,
    pageIndex: controlledPageIndex,
    rowClassName,
    serverSide,
    totalData,
    useFilterGlobal,
    usePagination,
    tablePrint,
    bodyTable,
    tableBorder,
    tableFooter,
    useFilterDate,
    thTable,
    tdTable,
  } = props
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data: dataSource,
    columns: columns.filter((v: any) => v !== null && v !== undefined),
    state: {
      sorting: controlledSort || sorting,
      globalFilter,
      [serverSide ? 'pagination' : '']: {
        pageIndex: serverSide && controlledPageIndex ? controlledPageIndex : 0,
        pageSize:
          serverSide && controlledDataPerPage ? controlledDataPerPage : 10,
      },
    },
    initialState: {
      pagination: {
        pageIndex: serverSide && controlledPageIndex ? controlledPageIndex : 0,
        pageSize:
          serverSide && controlledDataPerPage ? controlledDataPerPage : 10,
      },
    },
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: usePagination ? getPaginationRowModel() : undefined,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    enableGlobalFilter: useFilterGlobal ? true : false,
    manualFiltering: serverSide ? true : false,
    manualPagination: serverSide ? true : false,
    manualSorting: serverSide ? true : false,
  })

  useEffect(() => {
    handleChangeGlobalFilter && handleChangeGlobalFilter(globalFilter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalFilter])

  useEffect(() => {
    handleChangeSort && handleChangeSort(sorting)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting])

  const handleOnChangePagination = (pageIdx: number, pageSize: number) => {
    table.setPageIndex(pageIdx - 1)
    table.setPageSize(pageSize)
  }

  const classFixedHeader = fixedHeader ? '!sticky z-20 top-0' : ''
  const classNameTrFixed = fixedHeader ? '!mt-20 relative' : ''
  const classNameContainerTable = fixedHeader
    ? `${height || 'max-h-[450px]'} !overflow-auto`
    : ''

  return (
    <>
      <div
        className={`block overflow-x-auto ${classNameContainerTable} ${
          className || ''
        }`}
      >
        <table
          className={`min-w-full text-sm text-left text-black-500 border-separate border-spacing-0 ${bodyTable}`}
          border={tableBorder}
        >
          <thead
            className={`${tablePrint} text-xs text-gray-700 uppercase bg-slate-100 ${classFixedHeader}  `}
          >
            <>
              {useFilterGlobal && (
                <tr>
                  <th
                    colSpan={table.getHeaderGroups()[0]?.headers?.length || 1}
                    className="py-1 px-2"
                  >
                    <div className="flex justify-between">
                      <DebouncedInput
                        value={globalFilter ?? ''}
                        onChange={(value) => setGlobalFilter(String(value))}
                        className="p-2 font-lg shadow border border-block "
                        placeholder="Search all columns..."
                        globalFilterLabel={globalFilterLabel}
                      />

                      {useFilterDate && (
                        <div className="flex gap-2">
                          <DatePicker
                            className="w-32"
                            picker="date"
                            placeholder="Pilih tanggal"
                          />
                          <DatePicker
                            className="w-20"
                            defaultValue={dayjs()}
                            picker="year"
                          />
                        </div>
                      )}
                    </div>
                  </th>
                </tr>
              )}
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header: any) => {
                      const columnDef = header.column.columnDef
                      const width = columnDef?.width
                      const classWidth = width ? `!w-[${width}px]` : ''

                      const isSticky = columnDef?.sticky
                      const centerHeader = columnDef?.centerHeader
                      return (
                        <th
                          key={header.id}
                          scope="col"
                          className={`py-1 ${thTable} ${
                            isSticky ? '!sticky bg-white' : ''
                          }${
                            isSticky
                              ? isSticky === 'left'
                                ? ' left-0 border-r-2'
                                : ' right-0 border-l-2'
                              : ''
                          } ${classWidth}`}
                        >
                          {header.isPlaceholder ? null : (
                            <div
                              className={`${
                                header.column.getCanSort()
                                  ? 'cursor-pointer select-none flex gap-3'
                                  : ''
                              } ${
                                centerHeader ? 'justify-center text-center' : ''
                              }`}
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              <span>
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              </span>
                              <span>
                                {{
                                  asc: <SortAscendingOutlined />,
                                  desc: <SortDescendingOutlined />,
                                }[header.column.getIsSorted() as string] ??
                                  null}
                              </span>
                            </div>
                          )}
                        </th>
                      )
                    })}
                  </tr>
                )
              })}
            </>
          </thead>

          <tbody className={`${classNameTrFixed}`}>
            {isLoading ? (
              <tr className="bg-white">
                <td
                  colSpan={table.getHeaderGroups()[0].headers.length}
                  style={{ padding: 20 }}
                >
                  <Skeleton />
                </td>
              </tr>
            ) : dataSource.length > 0 ? (
              table.getRowModel().rows.map((row, idx) => {
                return (
                  <tr
                    key={row.id}
                    className={`hover:bg-slate-100 ${rowClassName || ''}`}
                    onDoubleClick={() =>
                      onDoubleClickRow && onDoubleClickRow(row.original)
                    }
                    onClick={() => onClickRow && onClickRow(row.original)}
                  >
                    {row.getVisibleCells().map((cell: any) => {
                      const { sticky, onDoubleClick } = cell.column.columnDef
                      return (
                        <td
                          onDoubleClick={(e) => {
                            onDoubleClick && onDoubleClick(e)
                          }}
                          key={cell.id}
                          className={` ${
                            cell.column.columnDef.accessorKey === 'no'
                              ? 'w-2  text-center'
                              : typeof cell.column.columnDef.accessorKey ===
                                  'number'
                                ? 'text-right'
                                : 'text-left'
                          } ${tdTable} border-t-0
                          ${
                            idx % 2 === 0
                              ? 'bg-white'
                              : `bg-white ${tablePrint}`
                          }
                          ${sticky ? '!sticky border-slate-400 z-10' : ''}
                          }${
                            sticky
                              ? sticky === 'left'
                                ? ' left-0 border-r-2 first:border-y-[#e5e7eb] first:border-l-[#e5e7eb]'
                                : ' right-0 border-l-2 last:border-y-[#e5e7eb] last:border-r-[#e5e7eb] text-center'
                              : ''
                          }`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            ) : (
              <tr className="bg-white border-b">
                <td
                  colSpan={table.getHeaderGroups()[0].headers.length}
                  style={{ padding: 20 }}
                >
                  <Empty />
                </td>
              </tr>
            )}
          </tbody>
          {tableFooter && <tfoot>{tableFooter}</tfoot>}
        </table>
      </div>
      {usePagination && (
        <div className="flex items-center">
          <Pagination
            showSizeChanger
            dataLength={serverSide ? totalData || 0 : dataSource.length || 0}
            currentPage={table.getState().pagination.pageIndex + 1}
            handleOnChangePagination={
              serverSide && handlePaginationServerSide
                ? handlePaginationServerSide
                : handleOnChangePagination
            }
          />
        </div>
      )}
    </>
  )
}
