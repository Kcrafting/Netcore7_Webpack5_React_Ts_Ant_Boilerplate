import { Counter } from './components/Counter'
import { Button } from 'antd';
import { Route,Routes } from 'react-router-dom'
import RobamMenu  from './components/components_robam_import/mainpage_menu'
import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import locale from 'antd/es/date-picker/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { Steps } from 'antd';
import Tablem from './components/components_robam_import/table_test'

const { RangePicker } = DatePicker;
import './app.css'
export const App = () => {
  const [current, setCurrent] = React.useState(0);
  const onChange = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };
  return (
<RobamMenu>
<>
      <Steps
        type="navigation"
        size="small"
        current={current}
        onChange={onChange}
        className="site-navigation-steps"
        items={[
          {
            title: 'Step 1',
            subTitle: '00:00:05',
            status: 'finish',
            description: 'This is a description.',
          },
          {
            title: 'Step 2',
            subTitle: '00:01:02',
            status: 'process',
            description: 'This is a description.',
          },
          {
            title: 'Step 3',
            subTitle: 'waiting for longlong time',
            status: 'wait',
            description: 'This is a description.',
          },
        ]}
      />
      {/* <Steps
        type="navigation"
        current={current}
        onChange={onChange}
        className="site-navigation-steps"
        items={[
          {
            status: 'finish',
            title: 'Step 1',
          },
          {
            status: 'process',
            title: 'Step 2',
          },
          {
            status: 'wait',
            title: 'Step 3',
          },
          {
            status: 'wait',
            title: 'Step 4',
          },
        ]}
      />
      <Steps
        type="navigation"
        size="small"
        current={current}
        onChange={onChange}
        className="site-navigation-steps"
        items={[
          {
            status: 'finish',
            title: 'finish 1',
          },
          {
            status: 'finish',
            title: 'finish 2',
          },
          {
            status: 'process',
            title: 'current process',
          },
          {
            status: 'wait',
            title: 'wait',
            disabled: true,
          },
        ]}
      /> */}
    </>
<RangePicker
    locale={locale}
      defaultValue={[
        dayjs('2015/01/01 00:00:00', 'YYYY/MM/DD HH:mm:ss'), 
        dayjs('2015/01/01 00:00:00', 'YYYY/MM/DD HH:mm:ss')]}
      format={'YYYY/MM/DD  HH:mm:ss'}
      renderExtraFooter={() => '选择的时间'} 
      showTime = {true}
    />
    <Tablem style={{flex:1}}/>
</RobamMenu>
      // <Routes>
      // <Route path='/' element={<Counter />} />
      // <Route path='/instock' element={<Counter />} />
      // <Route path='/outstock' element={<Counter />} />
      // </Routes>

  )
}
