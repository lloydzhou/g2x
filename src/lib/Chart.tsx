import React, {
  createContext,
  useContext,
  createRef,
  useCallback,
  useEffect,
  useRef,
  useMemo,
  forwardRef,
} from "react";
import { Chart as G2Chart } from '@antv/g2';


export const ChartContext = createContext({});

export const Chart = forwardRef((props, ref) => {
  const { children, className='', onRendered, width=600, height=300, style={}, ...other } = props
  const container = createRef<HTMLDivElement>();
  const chart = useRef<G2Chart | null>();

  const getOptions = () => {
    return other
  }
  const options = useMemo(() => {
    return other
  }, [other])
  useEffect(() => {
    console.log('container', container.current)
    const instance = new G2Chart({
      container: container.current as HTMLDivElement,
      width,
      height,
    })
    console.log('instance', instance, container.current)
    chart.current = instance
    return () => instance.destroy()
  }, [])
  useEffect(() => {
    if (chart.current) {
      chart.current.options(options)
      chart.current.render()
    }
  }, [options])

  return (
    <ChartContext.Provider value={{ options, chart: chart.current }}>
      <div
        ref={container}
        className={`antv-g2-chart ${className}`}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          ...(style as object),
        }}
      >
        {children as any}
      </div>
    </ChartContext.Provider>
  )
})
