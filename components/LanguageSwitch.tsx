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
      className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center justify-center text-gray-900 disabled:opacity-50 dark:text-gray-100"
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 21l5.25-11.25L21 21m-9.75-3h9M3 5.25h6m-3-1.5v1.5m2.25 0c0 4.142-2.507 7.5-5.625 7.5M3 12.75c1.836 0 3.5-.69 4.713-1.805M3.75 5.25c0 2.036 1.136 3.82 2.842 4.773"
        />
      </svg>
    </button>
  )
}
