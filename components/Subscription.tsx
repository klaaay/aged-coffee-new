'use client'

import { Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { subscriptions, type SubscriptionItem } from '@/data/subscriptions'
import {
  calculateSubscriptionTotals,
  getDaysUntilExpiry,
  getExpiringSubscriptions,
  sortSubscriptions,
} from '@/utils/subscriptions'
import { useTranslation } from './LanguageProvider'

const EXPIRY_WARNING_DAYS = 30

export const Subscription = () => {
  const { t } = useTranslation()
  const now = new Date()
  const sortedSubscriptions = sortSubscriptions(subscriptions, now)
  const expiringSubscriptions = getExpiringSubscriptions(subscriptions, EXPIRY_WARNING_DAYS, now)
  const totals = calculateSubscriptionTotals(subscriptions, now)

  const columns: ColumnsType<SubscriptionItem> = [
    { title: t('subscription.name'), dataIndex: 'name', key: 'name', fixed: 'left', width: 160 },
    {
      title: t('subscription.plan'),
      key: 'plan',
      render: (_, record) =>
        t('subscription.yearMonth', { yearly: record.yearly, monthly: record.monthly }),
    },
    { title: t('subscription.expiry'), dataIndex: 'expiry', key: 'expiry' },
    {
      title: t('subscription.daysLeft'),
      key: 'daysLeft',
      render: (_, record) => {
        const days = getDaysUntilExpiry(record.expiry, now)
        if (days < 0) return <Tag>{t('subscription.expired')}</Tag>
        if (days === 0) return <Tag color="red">{t('subscription.expiresToday')}</Tag>
        return (
          <Tag color={days <= EXPIRY_WARNING_DAYS ? 'orange' : 'green'}>
            {t('subscription.days', { days })}
          </Tag>
        )
      },
    },
    {
      title: t('subscription.type'),
      key: 'category',
      render: (_, record) => t(`subscription.category.${record.category}`),
    },
    { title: t('subscription.notes'), dataIndex: 'extra', key: 'extra' },
  ]

  return (
    <div className="space-y-6">
      <section
        className={`rounded-lg border p-4 ${
          expiringSubscriptions.length
            ? 'border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-100'
            : 'border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-100'
        }`}
      >
        <h2 className="font-semibold">{t('subscription.monitoringTitle')}</h2>
        <p className="mt-1 text-sm opacity-80">{t('subscription.monitoringDescription')}</p>
        {expiringSubscriptions.length ? (
          <ul className="mt-3 space-y-1 text-sm">
            {expiringSubscriptions.map((item) => (
              <li key={`${item.name}-${item.expiry}`}>
                {t('subscription.expiringItem', {
                  name: item.name,
                  date: item.expiry,
                  days: getDaysUntilExpiry(item.expiry, now),
                })}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm">{t('subscription.noUpcomingExpiry')}</p>
        )}
      </section>

      <Table<SubscriptionItem>
        columns={columns}
        dataSource={sortedSubscriptions}
        rowKey={(record) => `${record.name}-${record.expiry}`}
        pagination={false}
        scroll={{ x: 'max-content' }}
        rowClassName={(record) =>
          getDaysUntilExpiry(record.expiry, now) >= 0 ? '' : 'line-through opacity-60'
        }
      />

      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
        <p>{t('subscription.efficiencyTotal', { total: totals.productivity.toFixed(2) })}</p>
        <p>
          {t('subscription.entertainmentTotal', {
            total: totals.entertainment.toFixed(2),
          })}
        </p>
        <p className="font-semibold text-gray-900 dark:text-gray-100">
          {t('subscription.total', { total: totals.total.toFixed(2) })}
        </p>
      </div>
    </div>
  )
}
