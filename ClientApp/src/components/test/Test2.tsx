import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import { VariableSizeGrid as Grid } from 'react-window';
import { Resizable } from "react-resizable";
import "../../../node_modules/react-resizable/css/styles.css";

const ResizableTitle = (props:any) => {
  const { onResize, width, ...restProps } = props;
  if (width === undefined) {
    return <th {...restProps}></th>;
  }
  return (
    // 外包一层Resizable组件
    // 其中onResize属性调用col.onResize方法
    <Resizable width={width} height={0} onResize={onResize} >
      <th style={{backgroundColor:'red'}} {...restProps}></th>
    </Resizable>
  );
};

const VirtualTable = <RecordType extends object>(props: TableProps<RecordType>) => {
  const { columns, scroll } = props;
  const [tableWidth, setTableWidth] = useState(0);

  const widthColumnCount = columns!.filter(({ width }) => !width).length;
  const mergedColumns = columns!.map((column) => {
    if (typeof(column.width) != undefined) {
      return column;
    }

    return {
      ...column,
      width: Math.floor(tableWidth / widthColumnCount),
    };
  });

  const gridRef = useRef<any>();
  const [connectObject] = useState<any>(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => {
        if (gridRef.current) {
          return gridRef.current?.state?.scrollLeft;
        }
        return null;
      },
      set: (scrollLeft: number) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft });
        }
      },
    });

    return obj;
  });

  const resetVirtualGrid = () => {
    gridRef.current?.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true,
    });
  };

  useEffect(() => resetVirtualGrid, [tableWidth]);

  const renderVirtualList = (rawData: object[], { scrollbarSize, ref, onScroll }: any) => {
    ref.current = connectObject;
    const totalHeight = rawData.length * 54;

    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={(index: number) => {
          const { width } = mergedColumns[index];
          return totalHeight > scroll!.y! && index === mergedColumns.length - 1
            ? (width as number) - scrollbarSize - 1
            : (width as number);
        }}
        height={scroll!.y as number}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={tableWidth}
        onScroll={({ scrollLeft }: { scrollLeft: number }) => {
          onScroll({ scrollLeft });
        }}
      >
        {({
          columnIndex,
          rowIndex,
          style,
        }: {
          columnIndex: number;
          rowIndex: number;
          style: React.CSSProperties;
        }) => (
          <div
            className={classNames('virtual-table-cell', {
              'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
            })}
            style={style}
          >
            {(rawData[rowIndex] as any)[(mergedColumns as any)[columnIndex].dataIndex]}
          </div>
        )}
      </Grid>
    );
  };

  return (
    <ResizeObserver
      onResize={({ width }) => {
        setTableWidth(width);
      }}
    >
      <Table
        {...props}
        className="virtual-table"
        columns={mergedColumns}
        pagination={false}
        components={{
          header:{
            cell:ResizableTitle
          },
          body: renderVirtualList as any,
        }}
      />
    </ResizeObserver>
  );
};


// Usage
const columns = [
  { title: 'A', dataIndex: 'key', width: 80  , onHeaderCell:()=>({width:80,onResize:{}}) },
  { title: 'B', dataIndex: 'key', width: 120 , onHeaderCell:()=>({width:120,onResize:{}}) },
  { title: 'C', dataIndex: 'key', width: 120 , onHeaderCell:()=>({width:120,onResize:{}}) },
];
interface _TableProps{
  columns:any,
  data:any
}

const data = Array.from({ length: 100000 }, (_, key) => ({ key }));

const App: React.FC = () => {
  //const {columns,data} =  props;
  columns.map((col)=>{
    col.onHeaderCell = () => ({
      width: col.width,
      onResize: handleResize(col)
    });
    return col;
  })
  const [_columns,set_Columns] = React.useState<Array<any>>(columns); 
  const [_data,set_Data] = React.useState(data); 
  const handleResize = (column:any) => (e:any,  size:any ) => {
    console.log('触发');
    columns.forEach((item:any) => {
      console.log('触发22222',item,column);
      if (item === column) {
        console.log('赋值',item,column);
        item.width = size.width;
      }
    });
    set_Columns({...columns});
  };

  return (
  <VirtualTable columns={_columns} dataSource={_data} scroll={{ y: 300, x: '100vw' }} />
)
};





export default App;