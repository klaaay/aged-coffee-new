import type { TranslationKey } from '@/i18n/types'

const headerNavLinks: { href: string; titleKey: TranslationKey }[] = [
  { href: '/blog', titleKey: 'nav.blog' },
  { href: '/tags', titleKey: 'nav.tags' },
  { href: '/life', titleKey: 'nav.life' },
  { href: '/subscriptions', titleKey: 'nav.subscriptions' },
  // { href: '/projects', title: 'Projects' },
  { href: '/blog/resources-save/tech-manual', titleKey: 'nav.manual' },
  // { href: '/blog/resources-save/tech-note', title: '笔记' },
  { href: '/blog/resources-save/tools-collection', titleKey: 'nav.tools' },
  // { href: '/blog/photo-gallery/photos', title: '相册簿' },
  { href: '/blog/resources-save/ai', titleKey: 'nav.ai' },
  { href: '/about', titleKey: 'nav.about' },
]

export default headerNavLinks
