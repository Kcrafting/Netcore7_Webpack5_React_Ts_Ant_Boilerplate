import React, { useEffect } from "react";
import { Card,Button } from 'antd';
import { Switch } from 'antd';
import { Col, Row } from 'antd';
import { Select } from 'antd';
import { Input, Tooltip } from 'antd';
import { TimePicker } from 'antd';

import * as Robam_Import_CKDRSZ_store from '../../store/redux/store_robam_import/Robam_Import_CKDRSZ_store';
import { ApplicationState }  from '../../store';
import { connect } from 'react-redux';
import dayjs from "dayjs";
import {  Modal } from 'antd';
import SelfDataGrid from "../selfcomponents/SelfDataGrid";

type _CPRKDProp = 
    Robam_Import_CKDRSZ_store.CKDRSZState &
    typeof Robam_Import_CKDRSZ_store.actionCreators

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
                onChange={(value:Robam_Import_CKDRSZ_store.Settings_out)=>{
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
            <Col span={8}><Input 
            disabled={!props.enable} 
            style={{width:'120px'}} 
            value={props.delaydays} 
            onChange={(txt)=>{
                props._delayday(txt.currentTarget.value as unknown as number);
            }}
            /></Col>
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

        <Row gutter={24} style={{height:'50px'}}>
        <Col span={4}>
            <a>选择导入单据类型</a>
            </Col>
            <Col span={8}>
            <Select 
                mode="multiple" 
                style={{width:'120px'}} 
                onChange={(value: string[])=>{
                    console.log('_selectBillTypes',value);
                    props._selectBillTypes(value);
                
                }}
                options={props.billTypes}
                value={props.selectBillTypes}
                defaultValue={props.selectBillTypes}
                ></Select></Col>
        </Row>

        <Button type="primary" 
                style={{marginTop:'30px'}}
                onClick={()=>{

              console.log('提交参数',JSON.stringify([
                {label:"para_out_timingImport",value:props.enable.toString()},
                {label:"para_out_timingDelay",value:props.delay},
                {label:"para_out_timingDelayNumber",value:props.delaydays},
                {label:"para_out_timingTime",value:props.importTime},
                {label:"para_out_billTypes",value:props.selectBillTypes.toString()}
            ]));
            if(window.confirm('是否保存数据?')){
                fetch(window.location.origin + "/" + `api/saveSettings`, { 
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body:JSON.stringify([
                        {label:"para_out_timingImport",value:props.enable.toString()},
                        {label:"para_out_timingDelay",value:props.delay},
                        {label:"para_out_timingDelayNumber",value:props.delaydays},
                        {label:"para_out_timingTime",value:props.importTime},
                        {label:"para_out_billTypes",value:props.selectBillTypes.toString()}
                    ]),})
                 .then(response => response.json() as Promise<Robam_Import_CKDRSZ_store.Settings_out[]>)
                 .then(data => {
                     //let main: Robam_Import_CKDRSZ_store.Settings_out[] = new Array<Robam_Import_CKDRSZ_store.Settings_out>();
                     data.forEach((val, idx, arr) => {
                         //main.push(RecursionMenu(val));
                     })
                     window.alert('保存成功');
                     //dispatch({ type: 'MenuListAction_Act', value: main as Robam_Import_RKDRSZ_store.Settings[] });
                 })
                 .catch(err => {
                     //dispatch({ type: 'MenuListAction_Act', value: undefined });
                 });
            }
                 
    }}>保存设置</Button>
        <Modal open={props.showgrid} 
    width={1000}
    closable = {false}
        footer={<Button type="primary" onClick={()=>{
            //props._showDialog(false);
            props._showgrid(false);
        }}>确定</Button>}
    >
        <SelfDataGrid 
        rows={props.rows as any} 
        columns = {props.columns as any}
        isErrorFilter = {props.isErrorFilter}
        descriptionFilter = {props.descriptionFilter}
        timeFilter = {props.timeFilter}
        setIsErrorFilter = {props._isErrorFilter}
        setDescrptionFilter = {props._descriptionFilter}
        setTimeFilter = {props._timeFilter}
        >
        </SelfDataGrid>
    </Modal>
     <Button type="primary"  style={{marginLeft:'30px'}} onClick={()=>{
        props._showgrid(true);
     }}>查看导入日志</Button>
    </Card>
   
    </div>)
}


export default connect(
    (state: ApplicationState) => state.ckdsz,
    Robam_Import_CKDRSZ_store.actionCreators
)(Robam_Import_RKDRSZ as any);