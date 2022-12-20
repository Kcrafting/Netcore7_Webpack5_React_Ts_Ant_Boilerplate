import React, { useEffect, useState } from 'react';
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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as WeatherForecastsStore from '../../store/redux/store_robam_import/mainpage_menu_r';
import { stat } from 'fs';
import { useDispatch } from 'react-redux'
import { history } from '../../index'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';


type MenuItem = Required<MenuProps>['items'][number];

interface type_MenuItem {
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
}

interface func {
    (txt: string): MenuItem
}
// const AnalysisJsonToMenu:func = (json) =>  {
//   const obj = JSON.parse(json);
//   //let result:MenuItem = getItem('配件入库导入', '6');
//   if(typeof obj != undefined){

//   }
//   return result;
// }



// const items: MenuItem[] = [
//   // getItem('Option 1', '1', <PieChartOutlined />),
//   // getItem('Option 2', '2', <DesktopOutlined />),
//   // getItem('Option 3', '3', <ContainerOutlined />),

//   getItem('入库', 'sub1', <MailOutlined />, [
//     getItem('产品入库导入', '5'),
//     getItem('配件入库导入', '6'),
//     getItem('其他', 'sub3', null, [getItem('入库导入设置', '7')]),
//   ]),
//   getItem('出库', 'sub2', <AppstoreOutlined />, [
//     getItem('产品出库导入', '9'),
//     getItem('配件出库导入', '10'),
//     getItem('其他', 'sub4', null, [getItem('出库导入设置', '11')]),
//   ]),
//   getItem('基础资料', 'sub5', <MailOutlined />, [
//     getItem('基础资料导入', '20'),
//     getItem('其他信息同步', '21'),
//   ]),
// ];
type CounterProps =
    WeatherForecastsStore.mainpageMenuState &
    typeof WeatherForecastsStore.actionCreators;
const MainPage: React.FC<CounterProps> = (props) => {
    // const [collapsed, setCollapsed] = useState(false);
    // const [paused,setPaused] = useState(true);
    // const [menuWidth,setMenuWidth] = useState(240);
    const { children } = props;
    console.log('children - ', children);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('完成刷新', props._menuList);
        props._menuList();
    }, []);
    const toggleCollapsed = () => {
        let width = 80;
        if (props.menuWidth == 80) {
            width = 240;
        }
        dispatch({ type: 'CollapsedAction_Act', value: !props.collapsed })
        dispatch({ type: 'MenuWidthAction_Act', value: width })
    };
    console.log('props.menuList', props.menuList)
    return (
       
        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: props.menuWidth, height: '100vh', backgroundColor: 'rgb(0, 21, 41)' }}>
            {
                typeof props.menuList != undefined ?
                    <>
                        <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
                            {props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        </Button>
                        <Menu
                            defaultSelectedKeys={['5']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            theme="dark"
                            onClick={({ item, key, keyPath, domEvent }) => {
                                console.log('item', item, keyPath, key, domEvent)
                                history.push(window.location.origin + "/" + key);
                            }}
                            inlineCollapsed={props.collapsed}
                            items={props.menuList}
                        />
                    </>
                    :
                    <a style={{color:'white',width:props.menuWidth,backgroundColor:'orange'}}><b>载入中...<LoadingOutlined/></b></a>
            }

        </div>

        <div style={{ flex: 1, transitionProperty: 'width', transitionDuration: '5s', backgroundColor: 'white', maxHeight: '100vh', overflow: 'scroll' }}>
            {children}
        </div>

    </div>
    );
};

export default connect(
    (state: ApplicationState) => state.main,
    WeatherForecastsStore.actionCreators
)(MainPage as any);