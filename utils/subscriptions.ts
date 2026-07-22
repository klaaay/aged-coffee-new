import type { SubscriptionItem } from '@/data/subscriptions'

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000
export const SUBSCRIPTION_TIME_ZONE = 'Asia/Shanghai'

function dateOnlyToUtc(date: string) {
  const [year, month, day] = date.split('-').map(Number)
  return Date.UTC(year, month - 1, day)
}

function startOfSubscriptionDay(date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: SUBSCRIPTION_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return Date.UTC(Number(values.year), Number(values.month) - 1, Number(values.day))
}

export function getDaysUntilExpiry(expiry: string, now = new Date()) {
  return Math.round((dateOnlyToUtc(expiry) - startOfSubscriptionDay(now)) / MILLISECONDS_PER_DAY)
}

export function isSubscriptionActive(subscription: SubscriptionItem, now = new Date()) {
  return getDaysUntilExpiry(subscription.expiry, now) >= 0
}

export function sortSubscriptions(items: SubscriptionItem[], now = new Date()) {
  return [...items].sort((a, b) => {
    const aDays = getDaysUntilExpiry(a.expiry, now)
    const bDays = getDaysUntilExpiry(b.expiry, now)
    const aActive = aDays >= 0
    const bActive = bDays >= 0

    if (aActive !== bActive) return aActive ? -1 : 1
    return aDays - bDays
  })
}

export function getExpiringSubscriptions(
  items: SubscriptionItem[],
  withinDays = 30,
  now = new Date()
) {
  return sortSubscriptions(
    items.filter((item) => {
      const days = getDaysUntilExpiry(item.expiry, now)
      return days >= 0 && days <= withinDays
    }),
    now
  )
}

export function calculateSubscriptionTotals(items: SubscriptionItem[], now = new Date()) {
  return items.reduce(
    (totals, item) => {
      if (!isSubscriptionActive(item, now)) return totals
      totals[item.category] += item.monthly
      totals.total += item.monthly
      return totals
    },
    { productivity: 0, entertainment: 0, total: 0 }
  )
}
