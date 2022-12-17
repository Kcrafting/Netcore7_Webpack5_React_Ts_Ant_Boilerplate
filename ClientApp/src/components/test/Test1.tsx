import React, { useMemo, useReducer } from "react";
import { Table, Tag } from "antd";
import useATRH from "@minko-fe/use-antd-resizable-header";
import "@minko-fe/use-antd-resizable-header/dist/style.css";
import "./styles.css";

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];

const Hello: React.FC = () => {
  const [r, forceRender] = useReducer((s) => s + 1, 0);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 300,
      render: (text:any) => <a>{text}</a>
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 200
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 200
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      width: 200,
      render: (tags:any) => (
        <>
          {tags.map((tag:any) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag} onClick={forceRender}>
                {tag.toUpperCase()}
                {r}
              </Tag>
            );
          })}
        </>
      )
    },
    {
      title: "render",
      key: "action",
      render: (text:any, record:any) => <a>Invite {record.name}</a>
    }
  ];

  const { components, resizableColumns, tableWidth } = useATRH({
    columns: useMemo(() => columns, [r]),
    minConstraints: 70
  });

  return (
    <Table
      columns={resizableColumns}
      components={components}
      dataSource={data}
      scroll={{ x: tableWidth }}
      rowKey="key"
    />
  );
};

export default Hello;
