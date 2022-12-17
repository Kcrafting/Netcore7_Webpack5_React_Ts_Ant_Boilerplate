import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'antd';
import ResizeableTitle from './ResizeableTitle';
import type { ColumnType } from 'antd/lib/table/interface';
import './index.less';
import useResizeTableCol from './useResizeTableCol';
import { useSize } from 'ahooks';
const columes = [
  {
    title: 'Full Name',
    width: '10%',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    width: '10%',
    dataIndex: 'age',
    key: 'age',
  },
  { title: 'Column 1', dataIndex: 'address', ellipsis: true, width: '10%', key: '1' },
  { title: 'Column 2', dataIndex: 'address', ellipsis: true, width: '10%', key: '2' },
  { title: 'Column 3', dataIndex: 'address', ellipsis: true, width: '10%', key: '3' },
  { title: 'Column 4', dataIndex: 'address', ellipsis: true, width: '10%', key: '4' },
  { title: 'Column 5', dataIndex: 'address', ellipsis: true, width: '20%', key: '5' },
  { title: 'Column 6', dataIndex: 'address', ellipsis: true, width: '20%', key: '6' },
  { title: 'Column 7', dataIndex: 'address', ellipsis: true, width: 100, key: '7' },
  { title: 'Column 8', dataIndex: 'address', ellipsis: true, width: 100, key: '8' },
  {
    title: 'aa',
    key: 'operation',
    ellipsis: true,
    width: 100,
    // fixed: 'right',
    render: () => <a>action</a>,
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  },
];
const AntdTableTest: React.FC = () => {
  const tableRef = useRef(null);
  const tableWrapperSize = useSize(tableRef);
  const [wrapperWidth, setWrapperWidth] = useState<number>();
  const { colIsInit, tableColumns } = useResizeTableCol(wrapperWidth, tableRef, columes);

  useEffect(() => {
    console.log(tableWrapperSize);
    if (tableWrapperSize) {
      setWrapperWidth(tableWrapperSize.width);
    }
  }, [tableRef, tableWrapperSize]);

  return (
    <>
      <div ref={tableRef}>
        {colIsInit ? (
          <Table
            rowSelection={{
              type: 'checkbox',
            }}
            columns={tableColumns as ColumnType<any>[]}
            components={{
              header: {
                cell: ResizeableTitle,
              },
            }}
            dataSource={data}
          />
        ) : null}
      </div>
    </>
  );
};

export default AntdTableTest;