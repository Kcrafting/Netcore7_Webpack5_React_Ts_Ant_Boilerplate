import React, { useEffect ,createContext} from "react";
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
import locale from 'antd/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';
import { Button } from 'antd';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import 'dayjs/locale/zh-cn';
import * as Robam_Import_CPRKD_store from '../../store/redux/store_robam_import/Robam_Import_CPRKD_store';
import { ApplicationState }  from '../../store'
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux'
import {  Steps } from 'antd';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { Select } from 'antd';
import {  Modal} from 'antd';
const { Option } = Select;
import { FormatterProps } from "react-data-grid";
import { ReactNode } from "react";
import { Spin } from 'antd';
import Demo from '../selfcomponents/Grid'
import { HeaderRendererProps } from '../../store/redux/store_robam_import/types'

//import type { SelectProps } from 'antd';
type _CPRKDProp = 
    Robam_Import_CPRKD_store.CPRKDState &
    typeof Robam_Import_CPRKD_store.actionCreators

export interface _Row{
        key:any,
        index:string,
        errrorTime?:string,
        description?:string,
        isError?:boolean,
    }

    
export interface _Column{
        name:string,
        dataIndex:string,
        key:string,
        resizable:boolean,
        type?:string,
        width?:number,
        headerCellClass?:string,
        formatter?:(props: FormatterProps<_Row, unknown>) => ReactNode ,
        headerRenderer?:(props: HeaderRendererProps<_Row, unknown>) => React.ReactNode
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

    const columns:_Column[] = [
        {
            name: '序号',
            dataIndex: 'name',
            key: 'key',
            resizable: true,
            type:'checkbox',
            width:30
        },
        {
            name: '姓名',
            dataIndex: 'name',
            key: 'name',
            resizable: true,
          
        },
        {
            name: '年龄',
            dataIndex: 'age',
            key: 'age',
            resizable: true,
         
        },
        {
            name: '住址',
            dataIndex: 'address',
            key: 'address',
            resizable: true,
         
        },
    ];

    // const dataSource:columnsDataType[] = new Array<columnsDataType>();
    // for(let index_ = 0; index_ < 100000;index_++){
    //     dataSource.push({key:index_,name:'name',age:index_,address:'地址'+ (index_ as unknown as string),checked:false})
    // }
    


const Robam_Import_CPRKD:React.FC<_CPRKDProp> = (props)=>{
    const dispatch = useDispatch();
    const [modal, contextHolder] = Modal.useModal();
    useEffect(()=>{
        //dispatch({type:'ColumnsDataAction_Act',value:dataSource});
        //dispatch({type:'ColumnsAction_Act',value:columns})
        //props._columns(columns);
        //props._columnsData(dataSource);
        //props._billType([{label:'产品入库单',value:'cprkd'},{label:'配件入库单',value:'pjrkd'}]);
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
          title: '选择时间段',
          content: 'Second-content',
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
                //console.log('显示对话框');
                //modal.warning(config);
                props._dialogText('您还没有选择需要同步的单据类型!');
                props._showDialog(true);
            }else{
                props._currentIndex(props.currentindex + 1);
            }
        }else{
            props._currentIndex(props.currentindex + 1);
        }
        //console.log('props.selectBillTypes',props.selectBillTypes);
      };
    
      const prev = () => {
        props._currentIndex(props.currentindex - 1);
      };
    return(
        <div style={{margin:'20px'}}>
            <h1><b>入库单导入</b></h1>
            <Card title={<Steps current={props.currentindex} items={items} style={{width:'70%'}} type="navigation"/>}>
            <Modal 
            title="注意"
            footer={<Button type="primary" onClick={()=>{props._showDialog(false);}}>确定</Button>}
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
                    //console.log(props.selectBillTypes);
                }}
                options={props.billTypes}
                defaultValue={props.selectBillTypes}
                ></Select></>
                
            }
            { props.currentindex === 1 &&
          <><div>
            <a style={{ fontSize: '15px', fontWeight: 'bold', margin: '10px', color: 'red' }}>{'选择导入时间段(禁止超过2天!)'}</a>
            <RangePicker
             style={{ margin: '10px' }}
             locale={locale}
             defaultValue={[
                 dayjs(dayjs(`${new Date()}`).format('YYYY/MM/DD HH:mm:ss'), 'YYYY/MM/DD HH:mm:ss'),
                 dayjs(dayjs(`${new Date()}`).format('YYYY/MM/DD HH:mm:ss'), 'YYYY/MM/DD HH:mm:ss')]}
             format={'YYYY/MM/DD  HH:mm:ss'}
             renderExtraFooter={() => '选择的时间'}
             showTime={true}
             onCalendarChange={(dates, dateStrings)=>{
                 props._startDate(dates?.[0] as dayjs.Dayjs);
                 props._endDate(dates?.[1] as dayjs.Dayjs);
             }}
         />

            <Button style={{ margin: '10px' }} type="primary" onClick={()=>{
                //console.log(' props.startDate,props.endDate ',props.startDate,props.endDate);
                next();
                setTimeout(()=>{
                    // fetch(window.location.origin + "/" + `api/Settings`, { method: 'POST' })
                    // .then(response => response.json() as Promise<Settings[]>)
                    // .then(data => {
                    //     let main: Settings[] = new Array<Settings>();
                    //     data.forEach((val, idx, arr) => {
                    //         if(val.label === "para_timingImport"){
                    //             dispatch({ type: 'EnableAction_Act', value: val.value as unknown as boolean });
                    //         }
                    //         if(val.label === "para_timingDelay"){
                    //             dispatch({ type: 'DelayAction_Act', value: val.value as unknown as Settings });
                    //         }
                    //         if(val.label === "para_timingDelayNumber"){
                    //             dispatch({ type: 'DelayDaysAction_Act', value: val.value as unknown as number });
                    //         }
                    //         if(val.label === "para_timingTime"){
                    //             dispatch({ type: 'ImportTimeAction_Act', value: val.value as unknown as string });
                    //         }
                    //     })
                    //     //dispatch({ type: 'MenuListAction_Act', value: main as Settings[] });
                    // })
                    // .catch(err => {
                    //     //dispatch({ type: 'MenuListAction_Act', value: undefined });
                    // });
                });
                    
                
                
                }}>导入产品入库单</Button>

     </div>
     </>}
     {
        props.currentindex === 2 && 
        <><h3>导入中</h3>
        <Spin tip="Loading" size="large">
        {/* <div className="content" /> */}
        </Spin></> 
     }
     {
        props.currentindex === 3 && 
        // <DataGrid columns={props.columns as _Column[]} rows={props.columnsData as _Row[]}  />
        <DataGrid 
        columns={props.columns as any} 
        rows={props.columnsData as any } 
        style={{height:'calc(100vh - 350px)'}}
        headerRowHeight = {90}
        />
     }
        </div>
            <div className="steps-action">
                {props.currentindex < steps.length - 1 && props.currentindex != 1 && props.currentindex != 2 && (
                <Button type="primary" onClick={() => next()}>
                    下一步
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
                {props.currentindex > 0 && props.currentindex !== steps.length - 1 && props.currentindex != 2 && (
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
    (state: ApplicationState) => state.cprkd,
    Robam_Import_CPRKD_store.actionCreators
)(Robam_Import_CPRKD as any);