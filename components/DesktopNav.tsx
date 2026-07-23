'use client'

import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import { useTranslation } from './LanguageProvider'

const NAV_GAP = 16
const desktopNavLinks = headerNavLinks.filter((link) => link.href !== '/')

const navLinkClassName =
  'hover:text-primary-500 dark:hover:text-primary-400 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100'

const MoreIcon = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6"
  >
    <path d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm6 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm6 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
)

export default function DesktopNav() {
  const { locale, t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const measureItemRefs = useRef<(HTMLSpanElement | null)[]>([])
  const measureMoreRef = useRef<HTMLButtonElement>(null)
  const [visibleCount, setVisibleCount] = useState(desktopNavLinks.length)

  const calculateVisibleCount = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0
    const itemWidths = measureItemRefs.current.map(
      (item) => item?.getBoundingClientRect().width ?? 0
    )
    const moreWidth = measureMoreRef.current?.getBoundingClientRect().width ?? 0

    if (!containerWidth || itemWidths.some((width) => width === 0) || !moreWidth) return

    const fullWidth =
      itemWidths.reduce((total, width) => total + width, 0) +
      NAV_GAP * Math.max(itemWidths.length - 1, 0)

    if (fullWidth <= containerWidth) {
      setVisibleCount(desktopNavLinks.length)
      return
    }

    let usedWidth = moreWidth
    let nextVisibleCount = 0

    for (let index = 0; index < itemWidths.length - 1; index += 1) {
      const nextWidth = usedWidth + NAV_GAP + itemWidths[index]
      if (nextWidth > containerWidth) break
      usedWidth = nextWidth
      nextVisibleCount += 1
    }

    setVisibleCount(nextVisibleCount)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationFrame = 0
    const scheduleCalculation = () => {
      cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(calculateVisibleCount)
    }

    scheduleCalculation()
    const resizeObserver = new ResizeObserver(scheduleCalculation)
    resizeObserver.observe(container)

    return () => {
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
    }
  }, [calculateVisibleCount, locale])

  const visibleLinks = desktopNavLinks.slice(0, visibleCount)
  const overflowLinks = desktopNavLinks.slice(visibleCount)

  return (
    <div ref={containerRef} className="relative hidden min-w-0 flex-1 sm:block">
      <nav className="flex items-center justify-end gap-x-4" aria-label={t('menu.desktop')}>
        {visibleLinks.map((link) => (
          <Link key={link.titleKey} href={link.href} className={navLinkClassName}>
            {t(link.titleKey)}
          </Link>
        ))}

        {overflowLinks.length > 0 && (
          <Menu as="div" className="relative flex shrink-0 items-center">
            <MenuButton
              aria-label={t('menu.more')}
              title={t('menu.more')}
              className="hover:text-primary-500 dark:hover:text-primary-400 flex h-6 w-6 items-center justify-center text-gray-900 dark:text-gray-100"
            >
              <MoreIcon />
            </MenuButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute top-full right-0 z-50 mt-3 w-44 origin-top-right rounded-md bg-white p-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden dark:bg-gray-800 dark:ring-white/10">
                {overflowLinks.map((link) => (
                  <MenuItem key={link.titleKey}>
                    {({ focus }) => (
                      <Link
                        href={link.href}
                        className={`block rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap ${
                          focus ? 'bg-primary-600 text-white' : 'text-gray-900 dark:text-gray-100'
                        }`}
                      >
                        {t(link.titleKey)}
                      </Link>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Transition>
          </Menu>
        )}
      </nav>

      <div
        aria-hidden="true"
        className="pointer-events-none invisible absolute top-0 left-0 flex w-max items-center gap-x-4"
      >
        {desktopNavLinks.map((link, index) => (
          <span
            key={link.titleKey}
            ref={(node) => {
              measureItemRefs.current[index] = node
            }}
          >
            <Link href={link.href} className={navLinkClassName} tabIndex={-1}>
              {t(link.titleKey)}
            </Link>
          </span>
        ))}
        <button
          ref={measureMoreRef}
          type="button"
          className="flex h-6 w-6 items-center justify-center"
          tabIndex={-1}
        >
          <MoreIcon />
        </button>
      </div>
    </div>
  )
}
