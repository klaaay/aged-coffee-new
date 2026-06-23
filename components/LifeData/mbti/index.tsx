'use client'

import React, { useMemo, useState } from 'react'
import { Slider } from 'antd'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { TooltipContentProps } from 'recharts'
import { mbtiRecords } from './data'
import { dimensionConfig, enrichMbtiRecord } from './utils'

const chartData = mbtiRecords.map(enrichMbtiRecord)

type ChartPayload = (typeof chartData)[number]

function MbtiTooltip({ active, payload }: TooltipContentProps<number, string>) {
  if (!active || !payload?.length) return null

  const point = payload[0]?.payload as ChartPayload | undefined
  if (!point) return null

  return (
    <div className="rounded-lg border border-gray-200 bg-white/95 px-3 py-2 text-xs shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/95">
      <div className="mb-1 font-medium text-gray-900 dark:text-gray-100">{point.label}</div>
      <div className="mb-2 text-primary-600 dark:text-primary-400">
        {point.typeName} · {point.type}
      </div>
      <div className="space-y-1 text-gray-600 dark:text-gray-300">
        {point.traits.map(({ key, label, value }) => {
          const color = dimensionConfig.find((item) => item.key === key)?.color
          return (
            <div key={key} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {label}
              </span>
              <span className="tabular-nums">{value}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const MbtiTrendChart: React.FC = () => {
  const [yRange, setYRange] = useState<[number, number]>([40, 100])

  const tickFormatter = useMemo(
    () => (value: string) => {
      const record = chartData.find((item) => item.date === value)
      return record?.label ?? value
    },
    []
  )

  return (
    <div className="not-prose my-6 space-y-4">
      <div className="h-[360px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--color-gray-200)"
            />
            <XAxis
              dataKey="date"
              tickFormatter={tickFormatter}
              tick={{ fontSize: 11 }}
              tickMargin={8}
              axisLine={false}
              tickLine={false}
              className="fill-gray-500 dark:fill-gray-400"
              interval="preserveStartEnd"
              minTickGap={24}
            />
            <YAxis
              domain={yRange}
              tick={{ fontSize: 11 }}
              tickMargin={4}
              axisLine={false}
              tickLine={false}
              width={36}
              tickFormatter={(value) => `${value}%`}
              className="fill-gray-500 dark:fill-gray-400"
            />
            <ReferenceLine
              y={50}
              stroke="var(--color-gray-300)"
              strokeDasharray="6 4"
              strokeWidth={1}
            />
            <Tooltip
              content={MbtiTooltip}
              cursor={{ stroke: 'currentColor', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-xs text-gray-600 dark:text-gray-300">{value}</span>
              )}
            />
            {dimensionConfig.map(({ key, positive, negative, color }) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                name={`${positive}/${negative}`}
                stroke={color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0, fill: color }}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-700">
        <div className="mb-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>纵轴范围</span>
          <span className="tabular-nums">
            {yRange[0]}% – {yRange[1]}%
          </span>
        </div>
        <Slider
          range
          min={0}
          max={100}
          step={5}
          value={yRange}
          onChange={(value) => setYRange(value as [number, number])}
          tooltip={{ formatter: (value) => `${value}%` }}
        />
      </div>
    </div>
  )
}

export const MbtiDataTable: React.FC = () => {
  const getChangeColor = (change: number) => {
    if (change >= 3) return '#22c55e'
    if (change <= -3) return '#ef4444'
    return 'var(--color-gray-500)'
  }

  return (
    <div className="not-prose overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="px-3 py-2 text-left font-medium">日期</th>
            <th className="px-3 py-2 text-left font-medium">类型</th>
            {dimensionConfig.map(({ positive, negative }) => (
              <th key={positive} className="px-3 py-2 text-right font-medium">
                {positive}/{negative}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chartData.map((record, rowIndex) => {
            const previous = rowIndex > 0 ? chartData[rowIndex - 1] : null

            return (
              <tr
                key={record.date}
                className="border-b border-gray-100 dark:border-gray-800"
              >
                <td className="px-3 py-2">{record.label}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {record.type}
                  <span className="ml-1 text-gray-500 dark:text-gray-400">({record.typeName})</span>
                </td>
                {record.traits.map(({ key, label, value }) => {
                  const change =
                    previous !== null ? record[key] - previous[key] : null
                  const changeLabel =
                    change !== null && change !== 0
                      ? `${change > 0 ? '+' : ''}${change}`
                      : null

                  return (
                    <td key={key} className="relative px-3 py-3 text-right tabular-nums">
                      {changeLabel && (
                        <span
                          className="absolute top-1 right-1 text-[10px] leading-none tabular-nums"
                          style={{ color: getChangeColor(change!) }}
                        >
                          {changeLabel}
                        </span>
                      )}
                      {label} {value}%
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
