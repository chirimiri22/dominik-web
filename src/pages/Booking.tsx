import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import TierSelector from '../components/TierSelector'
import { useI18n } from '../i18n'

const Booking: React.FC = () => {
  const { t } = useI18n()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const isEnglishPath = location.pathname.startsWith('/en')
  const initialTier = searchParams.get('tier') || null
  const [selectedTier, setSelectedTier] = useState<string | null>(initialTier)

  useEffect(() => {
    setSelectedTier(initialTier)
  }, [initialTier])

  const confirmations = (t('pricing.tiers.form.confirmations') as string[]) || []
  const [confirmChecked, setConfirmChecked] = useState<Record<number, boolean>>({})
  const [confirmError, setConfirmError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState<boolean | null>(null)

  const selectedTierTitle = selectedTier ? String(t(`pricing.tiers.${selectedTier}.title`)) : ''

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

          <div className="rounded-[1.75rem] border border-sand-200 bg-white p-5 sm:p-6 shadow-soft">
            <TierSelector
              onTierSelect={(id) => {
                setSelectedTier(id)
                setSearchParams({ tier: id }, { replace: true })
              }}
              selectedId={selectedTier}
            />
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
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

              {confirmError && (
                <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {confirmError}
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  className="rounded-full bg-clay-500 px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-clay-600"
                  onClick={() => {
                    const allConfirmed = confirmations.every((_, index) => !!confirmChecked[index])
                    if (!allConfirmed) {
                      setConfirmError(t('pricing.tiers.form.confirmError'))
                      setSubmitted(false)
                      return
                    }
                    setSubmitted(true)
                    setConfirmError(null)
                  }}
                >
                  {t('pricing.tiers.form.continue')}
                </button>
              </div>
            </div>

            <aside className="rounded-[1.75rem] border border-sand-200 bg-sand-50 p-6 sm:p-8 shadow-soft">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-clay-600 mb-3">{t('pricing.title')}</p>
              <div className="rounded-2xl bg-white p-5 border border-sand-200">
                <p className="text-sm text-ink/60 mb-1">{t('pricing.tiers.button')}</p>
                <p className="text-2xl font-semibold text-ink">{selectedTierTitle || '—'}</p>
                <p className="mt-3 text-sm text-ink/70">
                  {selectedTier ? t(`pricing.tiers.${selectedTier}.duration`) : t('pricing.subtitle')}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {!confirmError && submitted && (
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="rounded-[1.75rem] border border-sand-200 bg-sand-50 p-4 sm:p-5 shadow-soft">
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3jVXa5mF3DcHAY8xSSwr0iZjr9Rdvc5-MuxGIuWvyEzyqOiA4K4e9-0y_S4UoxNaMnteascoE9?gv=true"
                width="100%"
                height="600"
                title={t('booking.title')}
                className="rounded-[1.25rem] border border-sand-200 bg-white"
              />
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

export default Booking

