'use client'

import { useTransition } from 'react'
import { usePathname, useRouter } from '@/i18n/navigation'
import type { Locale } from '@/i18n/types'
import { useTranslation } from './LanguageProvider'

export default function LanguageSwitch() {
  const { locale, t } = useTranslation()
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const nextLocale: Locale = locale === 'zh-CN' ? 'en' : 'zh-CN'
  const label = locale === 'zh-CN' ? t('language.switchToEnglish') : t('language.switchToChinese')

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        startTransition(() => router.replace(pathname, { locale: nextLocale }))
      }}
      aria-label={label}
      title={label}
      className="hover:text-primary-500 dark:hover:text-primary-400 flex h-7 min-w-7 items-center justify-center rounded px-1 text-xs font-semibold text-gray-900 disabled:opacity-50 dark:text-gray-100"
    >
      {locale === 'zh-CN' ? 'EN' : '中'}
    </button>
  )
}
