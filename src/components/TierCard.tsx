import { ClockIcon } from '@heroicons/react/24/outline'
import { useI18n } from '../i18n'
import React from 'react'

type Tier = {
  id: string
  title: string
  priceValue: number
  features?: string[]
}

type Props = {
  tier: Tier
  onSelect: (id: string) => void
  selected?: boolean
}

const TierCard = ({ tier, onSelect, selected = false }: Props): JSX.Element => {
  const { t, formatPrice } = useI18n()

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(tier.id)
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(tier.id)}
      onKeyDown={handleKey}
      aria-pressed={selected}
      className={`rounded-[1.5rem] p-6 cursor-pointer transition-all duration-200 focus:outline-none border ${selected ? 'ring-2 ring-clay-500 border-clay-500 shadow-soft bg-sand-50 -translate-y-1' : 'bg-white border-sand-200 hover:border-clay-300 hover:-translate-y-1 hover:shadow-soft'}`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-xl font-semibold text-ink">{tier.title}</h3>
        {selected && <span className="rounded-full bg-clay-500 px-3 py-1 text-xs font-semibold text-white">{t('pricing.tiers.selected')}</span>}
      </div>

      <div className="flex items-center text-ink/70 mb-4">
        <ClockIcon className="w-4 h-4 mr-2 text-clay-500" aria-hidden />
        <span>{t(`pricing.tiers.${tier.id}.duration`)}</span>
      </div>

      <p className="text-3xl font-semibold text-clay-600 mb-6">{formatPrice(tier.priceValue)}</p>

      <button className={`w-full px-5 py-3 rounded-full text-white font-semibold transition-colors ${selected ? 'bg-olive-500 hover:bg-olive-600' : 'bg-clay-500 hover:bg-clay-600'}`}>
        {t('pricing.tiers.button')}
      </button>
    </div>
  )
}

export default TierCard
