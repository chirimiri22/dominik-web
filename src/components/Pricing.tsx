import React from 'react'
import {useI18n} from '../i18n'
import {useNavigate} from 'react-router-dom'
import TierSelector from './TierSelector'

const Pricing: React.FC = () => {
    const {t} = useI18n()
    const navigate = useNavigate()


    return (

            <section id="pricing" className="py-16 bg-white">
                <div className="px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-6">{t('pricing.title')}</h2>
                    <TierSelector onTierSelect={(id) => navigate(`/booking?tier=${encodeURIComponent(id)}`)} />
                </div>
            </section>



    )
}

export default Pricing
