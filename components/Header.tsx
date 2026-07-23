'use client'

import siteMetadata from '@/data/siteMetadata'
import Logo from '@/data/logo.svg'
import Link from './Link'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import LanguageSwitch from './LanguageSwitch'

const Header = () => {
  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle} className="shrink-0">
        <div className="flex items-center justify-between">
          <div className="mr-3">
            <Logo />
          </div>
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="hidden h-6 text-2xl font-semibold sm:block">
              {siteMetadata.headerTitle}
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
      <div className="ml-4 flex min-w-0 flex-1 items-center justify-end gap-x-4 leading-5 sm:-mr-6 sm:ml-6 sm:gap-x-6">
        <DesktopNav />
        <div className="flex shrink-0 items-center gap-x-4 sm:gap-x-6">
          <SearchButton />
          <LanguageSwitch />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
