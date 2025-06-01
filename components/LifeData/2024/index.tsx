import React from 'react'
import {
  booksAndMediaData,
  calculateChanges,
  calculateAverage,
  dietAndExerciseData,
  MonthData,
  sleepData,
} from './helper'

type TableType = 'sleep' | 'diet-exercise' | 'books-media'

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

const Table: React.FC<TableProps> = ({ headers, months, type }) => {
  const changes = calculateChanges(months)
  const averageData = calculateAverage(months)
  return (
    <table style={{ textAlign: 'left' }}>
      <thead>
        <tr>
          <th>月份</th>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {months.map((month, monthIndex) => (
          <tr key={monthIndex}>
            <td>{month.month}</td>
            {month.data.map((cell, cellIndex) => (
              <td key={cellIndex}>
                {cell}
                {monthIndex > 0 && changes[monthIndex - 1][cellIndex] && (
                  <sup style={{ color: getChangeColor(changes[monthIndex - 1][cellIndex], type) }}>
                    {changes[monthIndex - 1][cellIndex]}
                  </sup>
                )}
              </td>
            ))}
          </tr>
        ))}
        {averageData && (
          <tr style={{ fontWeight: 'bold' }}>
            <td>平均</td>
            {averageData.map((average, index) => (
              <td key={index}>{average}</td>
            ))}
          </tr>
        )}
      </tbody>
    </table>
  )
}

export const SleepTable2024: React.FC = () => {
  return <Table headers={sleepData.headers} months={sleepData.months} type="sleep" />
}

export const DietAndExerciseTable2024: React.FC = () => {
  return (
    <Table
      headers={dietAndExerciseData.headers}
      months={dietAndExerciseData.months}
      type="diet-exercise"
    />
  )
}

export const BooksAndMediaTable2024: React.FC = () => {
  return (
    <Table
      headers={booksAndMediaData.headers}
      months={booksAndMediaData.months}
      type="books-media"
    />
  )
}
