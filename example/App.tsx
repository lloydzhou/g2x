import { useState } from 'react'
import { Chart } from '../src'
import { View, Data, FetchData, Interval } from '../src'
import { SpaceLayer, Encode, FieldEncode, SortX, StackY, ThetaCoordinate } from '../src'
import { Title } from '../src'
import './App.css'

function App() {

  return (
    <>
      <Chart width={640} height={480} onBeforeRender={e => console.log('before render', e)} onElementClick={e => console.log('element click',e)} onIntervalClick={e => console.log('Interval click', e)} onAfterChangeData={e => console.log('BEFORE_CHANGE_DATA', e)}>
        <SpaceLayer>
          <FetchData value="https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv" format="csv" />
          <Interval>
            <Title title="test title" align="center" />
            <Encode name="x" value="letter" />
            <Encode name="y" value="frequency" />
            <FieldEncode name="color" value="letter" />
            <SortX reverse={true} by="y" />
          </Interval>
          <Interval x={300} y={65} width={300} height={300} legend={false}>
            <FieldEncode name="y" value="frequency" />
            <Encode name="color" value="letter" />
            <StackY />
            <ThetaCoordinate />
          </Interval>
        </SpaceLayer>
      </Chart>
    </>
  )
}

export default App
