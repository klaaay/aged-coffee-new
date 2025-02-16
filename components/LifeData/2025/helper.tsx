export interface MonthData {
  month: string
  data: string[]
}

export interface TableData {
  headers: string[]
  months: MonthData[]
}

export const sleepData: TableData = {
  headers: ['睡眠时间', '优质睡眠', '入睡时间', '心率', '深度睡眠'],
  months: [
    {
      month: '1 月',
      data: [
        // 睡眠时间
        '6:30',
        // 优质睡眠
        '5:23',
        // 入睡时间
        '2:38',
        // 心率
        '59',
        // 深度睡眠
        '2:38',
      ],
    },
  ],
}

export const dietAndExerciseData: TableData = {
  headers: [
    '高糖食物',
    '牛奶',
    '运动 (有氧)',
    '运动 (无氧)',
    '水果',
    '痘痘',
    '保持专注',
    '阅读',
    '学日语',
    '学乐理',
    '不吃宵夜',
  ],
  months: [
    {
      month: '1 月',
      data: [
        // 高糖食物
        '21',
        // 牛奶
        '9',
        // 运动（有氧）
        '18',
        // 运动（无氧）
        '6',
        // 水果
        '22',
        // 痘痘
        '2',
        // 保持专注
        '19',
        // 阅读
        '20',
        // 学日语
        '28',
        // 学乐理
        '0',
        // 不吃宵夜
        '28',
      ],
    },
  ],
}

export const booksAndMediaData: TableData = {
  headers: ['影', '书', '音', '听 - 播客'],
  months: [
    {
      month: '1 月',
      data: [
        // 影
        '4',
        // 书
        '1',
        // 音
        '10',
        // 听
        '5:04',
      ],
    },
  ],
}

const parseTime = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

export const calculateChanges = (months: MonthData[]): string[][] => {
  const changes: string[][] = []
  for (let i = 1; i < months.length; i++) {
    const currentMonth = months[i].data
    const previousMonth = months[i - 1].data
    const change = currentMonth.map((value, index) => {
      if (value.includes(':') && previousMonth[index].includes(':')) {
        const diff = parseTime(value) - parseTime(previousMonth[index])
        if (isNaN(diff) || diff === 0) return '-'
        return (diff > 0 ? '+' : '') + diff
      }
      const diff = parseFloat(value) - parseFloat(previousMonth[index])
      if (isNaN(diff) || diff === 0) return '-'
      return (diff > 0 ? '+' : '') + diff
    })
    changes.push(change)
  }
  return changes
}

const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}:${mins.toString().padStart(2, '0')}`
}

export const calculateAverage = (months: MonthData[]): string[] => {
  const average: string[] = []
  for (let i = 0; i < months[0].data.length; i++) {
    let sum = 0
    let count = 0
    for (const element of months) {
      const value = element.data[i]
      if (value.includes(':')) {
        sum += parseTime(value)
      } else {
        const numValue = parseFloat(value)
        if (!isNaN(numValue)) {
          sum += numValue
        }
      }
      count++
    }
    const avg = sum / count
    if (months[0].data[i].includes(':')) {
      average.push(formatTime(Math.round(avg)))
    } else {
      average.push(avg.toFixed(2))
    }
  }
  return average
}
