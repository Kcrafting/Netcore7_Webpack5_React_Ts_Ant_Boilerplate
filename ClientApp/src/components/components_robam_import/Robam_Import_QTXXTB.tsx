import React, { useEffect ,createContext} from "react";
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
import locale from 'antd/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';
import { Button } from 'antd';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import 'dayjs/locale/zh-cn';
import * as Robam_Import_QTXXTB_store from '../../store/redux/store_robam_import/Robam_Import_QTXXTB_store';
import { ApplicationState }  from '../../store'
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux'
import {  Steps } from 'antd';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { Select } from 'antd';
import {  Modal} from 'antd';
const { Option } = Select;
import {_Row,_Column} from '../../components/components_robam_import/Robam_Import_CPRKD'
import SelfDataGrid from '../selfcomponents/SelfDataGrid'
import {TableProps_} from '../../store/redux/store_robam_import/Robam_Import_CPRKD_store'
import { Spin } from 'antd';

//import type { SelectProps } from 'antd';
type _CPRKDProp = 
    Robam_Import_QTXXTB_store.QTXXTBState &
    typeof Robam_Import_QTXXTB_store.actionCreators

export interface columnsDataType{
        key:any,
        name:string,
        age?:number,
        address?:string,
        checked?:boolean,
    }
export interface columnsType{
        name:string,
        dataIndex:string,
        key:string,
        resizable:boolean,
        type?:string,
        width?:number
        
    }
export interface StepsType{
    title:string,
    content:any,
    icon:any
}
export interface BillType{
    id:number,
    label:string,
    value:string,
    billType:string
}

const Robam_Import_QTXXTB:React.FC<_CPRKDProp> = (props)=>{
    const dispatch = useDispatch();
    const [modal, contextHolder] = Modal.useModal();
    useEffect(()=>{
        props._init();
    },[]);
    //const [current, setCurrent] = React.useState(0);
    const steps = [
        {
          title: '??????????????????',
          content: 'First-content',
          icon:<LoadingOutlined />
        },
        {
          title: '????????????',
          content: 'Last-content',
          icon:<LoadingOutlined />
        },
        {
            title: '??????????????????',
            content: 'dd',
            icon:<LoadingOutlined />
          },
      ];



    const items = steps.map((item) => ({ key: item.title, title: item.title }));
    const next = () => {
        if(props.currentindex === 0){
            if(props.selectBillTypes.length === 0){
       
                props._dialogText('?????????????????????????????????????????????!');
                props._showDialog(true);
            }else{
                props._currentIndex(props.currentindex + 1);
            }
        }else{
            props._currentIndex(props.currentindex + 1);
        }
      };
    
      const prev = () => {
        props._currentIndex(props.currentindex - 1);
      };
    return(
        <div style={{margin:'20px'}}>
            <h1><b>??????????????????</b></h1>
            <Card title={<Steps current={props.currentindex} items={items} style={{width:'70%'}} type="navigation"/>}>
            <Modal 
            title="??????"
            footer={<Button type="primary" onClick={()=>{props._showDialog(false);}}>??????</Button>}
            open={props.showDialog} 
            onOk={()=>{
                props._showDialog(false);
            }} 
            onCancel={()=>{
                props._showDialog(false);
            }}>
                <p>{props.dialogText}</p>
         
            </Modal>

        <div className="steps-content" style={{flex:1,height:'100%'}}>
            {
                props.currentindex === 0 && 
                <><span>????????????????????????<br/></span>
                <Select 
                mode="multiple" 
                style={{width:'180px',margin:'20px'}} 
                onChange={(value: string[])=>{
                    props._selectBillType(value);
                 
                }}
                options={props.billTypes}
                defaultValue={props.selectBillTypes}
                ></Select></>
                
            }
     {
        props.currentindex === 1 && 
        <><h3>?????????</h3>
        <Spin tip="Loading" size="large">
        {/* <div className="content" /> */}
        </Spin></> 
     }
     {
        props.currentindex === 2 && 
        <SelfDataGrid 
        columns={props.columns as any} 
        rows={props.columnsData as any}  
        style={{height:'calc(100vh - 320px)'}}
        isErrorFilter = {props.isErrorFilter}
        descriptionFilter = {props.descriptionFilter}
        timeFilter = {props.timeFilter}
        setIsErrorFilter = {props._isErrorFilter}
        setDescrptionFilter = {props._descriptionFilter}
        setTimeFilter = {props._timeFilter}
        />
     }
        </div>
            <div className="steps-action">
                {props.currentindex < steps.length - 1 && props.currentindex != 1 && props.currentindex != 2 && (
                <Button type="primary" onClick={() => {
                    next();
                    if(props.currentindex === 0 && props?.selectBillTypes?.length > 0){
                            fetch(window.location.origin + "/" + `api/syncqtxxtb`, 
                            { 
                                method: 'POST',
                                headers: new Headers({
                                    'Content-Type': 'application/json'
                                }),
                                body:JSON.stringify({FBillTypes:props.selectBillTypes,FStartDate:props.startDate,FEndDate:props.endDate})
                            })
                            .then(response => response.json() as Promise<TableProps_>)
                            .then(data => {
                                console.log('????????????',data);
                                dispatch({ type: 'ColumnsAction_Act', value: data.columnType });
                                dispatch({ type: 'ColumnsDataAction_Act', value: data.rowData });
                                props._currentIndex(2);
                                //dispatch({ type: 'MenuListAction_Act', value: main as Settings[] });
                            })
                            .catch(err => {
                                //dispatch({ type: 'MenuListAction_Act', value: undefined });
                            });
                    }
                    }}>
                    {props.currentindex === 0?'????????????':'?????????'}
                </Button>
                )}
                {/* {props.currentindex === steps.length - 1 && (
                <Button style={{ margin: '8px' }} type="primary" onClick={() => {}}>
                    ??????
                </Button>
                )} */}
                 {props.currentindex === steps.length - 1 && (
                <Button style={{ margin: '8px' }} type="primary" onClick={() => {props._currentIndex(0);}}>
                    ????????????
                </Button>
                )}
                {props.currentindex > 0 && props.currentindex !== steps.length - 1 && props.currentindex != 1 && (
                <Button style={{ margin: '8px' }} onClick={() => prev()}>
                    ?????????
                </Button>
                )}
            </div>
        </Card>
        </div>
        )
}


export default connect(
    (state: ApplicationState) => state.qtxxtb,
    Robam_Import_QTXXTB_store.actionCreators
)(Robam_Import_QTXXTB as any);