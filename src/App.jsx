import { useState } from 'react'
import './App.css'
import KLineChart from './components/KLineChart'
import mData from './mock/data.json'
import styled from 'styled-components'
const AppStyle = styled.div`
  padding: 0 0px 10px 20px;
  margin: 0 auto;
  height: 400px;
  border: 1px solid #000;
  background-color: #333;
  width: 400px;
`
const App = () => {
  const d1 = mData.splice(0, 50)
  const d2 = mData.splice(50)
  const [data, setData] = useState(d1)
  const handleClick = () => {
    setData(d2)
  }
  return (
    <div>
      <AppStyle className="App">
        <KLineChart data={data}></KLineChart>
      </AppStyle>
      <button onClick={handleClick}>click</button>
    </div>
  )
}

export default App
