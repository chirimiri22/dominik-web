import { useI18n } from '../i18n'

type Props = {
  className?: string
}

const LocaleSwitcher = ({ className = '' }: Props): JSX.Element => {
  const { locale, setLocale } = useI18n()

  return (
    <div className={className}>
      <button
        onClick={() => setLocale('cs')}
        aria-pressed={locale === 'cs'}
        className={`px-3 py-1 rounded text-sm font-medium ${locale === 'cs' ? 'bg-white text-gray-900' : 'bg-white/30 text-white hover:bg-white/50'}`}
      >
        CZ
      </button>
      <button
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        className={`px-3 py-1 rounded text-sm font-medium ${locale === 'en' ? 'bg-white text-gray-900' : 'bg-white/30 text-white hover:bg-white/50'}`}
      >
        EN
      </button>
    </div>
  )
}

export default LocaleSwitcher
