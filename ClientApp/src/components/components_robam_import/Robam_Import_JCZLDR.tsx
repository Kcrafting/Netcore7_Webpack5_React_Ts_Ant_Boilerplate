import React, { useEffect ,createContext} from "react";
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
import locale from 'antd/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';
import { Button } from 'antd';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import 'dayjs/locale/zh-cn';
import * as Robam_Import_JCZLDR_store from '../../store/redux/store_robam_import/Robam_Import_JCZLDR_store';
import { ApplicationState }  from '../../store'
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux'
import {  Steps } from 'antd';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { Select } from 'antd';
import {  Modal} from 'antd';
const { Option } = Select;
import SelfDataGrid from '../selfcomponents/SelfDataGrid'
import { Spin } from 'antd';

//import type { SelectProps } from 'antd';
type _CPRKDProp = 
    Robam_Import_JCZLDR_store.JCZLDRState &
    typeof Robam_Import_JCZLDR_store.actionCreators

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
        
    }
export interface StepsType{
    title:string,
    content:any,
    icon:any
}
export interface BillType{
    label:string,
    value:string
}


const Robam_Import_CPRKD:React.FC<_CPRKDProp> = (props)=>{
    const dispatch = useDispatch();
    const [modal, contextHolder] = Modal.useModal();
    useEffect(()=>{
        props._init();
    },[]);
    //const [current, setCurrent] = React.useState(0);
    const steps = [
        {
          title: '选择导入类型',
          content: 'First-content',
          icon:<LoadingOutlined />
        },
        {
          title: '进行导入',
          content: 'Last-content',
          icon:<LoadingOutlined />
        },
        {
            title: '查看导入结果',
            content: 'dd',
            icon:<LoadingOutlined />
          },
      ];



    const items = steps.map((item) => ({ key: item.title, title: item.title }));
    const next = () => {
        if(props.currentindex === 0){
            if(props.selectBillTypes.length === 0){
                console.log('显示对话框');
                //modal.warning(config);
                props._dialogText('您还没有选择需要同步的单据类型!');
                props._showDialog(true);
            }else{
                props._currentIndex(props.currentindex + 1);
            }
        }else{
            props._currentIndex(props.currentindex + 1);
        }
        console.log('props.selectBillTypes',props.selectBillTypes);
      };
    
      const prev = () => {
        props._currentIndex(props.currentindex - 1);
      };
    return(
        <div style={{margin:'20px'}}>
            <h1><b>基础资料导入</b></h1>
            <Card title={<Steps current={props.currentindex} items={items} style={{width:'70%'}} type="navigation"/>}>
            <Modal 
            title="注意" 
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
                <><span>选择导入单据类型<br/></span>
                <Select 
                mode="multiple" 
                style={{width:'180px',margin:'20px'}} 
                onChange={(value: string[])=>{
                    props._selectBillType(value);
                    console.log(props.selectBillTypes);
                }}
                options={props.billTypes}
                defaultValue={props.selectBillTypes}
                ></Select></>
                
            }
     {
        props.currentindex === 1 && 
        <><h3>导入中</h3>
        <Spin tip="Loading" size="large">
        {/* <div className="content" /> */}
        </Spin></> 
     }
     {
        props.currentindex === 2 && 
        <SelfDataGrid columns={props.columns as any} rows={props.columnsData as any}  />
     }
        </div>
            <div className="steps-action">
                {props.currentindex < steps.length - 1 && props.currentindex != 1 && props.currentindex != 2 && (
                <Button type="primary" onClick={() => {
                    next();
                    if(props.currentindex === 0){
                        fetch(window.location.origin + "/" + `api/synczczldr`, 
                            { 
                                method: 'POST',
                                headers: new Headers({
                                    'Content-Type': 'application/json'
                                }),
                                body:JSON.stringify({FBillTypes:props.selectBillTypes,FStartDate:props.startDate,FEndDate:props.endDate})
                            })
                            .then(response => response.json() as Promise<TableProps_>)
                            .then(data => {
                                console.log('导入完毕',data);
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
                    {props.currentindex === 0 ?'开始导入': '下一步'}
                </Button>
                )}
                {props.currentindex === steps.length - 1 && (
                <Button style={{ margin: '8px' }} type="primary" onClick={() => {}}>
                    完成
                </Button>
                )}
                 {props.currentindex === steps.length - 1 && (
                <Button style={{ margin: '8px' }} type="primary" onClick={() => {props._currentIndex(0);}}>
                    重新导入
                </Button>
                )}
                {props.currentindex > 0 && props.currentindex !== steps.length - 1 && props.currentindex != 1 && (
                <Button style={{ margin: '8px' }} onClick={() => prev()}>
                    上一步
                </Button>
                )}
            </div>
        </Card>
        </div>
        )
}


export default connect(
    (state: ApplicationState) => state.jczldr,
    Robam_Import_JCZLDR_store.actionCreators
)(Robam_Import_CPRKD as any);