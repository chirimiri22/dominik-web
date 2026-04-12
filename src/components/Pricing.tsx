import React, {useMemo, useState} from 'react'
import {useI18n} from '../i18n'
import BookingDetails from './BookingDetails'

type ServiceDetail = {
    title: string
    paragraphs: string[]
}

type Tier = {
    id: string
    title: string
    shortTitle: string
    duration: string
    price: number
    advantage: string
}

const Pricing: React.FC = () => {
    const {t} = useI18n()
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

    const tiers = useMemo(
        () => [
            {
                id: 'basic',
                title: String(t('pricing.tiers.basic.title')),
                shortTitle: String(t('pricing.tiers.basic.shortTitle')),
                duration: String(t('pricing.tiers.basic.duration')),
                price: Number(t('pricing.tiers.basic.price')),
                advantage: String(t('pricing.tiers.basic.advantage')),
            },
            {
                id: 'pro',
                title: String(t('pricing.tiers.pro.title')),
                shortTitle: String(t('pricing.tiers.pro.shortTitle')),
                duration: String(t('pricing.tiers.pro.duration')),
                price: Number(t('pricing.tiers.pro.price')),
                advantage: String(t('pricing.tiers.pro.advantage')),
            },
        ] satisfies Tier[],
        [t],
    )

    const confirmations = (t('pricing.tiers.form.confirmations') as string[]) || []
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [confirmChecked, setConfirmChecked] = useState<Record<number, boolean>>({})

    return (
        <section id="pricing" className="py-24 bg-sand-50 scroll-mt-24">
            <div className="px-6 sm:px-8 lg:px-12 max-w-screen-xl mx-auto">
                <div className="max-w-2xl mb-10">
                    <h2 className="text-4xl sm:text-5xl font-semibold mb-3 text-ink">{t('pricing.title')}</h2>
                    <p className="text-ink/70 leading-relaxed">{t('pricing.subtitle')}</p>
                </div>

                {services.length > 0 && (
                    <div className="mb-8">
                        <p className="mb-4 text-2xl font-semibold text-clay-600">{t('pricing.servicesSubtitle')}</p>
                        <div className="grid gap-5 md:grid-cols-2">
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
                    </div>
                )}

                <p className="mb-4 text-2xl font-semibold text-clay-600">{t('pricing.variantsSubtitle')}</p>

                <div className="grid gap-4 sm:grid-cols-2">
                    {tiers.map((tier) => (
                        <article
                            key={tier.id}
                            className="rounded-[1.5rem] border border-sand-200 bg-white p-5 shadow-soft"
                        >
                            {/*<p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay-600">{tier.shortTitle}</p>*/}
                            <h3 className="mt-2 text-lg font-semibold text-ink">{tier.title}</h3>
                            <div className="mt-3 flex items-baseline gap-2">
                                <p className="text-2xl  font-semibold text-ink/70">{tier.duration}</p>
                                <span className="text-2xl text-ink/50">/</span>
                                <p className="text-2xl font-semibold text-clay-600">{tier.price} Kč</p>
                            </div>
                            <p className="mt-3 text-sm text-ink/70">{tier.advantage}</p>
                        </article>
                    ))}
                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        type="button"
                        className="rounded-full bg-clay-500 px-9 py-4 text-lg font-semibold text-white shadow-soft transition-colors hover:bg-clay-600"
                        onClick={() => setIsExpanded((prev) => !prev)}
                        aria-expanded={isExpanded}
                        aria-controls="booking-details"
                    >
                        {isExpanded ? t('booking.hideTerm') : t('intro.cta')}
                    </button>
                </div>

                <BookingDetails
                    isExpanded={isExpanded}
                    confirmations={confirmations}
                    confirmChecked={confirmChecked}
                    onToggleConfirmation={(index) =>
                        setConfirmChecked((prev) => ({...prev, [index]: !prev[index]}))
                    }
                />
            </div>
        </section>
    )
}

export default Pricing
