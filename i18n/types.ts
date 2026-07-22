import zhCN from '../messages/zh-CN.json'

export type Locale = 'zh-CN' | 'en'
export type TranslationValues = Record<string, string | number | Date>

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends string ? K : `${K}.${NestedKeyOf<T[K]>}`
    }[keyof T & string]
  : never

export type TranslationKey = NestedKeyOf<typeof zhCN>
