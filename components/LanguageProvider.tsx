'use client'

import { useLocale, useTranslations } from 'next-intl'
import type { Locale, TranslationKey, TranslationValues } from '@/i18n/types'

export function useTranslation() {
  const locale = useLocale() as Locale
  const translate = useTranslations() as unknown as (
    key: TranslationKey,
    values?: TranslationValues
  ) => string

  return {
    locale,
    dateLocale: locale === 'zh-CN' ? 'zh-CN' : 'en-US',
    t: translate,
  }
}
