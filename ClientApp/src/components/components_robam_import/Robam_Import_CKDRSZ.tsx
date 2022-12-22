import React, { useEffect } from "react";
import { Card,Button } from 'antd';
import { Switch } from 'antd';
import { Col, Row } from 'antd';
import { Select } from 'antd';
import { Input, Tooltip } from 'antd';
import { TimePicker } from 'antd';

import * as Robam_Import_RKDRSZ_store from '../../store/redux/store_robam_import/Robam_Import_RKDRSZ_store';
import { ApplicationState }  from '../../store';
import { connect } from 'react-redux';
import dayjs from "dayjs";

type _CPRKDProp = 
    Robam_Import_RKDRSZ_store.RKDRSZState &
    typeof Robam_Import_RKDRSZ_store.actionCreators

const Robam_Import_RKDRSZ:React.FC<_CPRKDProp>=(props)=>{
    React.useEffect(()=>{
        props._init();
    },[])
    return(< div style={{margin:'20px'}}>
    <h1>出库导入设置</h1>
    <Card >
        <Row gutter={24}  style={{height:'50px'}}>
            <Col span={4} >
            <a >开启自动导入</a>
            </Col>
            <Col span={8}><Switch checked={props.enable} onChange={()=>{
                props._enable(!props.enable);
            }}></Switch></Col>
            
        </Row>
        <Row gutter={24} style={{height:'50px'}}>
        <Col span={4}>
            <a >导入间隔</a>
            </Col>
            <Col span={8}>
                <Select 
                disabled={!props.enable} 
                style={{width:'120px'}} 
                onChange={(value:Robam_Import_RKDRSZ_store.Settings)=>{
                    props._delay(value);
                }}
                options={[{value:'everyday',label:'每天',key:1},{value:'everyweek',label:'每周',key:2},{value:'eachday',label:'每隔几天',key:3}]}
                value={props.delay}
                /></Col>
        </Row>
        {/* <Row gutter={24} style={{height:'50px'}}>
        <Col span={4}>
            <a >导入间隔天数</a>
            </Col>
            <Col span={8}><Select disabled={!props.enable} style={{width:'120px'}} options={[{value:'每天',label:'每天'},{value:'每周',label:'每周'},{value:'每隔几天',label:'每隔几天'}]}/></Col>
        </Row> */}
        <Row gutter={24} style={{height:'50px'}}>
        <Col span={4}>
            <a >导入间隔天数</a>
            </Col>
            <Col span={8}><Input disabled={!props.enable} style={{width:'120px'}} value={props.delaydays} /></Col>
        </Row>
        <Row gutter={24} style={{height:'50px'}}>
        <Col span={4}>
            <a >导入时间点</a>
            </Col>
            <Col span={8}>
                <TimePicker 
                disabled={!props.enable} 
                style={{width:'120px'}} 
                placeholder={''} 
                defaultValue={dayjs(props.importTime, "HH:mm:ss")}
                onChange={(val,date)=>{
                    props._importtime(date);
                }}
                /></Col>
        </Row>
        <Button onClick={()=>{
        
    }}>保存设置</Button>
    </Card>
   
    </div>)
}


export default connect(
    (state: ApplicationState) => state.rkdsz,
    Robam_Import_RKDRSZ_store.actionCreators
)(Robam_Import_RKDRSZ as any);