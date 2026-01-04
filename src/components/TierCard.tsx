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
      className={`rounded-lg p-6 relative cursor-pointer transition-transform transform hover:-translate-y-0.5 focus:outline-none border ${selected ? 'ring-2 ring-blue-600 shadow-lg bg-white' : 'bg-gray-50'}`}
    >
      <h3 className="text-lg font-semibold mb-1">{tier.title}</h3>

      <div className="flex items-center text-gray-600 mb-4">
        <ClockIcon className="w-4 h-4 mr-2" aria-hidden />
        <span>{t(`pricing.tiers.${tier.id}.duration`)}</span>
      </div>

      <p className="text-2xl font-bold">{formatPrice(tier.priceValue)}</p>

      <button className={`px-4 py-2 rounded absolute bottom-4 right-4 text-white ${selected ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
        {t('pricing.tiers.button')}
      </button>
    </div>
  )
}

export default TierCard
