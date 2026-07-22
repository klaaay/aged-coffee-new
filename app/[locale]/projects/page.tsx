import { genPageMetadata } from 'app/seo'
import ProjectsContent from '@/components/ProjectsContent'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/i18n/types'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  return genPageMetadata({
    title: t('page.projects'),
    description: t('page.projectsDescription'),
    locale,
  })
}

export default function Projects() {
  return <ProjectsContent />
}
