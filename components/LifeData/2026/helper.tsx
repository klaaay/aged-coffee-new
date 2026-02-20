export interface MonthData {
  month: string
  data: string[]
}

export interface TableData {
  headers: string[]
  months: MonthData[]
}

export const sleepDataApp: TableData = {
  headers: ['平均睡眠时间', '清醒时间', '快速眼动睡眠', '核心睡眠', '深度睡眠'],
  months: [
    {
      month: '1 月',
      data: [
        // 平均睡眠时间
        '7:34',
        // 清醒时间
        '0:17',
        // 快速眼动睡眠
        '2:3',
        // 核心睡眠
        '3:36',
        // 深度睡眠
        '1:7',
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
    '学英语',
    '学日语',
    '学乐理',
    '不吃宵夜',
    '不吃辣',
    '冥想',
    '吃补充剂',
  ],
  months: [
    {
      month: '1 月',
      data: [
        // 高糖食物
        '16',
        // 牛奶
        '7',
        // 运动（有氧）
        '13',
        // 运动（无氧）
        '21',
        // 水果
        '28',
        // 痘痘
        '2',
        // 保持专注
        '28',
        // 阅读
        '20',
        // 学英语
        '1',
        // 学日语
        '27',
        // 学乐理
        '27',
        // 不吃宵夜
        '25',
        // 不吃辣
        '28',
        // 冥想
        '6',
        // 吃补充剂
        '27',
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
        '3',
        // 书
        '1',
        // 音
        '0',
        // 听
        '3:3',
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
      if (value === '-' || previousMonth[index] === '-') return '-'
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
      if (value === '-') continue
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
    if (count === 0) {
      average.push('-')
    } else {
      const avg = sum / count
      if (months[0].data[i].includes(':')) {
        average.push(formatTime(Math.round(avg)))
      } else {
        average.push(avg.toFixed(2))
      }
    }
  }
  return average
}
