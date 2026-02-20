'use client'

import React from 'react'
import { Table as AntdTable } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import {
  booksAndMediaData,
  calculateChanges,
  calculateAverage,
  dietAndExerciseData,
  MonthData,
  sleepDataApp,
} from './helper'

type TableType = 'sleep' | 'sleep-app' | 'diet-exercise' | 'books-media'

interface TableProps {
  headers: string[]
  months: MonthData[]
  type: TableType
}

const getChangeColor = (change: string, type: TableType): string => {
  const numericValue = parseFloat(change.replace('+', ''))

  if (isNaN(numericValue) || change === '-') {
    return 'black'
  }

  switch (type) {
    case 'sleep':
    case 'sleep-app':
      if (numericValue >= 30) return '#22c55e'
      if (numericValue <= -30) return '#ef4444'
      break
    case 'diet-exercise':
      if (numericValue >= 10) return '#22c55e'
      if (numericValue <= -10) return '#ef4444'
      break
    case 'books-media':
      if (numericValue >= 3) return '#22c55e'
      if (numericValue <= -3) return '#ef4444'
      break
  }

  return 'black'
}

const getCellBackgroundColor = (change: string, type: TableType): string => {
  const color = getChangeColor(change, type)
  if (color === '#ef4444') return '#fef2f2'
  if (color === '#22c55e') return '#f0fdf4'
  return 'transparent'
}

interface TableRow {
  key: string
  month: string
  isAverage?: boolean
  [key: string]: string | boolean | undefined
}

const Table: React.FC<TableProps> = ({ headers, months, type }) => {
  const changes = calculateChanges(months)
  const averageData = calculateAverage(months)

  const columns: ColumnsType<TableRow> = [
    {
      title: '月份',
      dataIndex: 'month',
      key: 'month',
      align: 'left',
      width: 80,
      fixed: 'left',
      render: (text: string, record) => (record.isAverage ? <strong>{text}</strong> : text),
    },
    ...headers.map((header, index) => ({
      title: header,
      dataIndex: `col_${index}`,
      key: `col_${index}`,
      align: 'left' as const,
      width: 100,
      onCell: (record: TableRow) => {
        if (record.isAverage) return {}
        const monthIndex = parseInt(record.key, 10)
        const change = monthIndex > 0 ? changes[monthIndex - 1]?.[index] : null
        const backgroundColor = change ? getCellBackgroundColor(change, type) : undefined
        return backgroundColor ? { style: { backgroundColor } } : {}
      },
      render: (value: string, record: TableRow) => {
        const isAvgRow = record.isAverage
        if (isAvgRow) {
          return <strong>{value}</strong>
        }
        const monthIndex = parseInt(record.key, 10)
        const change =
          monthIndex > 0 && changes[monthIndex - 1]?.[index] ? changes[monthIndex - 1][index] : null
        const changeColor = change ? getChangeColor(change, type) : 'black'
        return (
          <>
            {value}
            {change && <sup style={{ color: changeColor, marginLeft: 2 }}>{change}</sup>}
          </>
        )
      },
    })),
  ]

  const dataSource: TableRow[] = months.map((month, monthIndex) => {
    const row: TableRow = {
      key: String(monthIndex),
      month: month.month,
      isAverage: false,
    }
    month.data.forEach((cell, cellIndex) => {
      row[`col_${cellIndex}`] = cell
    })
    return row
  })

  if (averageData) {
    const avgRow: TableRow = {
      key: 'average',
      month: '平均',
      isAverage: true,
    }
    averageData.forEach((avg, index) => {
      avgRow[`col_${index}`] = avg
    })
    dataSource.push(avgRow)
  }

  return (
    <AntdTable
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      showHeader
      size="small"
      scroll={{ x: 'max-content' }}
    />
  )
}

export const SleepTableApp2026: React.FC = () => {
  return <Table headers={sleepDataApp.headers} months={sleepDataApp.months} type="sleep-app" />
}

export const DietAndExerciseTable2026: React.FC = () => {
  return (
    <Table
      headers={dietAndExerciseData.headers}
      months={dietAndExerciseData.months}
      type="diet-exercise"
    />
  )
}

export const BooksAndMediaTable2026: React.FC = () => {
  return (
    <Table
      headers={booksAndMediaData.headers}
      months={booksAndMediaData.months}
      type="books-media"
    />
  )
}
