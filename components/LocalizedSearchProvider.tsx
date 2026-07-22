'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Command } from 'cmdk'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'
import { useRouter } from '@/i18n/navigation'
import { useTranslation } from './LanguageProvider'

interface SearchDocument {
  path: string
  title: string
  summary?: string
  date: string
}

interface SearchAction extends SearchDocument {
  subtitle: string
}

const LocalSearchContext = createContext<{ openSearch: () => void }>({
  openSearch: () => undefined,
})

export function useLocalSearch() {
  return useContext(LocalSearchContext)
}

function isSearchDocument(value: unknown): value is SearchDocument {
  if (!value || typeof value !== 'object') return false
  const document = value as Record<string, unknown>
  return (
    typeof document.path === 'string' &&
    typeof document.title === 'string' &&
    typeof document.date === 'string'
  )
}

function LocalSearchProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { dateLocale, t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [actions, setActions] = useState<SearchAction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const searchDocumentsPath =
    siteMetadata.search?.provider === 'kbar'
      ? siteMetadata.search.kbarConfig?.searchDocumentsPath
      : undefined

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    let cancelled = false

    async function loadSearchDocuments() {
      if (!searchDocumentsPath) {
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      const url = searchDocumentsPath.includes('://')
        ? searchDocumentsPath
        : new URL(searchDocumentsPath, window.location.origin).toString()
      const response = await fetch(url)
      if (!response.ok) throw new Error(`搜索索引加载失败：${response.status}`)

      const data: unknown = await response.json()
      if (cancelled || !Array.isArray(data)) return

      setActions(
        data.filter(isSearchDocument).map((post) => ({
          ...post,
          subtitle: formatDate(post.date, dateLocale),
        }))
      )
      setIsLoading(false)
    }

    loadSearchDocuments().catch(() => {
      if (!cancelled) setIsLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [dateLocale, searchDocumentsPath])

  const contextValue = useMemo(() => ({ openSearch: () => setOpen(true) }), [])

  return (
    <LocalSearchContext.Provider value={contextValue}>
      {children}
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label={t('search.open')}
        loop
        overlayClassName="fixed inset-0 z-50 bg-gray-300/50 backdrop-blur dark:bg-black/50"
        contentClassName="fixed top-[18vh] left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-2xl outline-none dark:border-gray-800 dark:bg-gray-900"
      >
        <div className="flex items-center gap-4 border-b border-gray-100 p-4 dark:border-gray-800">
          <svg
            aria-hidden="true"
            className="h-5 w-5 shrink-0 text-gray-400 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <Command.Input
            aria-label={t('search.placeholder')}
            placeholder={t('search.placeholder')}
            className="h-8 w-full bg-transparent text-gray-600 placeholder-gray-400 outline-none dark:text-gray-200 dark:placeholder-gray-500"
          />
          <kbd className="rounded border border-gray-400 px-1.5 text-xs leading-4 font-medium tracking-wide text-gray-400">
            ESC
          </kbd>
        </div>
        <Command.List className="max-h-[55vh] overflow-y-auto p-2">
          {isLoading ? (
            <Command.Loading className="px-4 py-8 text-center text-gray-400 dark:text-gray-600">
              {t('search.loading')}
            </Command.Loading>
          ) : (
            <>
              <Command.Empty className="px-4 py-8 text-center text-gray-400 dark:text-gray-600">
                {t('search.noResults')}
              </Command.Empty>
              <Command.Group
                heading={t('search.content')}
                className="[&_[cmdk-group-heading]]:text-primary-600 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase"
              >
                {actions.map((action) => (
                  <Command.Item
                    key={action.path}
                    value={action.title}
                    keywords={[action.summary || '', action.path]}
                    onSelect={() => {
                      setOpen(false)
                      router.push(`/${action.path}`)
                    }}
                    className="data-[selected=true]:bg-primary-600 flex cursor-pointer flex-col rounded-lg px-3 py-2 text-gray-700 outline-none data-[selected=true]:text-white dark:text-gray-100"
                  >
                    <span className="text-xs opacity-60">{action.subtitle}</span>
                    <span>{action.title}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            </>
          )}
        </Command.List>
      </Command.Dialog>
    </LocalSearchContext.Provider>
  )
}

export default function LocalizedSearchProvider({ children }: { children: React.ReactNode }) {
  if (siteMetadata.search?.provider === 'kbar') {
    return <LocalSearchProvider>{children}</LocalSearchProvider>
  }

  return children
}
