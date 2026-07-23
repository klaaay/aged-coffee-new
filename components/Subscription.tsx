'use client'

import { Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { subscriptions, type SubscriptionItem } from '@/data/subscriptions'
import {
  calculateSubscriptionTotals,
  getDaysUntilExpiry,
  sortSubscriptions,
} from '@/utils/subscriptions'
import { useTranslation } from './LanguageProvider'

const EXPIRY_WARNING_DAYS = 30

export const Subscription = () => {
  const { t } = useTranslation()
  const now = new Date()
  const sortedSubscriptions = sortSubscriptions(subscriptions, now)
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
