import React from "react";
import RobamMenu from './Robam_Menu'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Route,Routes } from 'react-router-dom'
import { ApplicationState }  from '../../store'
import CPRKD from './Robam_Import_CPRKD'
import Hello from './Robam_Hello'
const App = () => {
    const [current, setCurrent] = React.useState(0);
    const onChange = (value: number) => {
        console.log('onChange:', value);
        setCurrent(value);
    };
    const [title, setTitle] = React.useState('老板数据同步系统');

    return (
        <RobamMenu>
            <Routes>
            <Route path='/page' element={<Hello />}/>
            <Route path='/page/cprkdr' element={<CPRKD />}/>

            {/* <Route path=""/> */}
            </Routes>
            {/* <a style={{ fontSize: '30px', lineBreak: 'loose', backgroundColor: 'transparent', marginLeft: '20px', marginTop: '10px', marginBottom: '10px' }}><b>{title}</b></a> */}
            
        </RobamMenu>
    )
}

export default App;