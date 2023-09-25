import { useState } from 'react'
import { Chart } from './lib'
import { View, Data, Interval, Axis, TransformEncode } from './lib'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ]

  return (
    <>
      <Chart>
        <Interval>
          <Data value={data} />
          <TransformEncode x="genre" y="sold" />
        </Interval>
      </Chart>
    </>
  )
}

export default App
