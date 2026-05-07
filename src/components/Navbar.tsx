import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n'
import LogoCircle from './LogoCircle'

type NavLink = {
  id: string
  label: string
}

const Navbar = (): JSX.Element => {
  const { t, locale, setLocale } = useI18n()
  const navigate = useNavigate()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const links: NavLink[] = [
    { id: 'intro', label: String(t('nav.intro')) },
    { id: 'description', label: String(t('nav.description')) },
      { id: 'gallery', label: String(t('nav.gallery')) },
      { id: 'pricing', label: String(t('nav.pricing')) },
    { id: 'contact', label: String(t('nav.contact')) },
    { id: 'faq', label: String(t('nav.faq')) },
    { id: 'testimonials', label: String(t('nav.testimonials')) },
  ]

  const switchLocale = (nextLocale: 'cs' | 'en') => {
    const currentPath = location.pathname
    let nextPath = currentPath

    if (nextLocale === 'en' && !currentPath.startsWith('/en')) {
      nextPath = `/en${currentPath === '/' ? '' : currentPath}`
    }

    if (nextLocale === 'cs' && currentPath.startsWith('/en')) {
      nextPath = currentPath.replace(/^\/en/, '') || '/'
    }

    setLocale(nextLocale)

    if (nextPath !== currentPath) {
      navigate({ pathname: nextPath, search: location.search, hash: location.hash })
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-sand-200/80 bg-sand-50/95 backdrop-blur'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-screen-xl px-4 sm:px-8 lg:px-12" aria-label="Section navigation">
        <div className="flex items-center justify-between gap-3 py-3">
          <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto">
            <a href="#intro" className="shrink-0 mr-1" aria-label="Go to intro">
              <LogoCircle isScrolled={isScrolled} />
            </a>
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isScrolled
                    ? 'border border-sand-200 bg-white text-ink/80 hover:border-clay-300 hover:text-clay-600'
                    : 'border border-transparent bg-transparent text-white/95 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div
            className={`inline-flex shrink-0 items-center gap-1 rounded-full p-1 ${
              isScrolled ? 'border border-sand-200 bg-white' : 'border border-white/20 bg-black/25'
            }`}
            aria-label="Language switch"
          >
            <button
              type="button"
              onClick={() => switchLocale('cs')}
              aria-pressed={locale === 'cs'}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
                locale === 'cs'
                  ? 'bg-clay-500 text-white'
                  : isScrolled
                    ? 'text-ink/80 hover:bg-sand-100'
                    : 'text-white/90 hover:bg-white/10'
              }`}
            >
              CZ
            </button>
            <button
              type="button"
              onClick={() => switchLocale('en')}
              aria-pressed={locale === 'en'}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
                locale === 'en'
                  ? 'bg-clay-500 text-white'
                  : isScrolled
                    ? 'text-ink/80 hover:bg-sand-100'
                    : 'text-white/90 hover:bg-white/10'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar





