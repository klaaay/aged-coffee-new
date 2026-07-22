import type { NextRequest } from 'next/server'
import { subscriptions } from '@/data/subscriptions'
import {
  getDaysUntilExpiry,
  getExpiringSubscriptions,
  SUBSCRIPTION_TIME_ZONE,
} from '@/utils/subscriptions'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const EXPIRY_WARNING_DAYS = 30

interface TelegramResponse {
  ok: boolean
  description?: string
}

function formatReminderMessage(now: Date) {
  const expiring = getExpiringSubscriptions(subscriptions, EXPIRY_WARNING_DAYS, now)
  if (!expiring.length) return null

  const date = new Intl.DateTimeFormat('zh-CN', {
    timeZone: SUBSCRIPTION_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
  const items = expiring.map((item) => {
    const days = getDaysUntilExpiry(item.expiry, now)
    const remaining = days === 0 ? '今天到期' : `剩余 ${days} 天`
    return `• ${item.name}：${item.expiry}（${remaining}，¥${item.yearly}/年）`
  })

  return [
    `🔔 订阅到期提醒 · ${date}`,
    '',
    `未来 30 天内有 ${expiring.length} 项订阅即将到期：`,
    ...items,
  ].join('\n')
}

async function sendTelegramMessage(token: string, chatId: string, text: string) {
  let response: Response
  try {
    response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
      cache: 'no-store',
    })
  } catch {
    throw new Error('无法连接 Telegram Bot API')
  }

  const result = (await response.json()) as TelegramResponse
  if (!response.ok || !result.ok) {
    throw new Error(result.description || 'Telegram 消息发送失败')
  }
}

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret || request.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const token = process.env.TG_TOKEN
  const chatId = process.env.TG_CHAT_ID
  if (!token || !chatId) {
    return Response.json(
      { success: false, error: 'TG_TOKEN 或 TG_CHAT_ID 未配置' },
      { status: 500 }
    )
  }

  const message = formatReminderMessage(new Date())
  if (!message) {
    return Response.json({ success: true, sent: false, count: 0 })
  }

  try {
    await sendTelegramMessage(token, chatId, message)
    return Response.json({
      success: true,
      sent: true,
      count: getExpiringSubscriptions(subscriptions, EXPIRY_WARNING_DAYS).length,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Telegram 消息发送失败'
    return Response.json({ success: false, error: message }, { status: 502 })
  }
}
