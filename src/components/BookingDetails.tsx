import React from 'react'
import { useI18n } from '../i18n'

type BookingDetailsProps = {
  isExpanded: boolean
  confirmations: string[]
  confirmChecked: Record<number, boolean>
  onToggleConfirmation: (index: number) => void
}

const BookingDetails: React.FC<BookingDetailsProps> = ({
  isExpanded,
  confirmations,
  confirmChecked,
  onToggleConfirmation,
}) => {
  const { t } = useI18n()

  return (
    <div
      id="booking-details"
      className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[2000px] pt-8' : 'max-h-0'}`}
    >
      <div className="rounded-[1.75rem] border border-sand-200 bg-white p-6 sm:p-8 shadow-soft">
        <div className="max-w-2xl mb-6">
          <p className="uppercase tracking-[0.22em] text-xs font-semibold text-clay-600 mb-2">{t('booking.checkTitle')}</p>
          <h3 className="text-2xl sm:text-3xl font-semibold mb-3 text-ink">{t('booking.checkTitle')}</h3>
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
                onChange={() => onToggleConfirmation(index)}
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
  )
}

export default BookingDetails

