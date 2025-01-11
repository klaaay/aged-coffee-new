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
        '7:01',
        // 优质睡眠
        '5:48',
        // 入睡时间
        '2:21',
        // 心率
        '59',
        // 深度睡眠
        '2:17',
      ],
    },
  ],
}

export const dietAndExerciseData: TableData = {
  headers: [
    '高糖食物',
    '牛奶',
    '运动',
    '水果',
    '痘痘',
    '保持专注',
    '写博文',
    '阅读',
    '学日语',
    '仰卧起坐&俯卧撑',
  ],
  months: [
    {
      month: '1 月',
      data: [
        // 高糖食物
        '18',
        // 牛奶
        '3',
        // 运动
        '23',
        // 水果
        '27',
        // 痘痘
        '3',
        // 保持专注
        '24',
        // 写博文
        '5',
        // 阅读
        '22',
        // 学日语
        '27',
        // 仰卧起坐&俯卧撑
        '0',
      ],
    },
  ],
}

export const booksAndMediaData: TableData = {
  headers: ['书', '影', '音', '听'],
  months: [
    {
      month: '1 月',
      data: [
        // 书
        '1',
        // 影
        '4',
        // 音
        '3',
        // 听
        '0',
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
    for (let j = 0; j < months.length; j++) {
      const value = months[j].data[i]
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
