import React from "react";
import RobamMenu from './mainpage_menu'

import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
import locale from 'antd/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';
import { Button } from 'antd';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import 'dayjs/locale/zh-cn';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Route,Routes } from 'react-router-dom'

interface columnsdataType{
    key:any,
    name:string,
    age?:number,
    address?:string
}
interface columnsType{
    name:string,
    dataIndex:string,
    key:string,
    resizable:boolean
}
const App = () => {
    const [current, setCurrent] = React.useState(0);
    const onChange = (value: number) => {
        console.log('onChange:', value);
        setCurrent(value);
    };
    const [title, setTitle] = React.useState('老板数据同步系统');
    const columns:columnsType[] = [
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

    const dataSource:columnsdataType[] = new Array<columnsdataType>();
    for(let index_ = 0; index_ < 100000;index_++){
        dataSource.push({key:index_,name:'name',age:index_,address:'地址'+ (index_ as unknown as string)})
    }
    return (
        <RobamMenu>
            <Routes>
            <Route path='/api/cprkdr' element={<>
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
                />

                <Button style={{ margin: '10px' }} type="primary">导入</Button>

            </div>
            <DataGrid columns={columns} rows={dataSource} style={{ flex: 1, height: 'calc(100% - 94px)' }} />
            </>}>

            </Route>
            </Routes>
            {/* <a style={{ fontSize: '30px', lineBreak: 'loose', backgroundColor: 'transparent', marginLeft: '20px', marginTop: '10px', marginBottom: '10px' }}><b>{title}</b></a> */}
            
        </RobamMenu>
    )
}

export default App;