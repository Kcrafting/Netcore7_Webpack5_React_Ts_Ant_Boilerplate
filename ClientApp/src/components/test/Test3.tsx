import { Table } from "antd";
import React from "react";
import { Resizable } from "react-resizable";
import "../../../node_modules/react-resizable/css/styles.css";  // 引入react-resizable样式，否则无法显示Resize样式

const dataSource = [
  {
    key: "1",
    name: "张三",
    age: 32,
    address: "西湖区湖底公园1号"
  },
  {
    key: "2",
    name: "李四",
    age: 42,
    address: "西湖区湖底公园1号"
  }
];

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    width: 110
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
    width: 90
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
    width: 220
  },
  {}
];

// 重写Table组件header单元格渲染方式
const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;
  if (width === undefined) {
    return <th {...restProps}></th>;
  }
  return (
    // 外包一层Resizable组件
    // 其中onResize属性调用col.onResize方法
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps}></th>
    </Resizable>
  );
};

export default class MyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource,
      columns: columns.map((col) => {
        // 注意：给每一列的onHeaderCell属性增加onResize方法，用于传递onResize事件
        col.onHeaderCell = () => ({
          width: col.width,
          onResize: this.handleResize(col)
        });
        return col;
      })
    };
  }

  // Table 组件 components 
  components = {
    header: {
      cell: ResizableTitle
    }
  };

  // 动态修改col.width属性
  handleResize = (column) => (e, { size }) => {
    
    this.setState(({ columns }) => {
      columns.forEach((item) => {
        if (item === column) {
          item.width = size.width;
        }
      });

      return { columns };
    });
  };

  render() {
    return (
      <div>
        <Table
          bordered
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          components={this.components}
        />
      </div>
    );
  }
}