import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayout'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/i18n/types'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  return genPageMetadata({
    title: t('page.life'),
    description: t('page.lifeDescription'),
    locale,
  })
}

export default async function LifePage() {
  const posts = allCoreContent(
    sortPosts(
      allBlogs.filter((post) => post.slug.startsWith('life/') && post.slug.split('/').length === 2)
    )
  )

  return <ListLayout posts={posts} title="生活" titleKey="page.life" />
}
