import { Counter } from './components/Counter'
import { Button, DatePicker } from 'antd';

export const App = () => {
  return (
    <>
          <h1>React TypeScript Webpack Starter Template</h1>
          <Button type="primary">PRESS ME</Button>
          <DatePicker placeholder="select date" />
      <Counter />
    </>
  )
}
