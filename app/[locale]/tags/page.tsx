import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import TagsPageContent from '@/components/TagsPageContent'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/i18n/types'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  return genPageMetadata({
    title: t('page.tags'),
    description: t('page.tagsDescription'),
    locale,
  })
}

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  return <TagsPageContent tagCounts={tagCounts} />
}
