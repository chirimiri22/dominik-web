import React, { useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useI18n } from '../i18n'

const Booking: React.FC = () => {
  const { t } = useI18n()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const isEnglishPath = location.pathname.startsWith('/en')
  const selectedTier = searchParams.get('tier') || null
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const confirmations = (t('pricing.tiers.form.confirmations') as string[]) || []
  const [confirmChecked, setConfirmChecked] = useState<Record<number, boolean>>({})

  const tiers = useMemo(
    () => [
      {
        id: 'basic',
        title: String(t('pricing.tiers.basic.title')),
        duration: String(t('pricing.tiers.basic.duration')),
        price: Number(t('pricing.tiers.basic.price')),
      },
      {
        id: 'pro',
        title: String(t('pricing.tiers.pro.title')),
        duration: String(t('pricing.tiers.pro.duration')),
        price: Number(t('pricing.tiers.pro.price')),
      },
    ],
    [t],
  )

  return (
    <main className="min-h-screen bg-sand-50 text-ink">
      <section className="py-16 sm:py-20">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
          <button
            className="mb-6 inline-flex items-center text-sm font-medium text-clay-600 transition-colors hover:text-clay-700"
            onClick={() => navigate(isEnglishPath ? '/en' : '/')}
          >
            ← {t('booking.back')}
          </button>

          <div className="max-w-2xl mb-8">
            <p className="uppercase tracking-[0.22em] text-xs font-semibold text-clay-600 mb-2">{t('booking.title')}</p>
            <h1 className="text-3xl sm:text-4xl font-semibold mb-3 text-ink">{t('booking.title')}</h1>
            <p className="text-ink/70 leading-relaxed">{t('booking.infoParagraph')}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {tiers.map((tier) => {
              const isSelected = selectedTier === tier.id
              return (
                <article
                  key={tier.id}
                  className={`rounded-[1.5rem] border bg-white p-5 shadow-soft ${
                    isSelected ? 'border-clay-500 ring-2 ring-clay-200' : 'border-sand-200'
                  }`}
                >
                  <h3 className="text-lg font-semibold text-ink">{tier.title}</h3>
                  <p className="mt-1 text-sm text-ink/70">{tier.duration}</p>
                  <p className="mt-3 text-2xl font-semibold text-clay-600">{tier.price} Kč</p>
                </article>
              )
            })}
          </div>

          <div className="mt-8">
            <button
              type="button"
              className="rounded-full bg-clay-500 px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-clay-600"
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-expanded={isExpanded}
              aria-controls="booking-details"
            >
              {isExpanded ? t('booking.hideTerm') : t('intro.cta')}
            </button>
          </div>
        </div>
      </section>

      <section
        id="booking-details"
        className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[2000px] pb-16 sm:pb-20' : 'max-h-0'}`}
      >
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="rounded-[1.75rem] border border-sand-200 bg-white p-6 sm:p-8 shadow-soft">
            <div className="max-w-2xl mb-6">
              <p className="uppercase tracking-[0.22em] text-xs font-semibold text-clay-600 mb-2">{t('booking.checkTitle')}</p>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-ink">{t('booking.checkTitle')}</h2>
              <p className="text-ink/70 leading-relaxed">{t('booking.confirmationIntro')}</p>
            </div>

            <div className="space-y-3 rounded-[1.25rem] bg-sand-50 p-4 border border-sand-200">
              {confirmations.map((confirmation, index) => (
                <label
                  key={index}
                  className="flex items-start gap-3 rounded-xl border border-sand-200 bg-white px-4 py-3"
                >
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-sand-300 text-clay-600 focus:ring-clay-500"
                    checked={!!confirmChecked[index]}
                    onChange={() => setConfirmChecked((prev) => ({ ...prev, [index]: !prev[index] }))}
                  />
                  <span className="text-sm sm:text-base text-ink/80">{confirmation}</span>
                </label>
              ))}
            </div>

            <div className="mt-6 rounded-[1.75rem] border border-sand-200 bg-sand-50 p-4 sm:p-5 shadow-soft">
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3jVXa5mF3DcHAY8xSSwr0iZjr9Rdvc5-MuxGIuWvyEzyqOiA4K4e9-0y_S4UoxNaMnteascoE9?gv=true"
                width="100%"
                height="600"
                title={t('booking.title')}
                className="rounded-[1.25rem] border border-sand-200 bg-white"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Booking

