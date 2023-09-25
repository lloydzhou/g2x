import React, {
  createContext,
  useContext,
  createRef,
  useCallback,
  useEffect,
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
  cloneElement,
  useState,
  Fragment,
  FC,
} from "react";
import { Chart as G2Chart } from '@antv/g2';
import type {
  Data,
  ViewComposition, GeoViewComposition, GeoPathComposition, SpaceLayerComposition, SpaceFlexComposition, FacetContext, FacetRectComposition, RepeatMatrixComposition, FacetCircleComposition, 
  IntervalMark, RectMark, LineMark, PointMark, TextMark, CellMark, AreaMark, NodeMark, EdgeMark, LinkMark, ImageMark, PolygonMark, BoxMark, VectorMark, LineXMark, LineYMark, RangeMark, RangeXMark, RangeYMark, ConnectorMark, SankeyMark, PathMark, TreemapMark, PackMark, BoxPlotMark, ShapeMark, ForceGraphMark, TreeMark, WordCloudMark, DensityMark, CustomMark,
  ConstantEncode, FieldEncode, ColumnEncode, TransformEncode, CustomEncode,
  TitleComponent, AxisComponent, LegendComponent, ScrollbarComponent, SliderComponent, TooltipComponent,
} from '@antv/g2'


const wrapper = (WrappedComponent) => {
  // 父类始终会拿到一个ref
  // 使用这个ref拿到子类的props，组合起来
  return forwardRef((props, ref) => {
    const { children, ...other } = props
    useImperativeHandle(ref, () => ({
      options: () => other
    }))
    return (
      <WrappedComponent ref={ref} {...other}>
        {children}
      </WrappedComponent>
    )
  })
}

export type GFC<T> = FC<Partial<T>>;
const upper = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);

const VIEWS = ['view', 'geoView', 'geoPath', 'spaceLayer', 'spaceFlex', 'facetRect', 'repeatMatrix', 'facetCircle', 'timingKeyframe']
const DATAS = ['inline', 'fetch']
const MARKS = ['interval', 'rect', 'line', 'point', 'text', 'cell', 'area', 'node', 'edge', 'link', 'image', 'polygon', 'box', 'vector', 'lineX', 'lineY', 'connector', 'range', 'rangeX', 'rangeY', 'sankey', 'path', 'treemap', 'pack', 'boxplot', 'shape', 'forceGraph', 'tree', 'wordCloud', 'gauge', 'density', 'heatmap', 'liquid']
const ENCODES = ['constant', 'field', 'transform', 'column']
const COMPONENTS = ['title', 'subtitle', 'axisX', 'axisY', 'axisZ', 'legends'] // TODO

export const isView = type => VIEWS.includes(type)
export const isData = type => DATAS.includes(type)
export const isMark = type => MARKS.includes(type)
export const isEncode = type => ENCODES.includes(type)
export const isComponent = type => COMPONENTS.includes(type)


export function createComponent<T>(t='view', displayName='', key='') {
  const Component: GFC<T> = forwardRef((props: T, ref) => {
    const { children, type=t, ...other } = props
    const childrenRefs = useRef({})
    const attributeRefs = useRef({})
    const options = () => {
      const attrs = Object.entries(attributeRefs.current).reduce((s, [k, child]) => ({...s, [k]: child.options()}), {})
      if (isView(type)) {
        return { type, ...other, ...attrs, children: Object.values(childrenRefs.current).map(child => child.options()) }
      }
      return { type, ...other, ...attrs }
    }
    useImperativeHandle(ref, () => ({ options }))
    if (children) {
      return (children.map ? children : [children]).map((child, index) => {
        const { key, props, type: ct } = child
        const { type: t = ct.key, children } = props
        return cloneElement(child, {
          key: key || index,
          ref: (ref) => { 
            if (isMark(t) || isView(t)) {
              childrenRefs.current[key || index] = ref;
            } else {
              attributeRefs.current[key || ct.key] = ref;
            }
          },
          children,
        }) 
     })
    }
    return null
  })
  Component.displayName = displayName || upper(t)
  Component.key = key || t
  return Component
}

export const View = createComponent<ViewComposition>('view')
export const GeoView = createComponent<GeoViewComposition>('geoView')
export const GeoPath = createComponent<GeoPathComposition>('geoPath')
export const SpaceLayer = createComponent<SpaceLayerComposition>('spaceLayer')
export const SpaceFlex = createComponent<SpaceFlexComposition>('spaceFlex')
export const FacetRect = createComponent<FacetRectComposition>('facetRect')
export const RepeatMatrix = createComponent<RepeatMatrixComposition>('repeatMatrix')
export const FacetCircle = createComponent<FacetCircleComposition>('facetCircle')
export const TimingKeyframe = createComponent<TimingKeyframeComposition>('timingKeyframe')

export const InlineData = createComponent<Data>('inline', 'Data', 'data')
export const FetchData = createComponent<Data>('fetch', 'Data', 'data')
export const Data = InlineData

export const Interval = createComponent<IntervalMark>('interval')
export const Rect = createComponent<RectMark>('rect')
export const Line = createComponent<LineMark>('line')
export const Point = createComponent<PointMark>('point')
export const Text = createComponent<TextMark>('text')
export const LineX = createComponent<LineXMark>('lineX')
export const LineY = createComponent<LineYMark>('lineY')
export const Range = createComponent<RangeMark>('range')
export const RangeX = createComponent<RangeXMark>('rangeX')
export const RangeY = createComponent<RangeYMark>('rangeY')
export const Connector = createComponent<ConnectorMark>('connector')
export const Cell = createComponent<CellMark>('cell')
export const Area = createComponent<AreaMark>('area')
export const Node = createComponent<NodeMark>('node')
export const Edge = createComponent<EdgeMark>('edge')
export const Link = createComponent<LinkMark>('link')
export const Image = createComponent<ImageMark>('image')
export const Polygon = createComponent<PolygonMark>('polygon')
export const Box = createComponent<BoxMark>('box')
export const BoxPlot = createComponent<BoxPlotMark>('boxplot')
export const Shape = createComponent<ShapeMark>('shape')
export const Vector = createComponent<VectorMark>('vector')
export const Sankey = createComponent<SankeyMark>('sankey')
export const Path = createComponent<PathMark>('path')
export const Treemap = createComponent<TreemapMark>('treemap')
export const Pack = createComponent<PackMark>('pack')
export const ForceGraph = createComponent<ForceGraphMark>('forceGraph')
export const Tree = createComponent<TreeMark>('tree')
export const WordCloud = createComponent<WordCloudMark>('wordCloud')
export const Gauge = createComponent<GaugeMark>('gauge')
export const Density = createComponent<DensityMark>('density')
export const Heatmap = createComponent<HeatmapMark>('heatmap')
export const Liquid = createComponent<LiquidMark>('liquid')
export const Custom = createComponent<CustomMark>('custom')

export const TransformEncode = createComponent<TransformEncode>('transform', 'TransformEncode', 'encode')
export const Encode = TransformEncode
export const Axis = createComponent<{[key: 'x'|'y'|'z']: AxisComponent }>('axis')

export const ChartContext = createContext({});

export const Chart = forwardRef((props, ref) => {
  const { children, className='', onRendered, width=600, height=300, style={}, ...other } = props
  const container = createRef<HTMLDivElement>();
  const chart = useRef<G2Chart | null>();
  const viewRef = useRef();

  useEffect(() => {
    const instance = new G2Chart({
      container: container.current as HTMLDivElement,
      width,
      height,
    })
    chart.current = instance
    if (typeof ref === "function") {
      ref(instance)
    } else if (ref) {
      ref.current = instance
    }
    return () => instance.destroy()
  }, [])
  useEffect(() => {
    if (chart.current && viewRef.current) {
      chart.current.options({ ...other, ...viewRef.current.options() })
      chart.current.render()
    }
  }, [other, viewRef.current])

  return (
    <ChartContext.Provider value={{ chart: chart.current }}>
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
        <View ref={viewRef}>{children as any}</View>
      </div>
    </ChartContext.Provider>
  )
})
