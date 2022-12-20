import React, { useEffect } from "react";
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

type _CPRKDProp = 
    Robam_Import_CPRKD_store.CPRKDState &
    typeof Robam_Import_CPRKD_store.actionCreators

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

    const columns:columnsType[] = [
        {
            name: '序号',
            dataIndex: 'name',
            key: 'checked',
            resizable: true,
            type:'checkbox'
        },
        {
            name: '姓名',
            dataIndex: 'name',
            key: 'name',
            resizable: true
        },
        {
            name: '年龄',
            dataIndex: 'age',
            key: 'age',
            resizable: true
        },
        {
            name: '住址',
            dataIndex: 'address',
            key: 'address',
            resizable: true
        },
    ];

    const dataSource:columnsDataType[] = new Array<columnsDataType>();
    for(let index_ = 0; index_ < 100000;index_++){
        dataSource.push({key:index_,name:'name',age:index_,address:'地址'+ (index_ as unknown as string),checked:false})
    }

const Robam_Import_CPRKD:React.FC<_CPRKDProp> = (props)=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        //dispatch({type:'ColumnsDataAction_Act',value:dataSource});
        //dispatch({type:'ColumnsAction_Act',value:columns})
        props._columns(columns);
        props._columnsData(dataSource);
    },[]);
    return(
        <>
        <div>
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
                console.log(' props.startDate,props.endDate ',props.startDate,props.endDate);
                }}>导入产品入库单</Button>

        </div>
        <DataGrid columns={props.columns as columnsType[]} rows={props.columnsData as columnsDataType[]} style={{ flex: 1, height: 'calc(100% - 56px)' }} />
        </>
        )
}


export default connect(
    (state: ApplicationState) => state.cprkd,
    Robam_Import_CPRKD_store.actionCreators
)(Robam_Import_CPRKD as any);