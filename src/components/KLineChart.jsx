import React, { useRef, useState, useEffect, useCallback } from 'react'
import { createChart } from 'lightweight-charts'
import styled from 'styled-components'

const CANDLE_CHART_HEIGHT = 400
const ChartStyle = styled.div`
  padding: 0 0px 10px 20px;
  /* margin: 0 auto;
  height: 400px;
  border: 1px solid #000;
  width: 400px; */
`

const CandleChart = ({ data, ...rest }) => {
  const chartRef = useRef(null)
  const [chartCreated, setChart] = useState()
  let isCreate = false
  useEffect(() => {
    if (!chartCreated && data?.length && !!chartRef?.current?.parentElement && !isCreate) {
      console.log('create >>> ')
      const chart = createChart(chartRef.current, {
        height: chartRef.current.parentElement.clientHeight - 60,
        width: chartRef.current.parentElement.clientWidth - 40,
        layout: {
          backgroundColor: 'transparent',
          textColor: '#fff',
          fontFamily: 'Kanit, sans-serif',
          fontSize: 12
        },
        rightPriceScale: {
          scaleMargins: {
            top: 0.1,
            bottom: 0.1
          },
          borderVisible: false
        },
        timeScale: {
          borderVisible: false,
          secondsVisible: true
          // tickMarkFormatter: (unixTime: number) => {
          //   return format(unixTime * 1000, 'MM/dd h:mm a')
          // },
        },
        watermark: {
          visible: false
        },
        grid: {
          horzLines: {
            visible: false
          },
          vertLines: {
            visible: false
          }
        },
        crosshair: {
          horzLine: {
            visible: false,
            labelVisible: false
          },
          mode: 1,
          vertLine: {
            visible: true,
            labelVisible: false,
            style: 3,
            width: 1,
            color: '#31D0AAa0',
            labelBackgroundColor: 'primary'
          }
        }
      })
      chart.timeScale().fitContent()
      setChart(chart)
      isCreate = true
    }
  }, [chartCreated, data, isCreate])
  useEffect(() => {
    if (chartCreated && data) {
      console.log(111)
      const series = chartCreated.addCandlestickSeries({
        upColor: '#31D0AA',
        downColor: '#ea4335',
        borderDownColor: '#ea4335',
        borderUpColor: '#31D0AA',
        wickDownColor: '#ea4335',
        wickUpColor: '#31D0AA'
      })
      // setCurrentSeries(series)
      // preSeries =
      series.setData(data)
      // chartCreated.subscribeCrosshairMove((param) => {
      //   if (
      //     chartRef?.current &&
      //     (param === undefined ||
      //       param.time === undefined ||
      //       (param && param.point && param.point.x < 0) ||
      //       (param && param.point && param.point.x > chartRef.current.clientWidth) ||
      //       (param && param.point && param.point.y < 0) ||
      //       (param && param.point && param.point.y > CANDLE_CHART_HEIGHT))
      //   ) {
      //     // reset values
      //     if (setValue) setValue(undefined)
      //     if (setLabel) setLabel(undefined)
      //   } else if (series && param) {
      //     const timestamp = param.time as number
      //     const now = new Date(timestamp * 1000)
      //     const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000)
      //     const time = `${format(utc, 'MMM d, yyyy h:mm a')} (UTC)`
      //     const parsed = param.seriesPrices.get(series) as { open: number } | undefined
      //     if (setValue) setValue(parsed?.open)
      //     if (setLabel) setLabel(time)
      //   }
      // })
    }
  }, [chartCreated, data])
  return (
    <>
      <ChartStyle ref={chartRef} id="candle-chart" {...rest} />
    </>
  )
}

export default CandleChart
