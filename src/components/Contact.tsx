import { useI18n } from '../i18n'
import { AtSymbolIcon, PhoneIcon } from '@heroicons/react/24/solid'

const Contact: React.FC = () => {
  const { t } = useI18n()
  const email = 'hello@example.com'
  const phone = '+420 123 456 789'

  return (
    <section className="py-16 bg-white">
      <div className="px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">{t('contact.title')}</h2>
        <p className="text-lg text-gray-700 mb-6">{t('contact.text')}</p>

        <div className="flex flex-col gap-4 ">
          <a className="text-blue-600 hover:underline flex items-center gap-3" href={`mailto:${email}`}>
            <AtSymbolIcon className="w-6 h-6 text-blue-600" aria-hidden />
            <span className="font-medium">{email}</span>
          </a>

          <a className="text-blue-600 hover:underline flex items-center gap-3" href={`tel:${phone}`}>
            <PhoneIcon className="w-6 h-6 text-blue-600" aria-hidden />
            <span className="font-medium">{phone}</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact

