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
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('Option 3', '3', <ContainerOutlined />),

  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
  ]),

  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),

    getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
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
      <div style={{width: menuWidth,height:'100vh'}}>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
      </div>
      {/* <TweenOne 
      animation={{right:'70%',duration:2000}} 
      reverse={false} 
      paused ={paused}  
      style={{backgroundColor:'orange',height:'50px',width:'50px'}}> */}
        <div style={{backgroundColor:'orange',flex:1,transitionProperty: 'width',transitionDuration:'5s'}}>
          {children}
        </div>
      {/* </TweenOne> */}
     
    </div>
  );
};

export default App;