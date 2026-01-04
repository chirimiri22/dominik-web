import TierCard from './TierCard'
import { useI18n } from '../i18n'

type Props = {
  onTierSelect: (id: string) => void
  selectedId?: string | null
}

const TierSelector = ({ onTierSelect, selectedId = null }: Props): JSX.Element => {
  const { t } = useI18n()

  //   TODO rename tiers
  const tiers = [
    { id: 'basic', title: t('pricing.tiers.basic.title') as string, priceValue: t('pricing.tiers.basic.price') as number || 1000 },
    { id: 'pro', title: t('pricing.tiers.pro.title') as string, priceValue: t('pricing.tiers.pro.price') as number || 1400 },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {tiers.map(tier => (
        <TierCard key={tier.id} tier={tier} onSelect={onTierSelect} selected={selectedId === tier.id} />
      ))}
    </div>
  )
}

export default TierSelector
