import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import { VariableSizeGrid as Grid } from 'react-window';
import { ContactsOutlined } from '@ant-design/icons';

const VirtualTable = <RecordType extends object>(props: TableProps<RecordType>) => {
  const { columns, scroll } = props;
  const [tableWidth, setTableWidth] = useState(0);

  const widthColumnCount = columns!.filter(({ width }) => !width).length;

  const mergedColumns = columns!.map((column) => {
    console.log('column.width',column.width);
    if (typeof(column.width)!=undefined) {
      return column;
    }
    console.log('!!!!!!column.width',column.width);
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
    console.log('mergedColumns',mergedColumns);
    
    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={(index: number) => {
          const { width } = mergedColumns[index];
          console.log('columnWidth',totalHeight > scroll!.y! && index === mergedColumns.length - 1
          ? (width as number) - scrollbarSize - 1
          : (width as number));
          return totalHeight > scroll!.y! && index === mergedColumns.length - 1
            ? (width as number) - scrollbarSize - 1
            : (width as number);
        }}
        style={{paddingLeft:'0px',paddingRight:'0px',backgroundColor:'#001529'}}
        height={scroll!.y as number}
        rowCount={rawData.length}
        rowHeight={() => 54}

        width={(tableWidth)}
        onScroll={({ scrollLeft }: { scrollLeft: number }) => {
          onScroll({ scrollLeft });
        }}
      >
        {
          ({
            columnIndex,
            rowIndex,
            style,
          }) => {
            console.log('(style as React.CSSProperties).width as string',(style as React.CSSProperties).width as string);
            return (
            <div
              className={classNames('virtual-table-cell', {
                'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
              })}
              style={{...style as React.CSSProperties,width:'calc(' + (style as React.CSSProperties).width as string + 'px + 15px)',left:'calc(' + (style as React.CSSProperties).left as string + 'px + 15px)',padding:'0px'}}
            >
              { '['+(rawData[rowIndex] as any)[(mergedColumns as any)[columnIndex].dataIndex] +']' }
            </div>
          )}
        }
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
          body: renderVirtualList as any,
        }}
      />
    </ResizeObserver>
  );
};



// Usage
const columns = [
  { title: 'A', dataIndex: 'key', width: 110 },
  { title: 'B', dataIndex: 'key', width: 170 },
  { title: 'C', dataIndex: 'key', width: 0 },
  // { title: 'D', dataIndex: 'key', width: 30 },
  // { title: 'E', dataIndex: 'key', width: 50 },
  // { title: 'F', dataIndex: 'key', width: 50 },
  // { title: 'G', dataIndex: 'key', width: 30 },
  // { title: 'H', dataIndex: 'key', width: 50 },
  // { title: 'I', dataIndex: 'key', width: 50 },
  // { title: 'J', dataIndex: 'key', width: 40 },
  // { title: 'K', dataIndex: 'key', width: 50 },
  // { title: 'L', dataIndex: 'key', width: 50 },
];

const data = Array.from({ length: 100000 }, (_, key) => ({ key }));
interface AppProps {
  style: React.CSSProperties
}
const App: React.FC<AppProps> = ({ children, style }) => {
  const [tableHeight, setTableHeight] = React.useState(600);
  useEffect(() => {

  });
  window.onresize = () => {
    setTableHeight(window.innerHeight - 160);
  };
  return (
    <VirtualTable style={style} columns={columns} dataSource={data} scroll={{ y: tableHeight, x: '400px' }} />
  )
};

export default App;