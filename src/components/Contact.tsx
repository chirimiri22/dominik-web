import { useI18n } from '../i18n'
import { AtSymbolIcon, PhoneIcon } from '@heroicons/react/24/solid'

const Contact: React.FC = () => {
  const { t } = useI18n()
  const email = 'pokor.domo@seznam.com'
  const phone = '+420 731 345 567'

  return (
    <section id="contact" className="py-24 bg-white ">
      <div className="px-6 sm:px-8 lg:px-12 max-w-screen-xl mx-auto">
        <div className="max-w-2xl mb-10">
          <h2 className="text-4xl sm:text-5xl font-semibold mb-3 text-ink">{t('contact.title')}</h2>
          <p className="text-ink/70 leading-relaxed">{t('contact.text')}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <a className="group flex items-center gap-4 rounded-[1.5rem] border border-sand-200 bg-sand-50 p-5 shadow-soft transition-all hover:-translate-y-1 hover:border-clay-300" href={`mailto:${email}`}>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-clay-500/10 text-clay-600">
              <AtSymbolIcon className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <div className="text-sm font-medium text-ink/60">{t('contact.emailLabel')}</div>
              <span className="font-semibold text-ink group-hover:text-clay-600">{email}</span>
            </div>
          </a>

          <a className="group flex items-center gap-4 rounded-[1.5rem] border border-sand-200 bg-sand-50 p-5 shadow-soft transition-all hover:-translate-y-1 hover:border-clay-300" href={`tel:${phone}`}>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-clay-500/10 text-clay-600">
              <PhoneIcon className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <div className="text-sm font-medium text-ink/60">{t('contact.phoneLabel')}</div>
              <span className="font-semibold text-ink group-hover:text-clay-600">{phone}</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
