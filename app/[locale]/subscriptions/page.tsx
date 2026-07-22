import { getTranslations } from 'next-intl/server'
import { genPageMetadata } from 'app/seo'
import SubscriptionsContent from '@/components/SubscriptionsContent'
import type { Locale } from '@/i18n/types'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  return genPageMetadata({
    title: t('page.subscriptions'),
    description: t('page.subscriptionsDescription'),
    locale,
  })
}

export default function SubscriptionsPage() {
  return <SubscriptionsContent />
}
