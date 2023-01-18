import React, { useEffect ,createContext,useMemo} from "react";
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
import { HeaderRendererProps } from '../../store/redux/store_robam_import/types'
import { Checkbox } from 'antd';
import SelfDataGrid from '../selfcomponents/SelfDataGrid'
import {TableProps_} from '../../store/redux/store_robam_import/Robam_Import_CPRKD_store'

// import {
//     JsonHubProtocol,
//     HubConnectionState,
//     HubConnectionBuilder,
//     LogLevel
//   } from '@microsoft/signalr';
import * as signalR from "@microsoft/signalr";

//import type { SelectProps } from 'antd';
type _CPRKDProp = 
    Robam_Import_CPRKD_store.CPRKDState &
    typeof Robam_Import_CPRKD_store.actionCreators

export interface _Row{
        key:any,
        index:any,
        errorTime?:string,
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

export interface _SyncMessage{
        isDone:boolean,
        tips:string,
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


const Robam_Import_CPRKD:React.FC<_CPRKDProp> = (props)=>{
    const dispatch = useDispatch();
    const [modal, contextHolder] = Modal.useModal();
    const [func,set_Func] = React.useState<(arg:string)=>void>((arg:string)=>{});
    // const setupSignalRConnection = (connectionHub:any, getAccessToken:any) => {
    //     const options = {
    //         //logMessageContent: isDev,
    //         //logger: isDev ? LogLevel.Warning : LogLevel.Error,
    //         accessTokenFactory: () => getAccessToken
    //     };
    //     // create the connection instance
    //     // withAutomaticReconnect will automatically try to reconnect
    //     // and generate a new socket connection if needed
    //     const connection = new HubConnectionBuilder()
    //         .withUrl(connectionHub, options)
    //         .withAutomaticReconnect()
    //         .withHubProtocol(new JsonHubProtocol())
    //         .configureLogging(LogLevel.Information)
    //         .build();
     
    //     // Note: to keep the connection open the serverTimeout should be
    //     // larger than the KeepAlive value that is set on the server
    //     // keepAliveIntervalInMilliseconds default is 15000 and we are using default
    //     // serverTimeoutInMilliseconds default is 30000 and we are using 60000 set below
    //     connection.serverTimeoutInMilliseconds = 60000;
     
    //     // re-establish the connection if connection dropped
    //     connection.onclose(error => {
    //         console.assert(connection.state === HubConnectionState.Disconnected);
    //         console.log('Connection closed due to error. Try refreshing this page to restart the connection', error);
    //     });
     
    //     connection.onreconnecting(error => {
    //         console.assert(connection.state === HubConnectionState.Reconnecting);
    //         console.log('Connection lost due to error. Reconnecting.', error);
    //     });
     
    //     connection.onreconnected(connectionId => {
    //         console.assert(connection.state === HubConnectionState.Connected);
    //         console.log('Connection reestablished. Connected with connectionId', connectionId);
    //     });
     
    //     startSignalRConnection(connection);
     
    //     connection.on('hotdata', res => {
    //         console.log("SignalR get hot res:", JSON.parse(res))
    //         let resdata = JSON.parse(res)
             
             
    //     });
     
    //     return connection;
    // };
    // const startSignalRConnection = async (connection:any) => {
    //     try {
    //         await connection.start();
    //         console.assert(connection.state === HubConnectionState.Connected);
    //         console.log('SignalR connection established');
    //     } catch (err) {
    //         console.assert(connection.state === HubConnectionState.Disconnected);
    //         console.error('SignalR Connection Error: ', err);
    //         setTimeout(() => startSignalRConnection(connection), 5000);
    //     }
    // };
    // const FnsignalR = async () =>{
     
    //     let token = "你的token"
    //     // console.log(token,"----token signalr---")<br>　　　　　　　　　　//调用热数据传入api token
    //     setupSignalRConnection("/api/hotdatahub",token)
    // }
    var cancelFunc:any;
    let connection:signalR.HubConnection;
    useEffect(()=>{
        props._init();
    },[]);
    useEffect(()=>{
       
        console.log('初始化SignlR');
        connection = new signalR.HubConnectionBuilder()
            .withUrl("api/hub",{withCredentials:true,skipNegotiation: true,transport: signalR.HttpTransportType.WebSockets})
            .build();
        const act = ()=> connection.send("newMessage", {
            Token:'',
            BillType:'INSTOCK'
        });


        // connection.on("starting",()=>{
        //     console.log('SignlR状态,starting');
        // });
        // connection.on("received",()=>{
        //     console.log('SignlR状态,received');
        // });
        // connection.on("connectionSlow ",()=>{
        //     console.log('SignlR状态,connectionSlow ');
        // });
        // connection.on("reconnecting",()=>{
        //     console.log('SignlR状态,reconnecting');
        // });
        //  connection.on("reconnected",()=>{
        //     console.log('SignlR状态,reconnected');
        // });
        //  connection.on("stateChanged",()=>{
        //     console.log('SignlR状态,stateChanged');
        // });


        connection.onclose(()=>{
            console.log('SignlR状态,CallBack onclose');
            dispatch({ type: 'ShowPrograssAction_Act', value: false });
            dispatch({ type: 'ShowProgressTipsAction_Act', value: '到服务器的网络连接断开!' });
            let temp =  props.columnsData?.concat([{key:null,index:999999,description:'到服务器的网络连接断开',isError:true,errorTime:'刚刚'}]);
            console.log('temp__',temp)
            dispatch({ type: 'ColumnsDataAction_Act', value: temp });
            
        })
        connection.onreconnected(()=>{
            console.log('SignlR状态,CallBack onreconnected');
        })
        connection.onreconnecting(()=>{
            console.log('SignlR状态,CallBack onreconnecting');
        })
        
         connection.on("disconnected",()=>{
            console.log('SignlR状态,disconnected');
        });
        connection.on("messageReceived", (result:TableProps_) => {
            if(result?.columnType != undefined){
                dispatch({ type: 'ColumnsAction_Act', value: result.columnType });
            }
            if(result?.rowData != undefined){
                dispatch({ type: 'ColumnsDataAction_Act', value: result.rowData });
            }
            console.log('tips:',result?.syncMessage?.tips);
            if(result?.syncMessage?.tips  != undefined){
                dispatch({ type: 'ShowProgressTipsAction_Act', value: result.syncMessage.tips });
            }
            console.log('isDone:',result?.syncMessage?.isDone);
            if(result?.syncMessage?.isDone  != undefined && result?.syncMessage?.isDone == true){
                dispatch({ type: 'ShowPrograssAction_Act', value: false });
            }
            console.log('SignalR 接收信息:',result)
            });
        connection.start().then(()=>{
            console.log('SignlR连接成功.发送信息');
            //setFunc();
            act();
            
        }).catch(err=>{
            console.log('SignlR Start 时发生错误',err);
        })
        
        console.log('初始化SignlR 1.' ,connection);

            return ()=>{
                //卸载
                connection.stop();
            }
    },[])
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
          title: props.showPrograss?'进行导入':'导入完成',
          content: 'Last-content',
          icon:<LoadingOutlined />
        },
        // {
        //     title: '查看导入结果',
        //     content: 'dd',
        //     icon:<LoadingOutlined />
        //   },
      ];



    const items = steps.map((item) => ({ key: item.title, title: item.title }));
    const next = () => {
        if(props.currentindex === 0){
            if(props.selectBillTypes.length === 0){
                props._dialogText('您还没有选择需要同步的单据类型!');
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
                dispatch({ type: 'ShowProgressTipsAction_Act', value: "开始导入" });
                dispatch({ type: 'ShowPrograssAction_Act', value: true });
                props._columnsData([]);
                next();
                fetch(window.location.origin + "/" + `api/syncinstock`, 
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
                    //props._currentIndex(3);
                    //dispatch({ type: 'MenuListAction_Act', value: main as Settings[] });
                })
                .catch(err => {
                    //dispatch({ type: 'MenuListAction_Act', value: undefined });
                });
                //next();
    
                    
                
                
                }}>导入产品入库单</Button>

     </div>
     </>}
     {
        props.currentindex === 2 && 
        <>
         {
            props.showPrograss &&
            <>
            <h3>导入中</h3>
            <Spin tip={props.showProgressTips} size="large">
            </Spin>
            </>
        }
        <SelfDataGrid 
        columns={props.columns as any} 
        rows={props.columnsData as any } 
        style={{height:'calc(100vh - 320px)'}}
        isErrorFilter = {props.isErrorFilter}
        descriptionFilter = {props.descriptionFilter}
        timeFilter = {props.timeFilter}
        setIsErrorFilter = {props._isErrorFilter}
        setDescrptionFilter = {props._descriptionFilter}
        setTimeFilter = {props._timeFilter}
        />
        </> 
     }
     {/* {
        props.currentindex === 3 && 
        // <DataGrid columns={props.columns as _Column[]} rows={props.columnsData as _Row[]}  />
        <SelfDataGrid 
        columns={props.columns as any} 
        rows={props.columnsData as any } 
        style={{height:'calc(100vh - 320px)'}}
        isErrorFilter = {props.isErrorFilter}
        descriptionFilter = {props.descriptionFilter}
        timeFilter = {props.timeFilter}
        setIsErrorFilter = {props._isErrorFilter}
        setDescrptionFilter = {props._descriptionFilter}
        setTimeFilter = {props._timeFilter}
        />
     } */}
        </div>
            <div className="steps-action">
                {props.currentindex < steps.length - 1 && props.currentindex != 1 && props.currentindex != 2 && (
                <Button type="primary" onClick={() => next()}>
                    下一步
                </Button>
                )}
                {/* {props.currentindex === steps.length - 1 && (
                <Button style={{ margin: '8px' }} type="primary" onClick={() => {}}>
                    完成
                </Button>
                )} */}
                 {(props.currentindex === steps.length - 1 && !props.showPrograss) && (
                    
                    <>
                <Button style={{ margin: '8px' }} type="primary" onClick={() => {props._currentIndex(0);}}>
                    重新导入
                </Button>
                 {/* <Button style={{ margin: '8px' }} type="primary" onClick={() => {

                     fetch(window.location.origin + "/" + `api/test`, 
                        { 
                        method: 'POST',
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        }),
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log('结果',data)
                            console.log('获得记录',dayjs(`${new Date()}`).format('YYYY/MM/DD HH:mm:ss').toString());
                        })
                        .catch(err => {
                            
                        });

                 }}>
                 测试SignlR
                </Button> */}
                </>
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