import React from 'react';
import { Counter } from './components/Counter'
import { Route,Routes } from 'react-router-dom'
import './app.css'
import Rombam_Home from './components/components_robam_import/Robam_Home'
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';

export const App = () => {
  return(
      <Routes>
        <Route path='/*' element={<Rombam_Home />} />
        <Route path='/instock22' element={<Counter />} />
        <Route path='/outstock22' element={<Counter />} />
      </Routes>
      )};