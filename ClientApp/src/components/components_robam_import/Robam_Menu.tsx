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
import * as Robam_Menu_store from '../../store/redux/store_robam_import/Robam_Menu_store';
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

type _MenuProps =
    Robam_Menu_store.MenuState &
    typeof Robam_Menu_store.actionCreators;

const Robam_Menu: React.FC<_MenuProps> = (props) => {
    //const [defaultSelectKey,setDefaultSelectKey] = React.useState<string[]>([]);
    const { children } = props;
    //console.log('children - ', children);
    const dispatch = useDispatch();
    useEffect(() => {
        //console.log('完成刷新', props._menuList);
        props._menuList();
        //console.log('props.menuList',props.menuList);
    }, []);
    const toggleCollapsed = () => {
        let width = 80;
        if (props.menuWidth == 80) {
            width = 240;
        }
        dispatch({ type: 'CollapsedAction_Act', value: !props.collapsed })
        dispatch({ type: 'MenuWidthAction_Act', value: width })
    };
    //console.log('props.menuList', props.menuList)
    //console.log('window.location.href',[window.location.href.replace(window.location.origin + '/',"")]);
    //setDefaultSelectKey([window.location.href.replace(window.location.origin + '/',"")])
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
                            defaultSelectedKeys={[window.location.href.replace(window.location.origin + '/',"")]}
                            defaultOpenKeys={['sub1','sub2','sub3','sub4','sub5']}
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
    (state: ApplicationState) => state.menu,
    Robam_Menu_store.actionCreators
)(Robam_Menu as any);