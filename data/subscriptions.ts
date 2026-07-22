export type SubscriptionCategory = 'productivity' | 'entertainment'

export interface SubscriptionItem {
  name: string
  yearly: number
  monthly: number
  expiry: string
  category: SubscriptionCategory
  extra?: string
}

type RawSubscriptionItem = Omit<SubscriptionItem, 'yearly' | 'monthly'> & {
  yearly?: number
  monthly?: number
}

export const DOLLAR_TO_RMB = 7.5

const toFixed2Number = (value: number) => Number(value.toFixed(2))

const rawSubscriptions: RawSubscriptionItem[] = [
  {
    name: '夸克扫描王',
    yearly: 88,
    expiry: '2026-11-28',
    category: 'productivity',
  },
  {
    name: 'Figma Full Seat',
    yearly: toFixed2Number(16 * 12 * DOLLAR_TO_RMB),
    expiry: '2026-09-27',
    category: 'productivity',
  },
  {
    name: 'Notion Plus',
    yearly: 798,
    expiry: '2027-07-12',
    category: 'productivity',
    extra: 'AppleStore 自动续费',
  },
  {
    name: 'Google AI Pro',
    yearly: toFixed2Number(126.76 * 12),
    expiry: '2026-04-08',
    category: 'productivity',
    extra: '2900JPY/Month',
  },
  {
    name: 'ChatGPT Plus',
    yearly: toFixed2Number(100 * 12 * DOLLAR_TO_RMB),
    expiry: '2026-10-03',
    category: 'productivity',
    extra: '100USD/Month',
  },
  {
    name: 'DeepSeek API',
    monthly: 10,
    expiry: '2030-01-01',
    category: 'productivity',
  },
  {
    name: '薄荷记账',
    yearly: 25.6,
    expiry: '2030-09-10',
    category: 'productivity',
  },
  {
    name: 'LobeChat 自助',
    yearly: 428.73,
    expiry: '2026-02-17',
    category: 'productivity',
  },
  {
    name: 'Cursor Pro',
    yearly: toFixed2Number(192 * DOLLAR_TO_RMB),
    expiry: '2026-11-18',
    category: 'productivity',
  },
  {
    name: '苹果 iCloud 2TB',
    yearly: 68 * 12,
    expiry: '2030-01-01',
    category: 'productivity',
    extra: '每月自动续订',
  },
  {
    name: '夸克网盘 VIP',
    yearly: 198,
    expiry: '2026-08-14',
    category: 'productivity',
  },
  {
    name: 'aged-coffee.me',
    yearly: 229,
    expiry: '2027-04-15',
    category: 'productivity',
  },
  {
    name: '100 云服务器 55R 型号租用一年',
    yearly: 89,
    expiry: '2027-06-12',
    category: 'productivity',
  },
  {
    name: '100 云服务器 V2R 型号租用一年',
    yearly: 165,
    expiry: '2026-09-30',
    category: 'productivity',
  },
  {
    name: 'Raycast Pro',
    yearly: toFixed2Number(192 * DOLLAR_TO_RMB),
    expiry: '2027-05-19',
    category: 'productivity',
  },
  {
    name: 'ReadWise',
    yearly: toFixed2Number(95.88 * DOLLAR_TO_RMB),
    expiry: '2025-01-26',
    category: 'productivity',
    extra: '退订',
  },
  {
    name: 'WiseOne',
    yearly: toFixed2Number(99 * DOLLAR_TO_RMB),
    expiry: '2025-03-19',
    category: 'productivity',
    extra: '退订',
  },
  {
    name: 'PopAi',
    yearly: toFixed2Number(99.9 * DOLLAR_TO_RMB),
    expiry: '2025-01-07',
    category: 'productivity',
    extra: '退订',
  },
  {
    name: '多邻国 MAX',
    yearly: 798,
    expiry: '2026-12-04',
    category: 'entertainment',
    extra: '续订 12/4 Apple 付款',
  },
  {
    name: 'Apple Music',
    yearly: 17 * 12,
    expiry: '2030-01-01',
    category: 'entertainment',
    extra: '家庭',
  },
  {
    name: '阿里云盘',
    yearly: 168,
    expiry: '2027-03-12',
    category: 'productivity',
    extra: '续订 3/12 Apple 付款',
  },
  {
    name: '胃之书',
    yearly: 98,
    expiry: '2025-05-08',
    category: 'productivity',
    extra: '退订',
  },
  {
    name: '芒果会员',
    yearly: 195,
    expiry: '2025-05-17',
    category: 'productivity',
    extra: '退订',
  },
  {
    name: 'FoodCare',
    yearly: 28,
    expiry: '2024-08-01',
    category: 'entertainment',
    extra: '退订',
  },
  {
    name: '知乎盐选',
    yearly: 198,
    expiry: '2024-06-21',
    category: 'entertainment',
    extra: '退订',
  },
  {
    name: '微博 SVIP',
    yearly: 262,
    expiry: '2025-05-27',
    category: 'entertainment',
  },
  {
    name: 'QQ 音乐',
    yearly: 158,
    expiry: '2026-03-06',
    category: 'entertainment',
    extra: '续订 3/6 Apple 付款',
  },
  {
    name: '网易云音乐',
    yearly: 158,
    expiry: '2027-05-29',
    category: 'entertainment',
  },
  {
    name: '哔哩哔哩超级大会员',
    yearly: 178,
    expiry: '2026-12-19',
    category: 'entertainment',
    extra: '续订 7/5 Apple 付款',
  },
]

export const subscriptions: SubscriptionItem[] = rawSubscriptions.map((item) => {
  const yearly = item.yearly ?? toFixed2Number(item.monthly! * 12)
  const monthly = item.monthly ?? toFixed2Number(yearly / 12)
  return { ...item, yearly, monthly }
})
