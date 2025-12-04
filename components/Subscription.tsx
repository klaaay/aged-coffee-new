'use client'

import React, { useState } from 'react'

type SubscriptionItem = {
  name: string
  yearly?: number
  monthly?: number
  expiry: string
  type: string
  extra?: string
}

export const DOLLAR2RMB = 7.5

export const toFixed2Number = (num: number) => parseFloat(num.toFixed(2))

const daysUntilExpiry = (expiryDate: string) => {
  const today = new Date()
  const expiry = new Date(expiryDate)
  const difference = expiry.getTime() - today.getTime()
  const days = Math.ceil(difference / (1000 * 3600 * 24))
  return days > 0 ? days : 0
}

export const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>(
    [
      {
        name: '夸克扫描王',
        yearly: 88,
        expiry: '2026-11-28',
        type: '效率',
        extra: '',
      },
      {
        name: 'Figma Full Seat',
        yearly: toFixed2Number(16 * 12 * DOLLAR2RMB),
        expiry: '2026-9-27',
        type: '效率',
        extra: '',
      },
      {
        name: 'ChatGPT Pro',
        yearly: toFixed2Number(20 * 12 * DOLLAR2RMB),
        expiry: '2026-10-3',
        type: '效率',
        extra: '',
      },
      {
        name: '薄荷记账',
        yearly: 25.6,
        expiry: '2030-09-10',
        type: '效率',
        extra: '',
      },
      {
        name: 'LobeChat 自助',
        yearly: 428.73,
        expiry: '2026-02-17',
        type: '效率',
        extra: '',
      },
      {
        name: 'Cursor Pro',
        yearly: toFixed2Number(192 * DOLLAR2RMB),
        expiry: '2026-11-18',
        type: '效率',
        extra: '',
      },
      {
        name: '苹果 iCloud 2TB',
        yearly: 68 * 12,
        expiry: '2030-01-01',
        type: '效率',
        extra: '每月自动续订',
      },
      {
        name: '夸克网盘 VIP',
        yearly: 198,
        expiry: '2026-8-14',
        type: '效率',
        extra: '',
      },
      {
        name: 'aged-coffee.me',
        yearly: 229,
        expiry: '2026-4-15',
        type: '效率',
        extra: '',
      },
      {
        name: 'Raycast Pro',
        yearly: toFixed2Number(192 * DOLLAR2RMB),
        expiry: '2026-05-19',
        type: '效率',
        extra: '',
      },
      {
        name: 'ReadWise',
        yearly: toFixed2Number(95.88 * DOLLAR2RMB),
        expiry: '2025-01-26',
        type: '效率',
        extra: '退订',
      },
      {
        name: 'WiseOne',
        yearly: toFixed2Number(99 * DOLLAR2RMB),
        expiry: '2025-03-19',
        type: '效率',
        extra: '退订',
      },
      {
        name: 'PopAi',
        yearly: toFixed2Number(99.9 * DOLLAR2RMB),
        expiry: '2025-01-07',
        type: '效率',
        extra: '退订',
      },
      {
        name: '多邻国',
        yearly: 588,
        expiry: '2026-12-04',
        type: '娱乐',
        extra: '续订 12/4 Apple 付款',
      },
      {
        name: 'Apple Music',
        yearly: 17 * 12,
        expiry: '2030-01-01',
        type: '娱乐',
        extra: '家庭',
      },
      {
        name: '阿里云盘',
        yearly: 168,
        expiry: '2026-05-11',
        type: '效率',
        extra: '续订 3/12 Apple 付款',
      },
      { name: '胃之书', yearly: 98, expiry: '2025-05-08', type: '效率', extra: '退订' },
      { name: '芒果会员', yearly: 195, expiry: '2025-05-17', type: '效率', extra: '退订' },
      { name: 'FoodCare', yearly: 28, expiry: '2024-08-01', type: '娱乐', extra: '退订' },
      { name: '知乎盐选', yearly: 198, expiry: '2024-06-21', type: '娱乐', extra: '退订' },
      { name: '微博 SVIP', yearly: 262, expiry: '2025-05-27', type: '娱乐' },
      {
        name: 'QQ 音乐',
        yearly: 158,
        expiry: '2026-03-06',
        type: '娱乐',
        extra: '续订 3/6 Apple 付款',
      },
      { name: '网易云音乐', yearly: 158, expiry: '2026-03-18', type: '娱乐' },
      {
        name: '哔哩哔哩超级大会员',
        yearly: 178,
        expiry: '2026-12-19',
        type: '娱乐',
        extra: '续订 7/5 Apple 付款',
      },
    ]
      .map((item: SubscriptionItem) => {
        return {
          ...item,
          monthly: item.monthly ? item.monthly : Number((item.yearly! / 12).toFixed(2)),
          yearly: item.yearly ? item.yearly : item.monthly! * 12,
        }
      })
      .sort((a, b) => daysUntilExpiry(b.expiry) - daysUntilExpiry(a.expiry))
  )

  const calculateTotal = () => {
    let efficiencyTotal = 0
    let entertainmentTotal = 0
    subscriptions
      .filter((item) => daysUntilExpiry(item.expiry) > 0)
      .forEach((sub) => {
        if (sub.type === '效率') {
          efficiencyTotal += parseFloat(String(sub.monthly))
        } else {
          entertainmentTotal += parseFloat(String(sub.monthly))
        }
      })
    return { efficiencyTotal, entertainmentTotal, total: efficiencyTotal + entertainmentTotal }
  }

  const totals = calculateTotal()

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>名称</th>
            <th>套餐</th>
            <th>到期时间</th>
            <th>剩余天数</th>
            <th>类型</th>
            <th>备注</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((sub, index) => (
            <tr className={daysUntilExpiry(sub.expiry) > 0 ? `` : `line-through`} key={index}>
              <td>{sub.name}</td>
              <td>
                ￥{sub.yearly} / 年 (￥{sub.monthly} / 月)
              </td>
              <td>{sub.expiry}</td>
              <td>{daysUntilExpiry(sub.expiry)}</td>
              <td>{sub.type}</td>
              <td>{sub.extra}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p>效率总计：¥{totals.efficiencyTotal.toFixed(2)}/月</p>
        <p>娱乐总计：¥{totals.entertainmentTotal.toFixed(2)}/月</p>
        <p>总计：¥{totals.total.toFixed(2)}/月</p>
      </div>
    </div>
  )
}
