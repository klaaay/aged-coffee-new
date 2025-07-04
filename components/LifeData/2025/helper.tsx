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
    {
      month: '2 月',
      data: [
        // 睡眠时间
        '6:37',
        // 优质睡眠
        '5:29',
        // 入睡时间
        '2:25',
        // 心率
        '60',
        // 深度睡眠
        '2:37',
      ],
    },
    {
      month: '3 月',
      data: [
        // 睡眠时间
        '6:16',
        // 优质睡眠
        '5:29',
        // 入睡时间
        '2:25',
        // 心率
        '60',
        // 深度睡眠
        '2:37',
      ],
    },
    {
      month: '4 月',
      data: [
        // 睡眠时间
        '7:10',
        // 优质睡眠
        '6:03',
        // 入睡时间
        '2:05',
        // 心率
        '61',
        // 深度睡眠
        '2:33',
      ],
    },
    {
      month: '5 月',
      data: [
        // 睡眠时间
        '7:16',
        // 优质睡眠
        '6:05',
        // 入睡时间
        '2:02',
        // 心率
        '61',
        // 深度睡眠
        '2:32',
      ],
    },
    {
      month: '6 月',
      data: [
        // 睡眠时间
        '7:41',
        // 优质睡眠
        '6:22',
        // 入睡时间
        '1:43',
        // 心率
        '62',
        // 深度睡眠
        '2:37',
      ],
    },
  ],
}

export const sleepDataApp: TableData = {
  headers: ['清醒时间', '快速眼动睡眠', '快速眼动睡眠', '深度睡眠'],
  months: [
    {
      month: '1 月',
      data: [
        // 平均睡眠时间
        '06:03',
        // 清醒时间
        '0:04',
        // 快速眼动睡眠
        '1:37',
        // 核心睡眠
        '3:30',
        // 深度睡眠
        '0:55',
      ],
    },
    {
      month: '2 月',
      data: [
        // 平均睡眠时间
        '06:21',
        // 清醒时间
        '0:05',
        // 快速眼动睡眠
        '1:42',
        // 核心睡眠
        '3:40',
        // 深度睡眠
        '0:55',
      ],
    },
    {
      month: '3 月',
      data: [
        // 平均睡眠时间
        '06:16',
        // 清醒时间
        '0:06',
        // 快速眼动睡眠
        '1:48',
        // 核心睡眠
        '3:37',
        // 深度睡眠
        '0:52',
      ],
    },
    {
      month: '4 月',
      data: [
        // 平均睡眠时间
        '07:08',
        // 清醒时间
        '0:05',
        // 快速眼动睡眠
        '2:03',
        // 核心睡眠
        '3:56',
        // 深度睡眠
        '0:46',
      ],
    },
    {
      month: '5 月',
      data: [
        // 平均睡眠时间
        '07:19',
        // 清醒时间
        '0:04',
        // 快速眼动睡眠
        '2:01',
        // 核心睡眠
        '4:08',
        // 深度睡眠
        '0:47',
      ],
    },
    {
      month: '6 月',
      data: [
        // 平均睡眠时间
        '08:11',
        // 清醒时间
        '0:08',
        // 快速眼动睡眠
        '2:09',
        // 核心睡眠
        '4:23',
        // 深度睡眠
        '0:50',
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
    {
      month: '2 月',
      data: [
        // 高糖食物
        '24',
        // 牛奶
        '22',
        // 运动（有氧）
        '23',
        // 运动（无氧）
        '14',
        // 水果
        '23',
        // 痘痘
        '0',
        // 保持专注
        '21',
        // 阅读
        '21',
        // 学日语
        '26',
        // 学乐理
        '12',
        // 不吃宵夜
        '26',
      ],
    },
    {
      month: '3 月',
      data: [
        // 高糖食物
        '26',
        // 牛奶
        '26',
        // 运动（有氧）
        '25',
        // 运动（无氧）
        '19',
        // 水果
        '21',
        // 痘痘
        '1',
        // 保持专注
        '25',
        // 阅读
        '11',
        // 学日语
        '28',
        // 学乐理
        '27',
        // 不吃宵夜
        '27',
      ],
    },
    {
      month: '4 月',
      data: [
        // 高糖食物
        '26',
        // 牛奶
        '29',
        // 运动（有氧）
        '22',
        // 运动（无氧）
        '21',
        // 水果
        '28',
        // 痘痘
        '0',
        // 保持专注
        '25',
        // 阅读
        '22',
        // 学日语
        '27',
        // 学乐理
        '25',
        // 不吃宵夜
        '21',
      ],
    },
    {
      month: '5 月',
      data: [
        // 高糖食物
        '22',
        // 牛奶
        '25',
        // 运动（有氧）
        '18',
        // 运动（无氧）
        '23',
        // 水果
        '28',
        // 痘痘
        '1',
        // 保持专注
        '24',
        // 阅读
        '24',
        // 学日语
        '25',
        // 学乐理
        '25',
        // 不吃宵夜
        '25',
      ],
    },
    {
      month: '6 月',
      data: [
        // 高糖食物
        '13',
        // 牛奶
        '27',
        // 运动（有氧）
        '26',
        // 运动（无氧）
        '24',
        // 水果
        '24',
        // 痘痘
        '1',
        // 保持专注
        '28',
        // 阅读
        '28',
        // 学日语
        '25',
        // 学乐理
        '24',
        // 不吃宵夜
        '22',
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
    {
      month: '2 月',
      data: [
        // 影
        '4',
        // 书
        '2',
        // 音
        '0',
        // 听
        '9:52',
      ],
    },
    {
      month: '3 月',
      data: [
        // 影
        '3',
        // 书
        '0',
        // 音
        '5',
        // 听
        '6:21',
      ],
    },
    {
      month: '4 月',
      data: [
        // 影
        '2',
        // 书
        '0',
        // 音
        '0',
        // 听
        '2:46',
      ],
    },
    {
      month: '5 月',
      data: [
        // 影
        '7',
        // 书
        '2',
        // 音
        '0',
        // 听
        '2:46',
      ],
    },
    {
      month: '6 月',
      data: [
        // 影
        '11',
        // 书
        '3',
        // 音
        '2',
        // 听
        '04:01',
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
