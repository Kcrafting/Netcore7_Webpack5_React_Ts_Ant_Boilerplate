import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { MenuProps, Row } from 'antd';
import { Button, Menu } from 'antd';
import TweenOne from 'rc-tween-one';
import PropTypes from 'prop-types';


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  // getItem('Option 1', '1', <PieChartOutlined />),
  // getItem('Option 2', '2', <DesktopOutlined />),
  // getItem('Option 3', '3', <ContainerOutlined />),

  getItem('入库', 'sub1', <MailOutlined />, [
    getItem('产品入库导入', '5'),
    getItem('配件入库导入', '6'),
    getItem('其他', 'sub3', null, [getItem('入库导入设置', '7')]),
  ]),

  getItem('出库', 'sub2', <AppstoreOutlined />, [
    getItem('产品出库导入', '9'),
    getItem('配件出库导入', '10'),

    getItem('其他', 'sub4', null, [getItem('出库导入设置', '11')]),
  ]),
  getItem('基础资料', 'sub5', <MailOutlined />, [
    getItem('基础资料导入', '20'),
    getItem('其他信息同步', '21'),
  ]),
];
const App: React.FC = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [paused,setPaused] = useState(true);
  const [menuWidth,setMenuWidth] = useState(240);
  const toggleCollapsed = () => {
    let width = 80;
    if(menuWidth == 80){
      width = 240;
    }
    setMenuWidth(width);
    setCollapsed(!collapsed);
    
  };

  return (
    <div style={{width: '100vw',height:'100vh',display:'flex',flexDirection:'row'}}>
      <div style={{width: menuWidth,height:'100vh',backgroundColor:'rgb(0, 21, 41)'}}>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['5']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        onClick={({ item, key, keyPath, domEvent })=>{

        }}
        inlineCollapsed={collapsed}
        items={items}
      />
      </div>

        <div style={{flex:1,transitionProperty: 'width',transitionDuration:'5s',backgroundColor:'white',maxHeight:'100vh',overflow:'scroll'}}>
          {children}
        </div>
     
    </div>
  );
};

export default App;