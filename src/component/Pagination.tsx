import { Pagination as PaginationAntd } from "antd";
import React from "react";

interface IPagination {
  dataLength: number;
  currentPage: number;
  handleOnChangePagination: (_pageIdx: number, _pageSize: number) => void;
  showSizeChanger?: boolean;
}

export default function Pagination(props: IPagination) {
  const { dataLength, currentPage, handleOnChangePagination } = props;

  return (
    <PaginationAntd
      showSizeChanger
      total={dataLength}
      current={currentPage}
      onChange={handleOnChangePagination}
      size="small"
    />
  );
}
