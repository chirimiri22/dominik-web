import React from 'react'
import {useI18n} from '../i18n'
import {useNavigate} from 'react-router-dom'
import TierSelector from './TierSelector'

type ServiceDetail = {
    title: string
    paragraphs: string[]
}

const Pricing: React.FC = () => {
    const {t, locale} = useI18n()
    const navigate = useNavigate()
    const rawServices = t('pricing.services')
    const services: ServiceDetail[] = Array.isArray(rawServices)
        ? rawServices.filter(
            (item): item is ServiceDetail =>
                Boolean(item) &&
                typeof item.title === 'string' &&
                Array.isArray(item.paragraphs) &&
                item.paragraphs.every((p: unknown) => typeof p === 'string'),
        )
        : []


    return (

            <section id="pricing" className="py-24 bg-sand-50 scroll-mt-24">
                <div className="px-6 sm:px-8 lg:px-12 max-w-screen-xl mx-auto">
                    <div className="max-w-2xl mb-10">
                        <h2 className="text-4xl sm:text-5xl font-semibold mb-3 text-ink">{t('pricing.title')}</h2>
                        <p className="text-ink/70 leading-relaxed">{t('pricing.subtitle')}</p>
                    </div>
                    <div className="rounded-[1.75rem] border border-sand-200 bg-white p-5 sm:p-6 shadow-soft">
                        <TierSelector
                            onTierSelect={(id) =>
                                navigate(`${locale === 'en' ? '/en/booking' : '/booking'}?tier=${encodeURIComponent(id)}`)
                            }
                        />
                    </div>

                    {services.length > 0 && (
                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                            {services.map((service, index) => (
                                <article key={index} className="rounded-[1.5rem] border border-sand-200 bg-white p-6 shadow-soft">
                                    <h3 className="mb-3 text-xl font-semibold text-ink">{service.title}</h3>
                                    <div className="space-y-3 text-ink/75 leading-relaxed">
                                        {service.paragraphs.map((paragraph, paragraphIndex) => (
                                            <p key={paragraphIndex}>{paragraph}</p>
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>



    )
}

export default Pricing
