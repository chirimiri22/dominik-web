import React, {useMemo, useState, useEffect} from 'react'
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
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [showEligibility, setShowEligibility] = useState(false)

    // Responsive check for mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 640px)').matches)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return (
        <section id="pricing" className="py-24 bg-sand-50 ">
            <div className="px-6 sm:px-8 lg:px-12 max-w-screen-xl mx-auto">
                <div className="max-w-2xl mb-10">
                    <h2 className="text-4xl sm:text-5xl font-semibold mb-3 text-ink">{t('pricing.title')}</h2>
                </div>

                {services.length > 0 && (
                    <div className="mb-8">
                        <p className="mb-4 text-2xl font-semibold text-clay-600">{t('pricing.servicesSubtitle')}</p>
                        <div className="grid gap-5 md:grid-cols-2">
                            {services.map((service, index) => (
                                <article key={index} className="rounded-[1.5rem] border border-sand-200 bg-white p-6 shadow-soft">
                                    <h3 className="mb-3 text-xl font-semibold text-ink">{service.title}</h3>
                                    <div className="space-y-3 text-ink/75 leading-relaxed text-sm">
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

                <div className="grid gap-5 sm:grid-cols-2">
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


                <div className="mt-8 flex flex-col items-center gap-3">
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
                        <button
                            type="button"
                            className="sm:hidden block rounded-full bg-clay-500 px-9 py-4 text-lg font-semibold text-white shadow-soft transition-colors hover:bg-clay-600"
                            onClick={() => {
                                if (isMobile) {
                                    setIsModalOpen(true)
                                } else {
                                    setIsExpanded((prev) => !prev)
                                }
                            }}
                            aria-expanded={isExpanded}
                            aria-controls="booking-details"
                        >
                            {t('pricing.myAppointments')}
                        </button>
                        <button
                            type="button"
                            className="rounded-full border-2 border-clay-500 px-9 py-4 text-lg font-semibold text-clay-600 bg-white shadow-soft transition-colors hover:bg-clay-50"
                            onClick={() => setShowEligibility((prev) => !prev)}
                            aria-expanded={showEligibility}
                            aria-controls="massage-eligibility-info"
                        >
                            {t('pricing.eligibilityButton')}
                        </button>
                    </div>
                    {showEligibility && (
                        <div id="massage-eligibility-info" className="mt-4 w-full max-w-xl rounded-xl border border-sand-200 bg-white p-6 text-ink/80 text-base shadow-soft">
                            {t('pricing.eligibilityInfo')}
                        </div>
                    )}
                </div>


            </div>
            {/* Inline iframe for large screens only */}
            {!isMobile && (
                <div className="mx-auto mt-4 max-w-screen-xl px-6 lg:px-12 h-[88vh]">
                    <iframe
                        src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2JNtcZkXOdcRq_3KKjzjCvf1wgs3uAJ8WPi2wdzpMhiozy4AsSIsQk7pZPf1AMWF4MhnFaDPGZ?gv=true"
                        width="100%"
                        title={t('booking.title')}
                        className="w-full h-full rounded-[1.25rem] border border-sand-200 bg-white"
                    />
                </div>
            )}

            {/* Modal for mobile only */}
            {isMobile && isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <div className="relative w-full h-full max-w-3xl max-h-[90vh] rounded-[1.25rem] border border-sand-200 bg-white shadow-2xl flex items-start">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 z-10 rounded-full bg-white/90 hover:bg-white text-clay-600 p-3 shadow-lg focus:outline-none"
                                aria-label={t('booking.close')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <iframe
                                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2JNtcZkXOdcRq_3KKjzjCvf1wgs3uAJ8WPi2wdzpMhiozy4AsSIsQk7pZPf1AMWF4MhnFaDPGZ?gv=true"
                                title={t('booking.title')}
                                width="100%"
                                height="100%"
                                className="w-full h-full rounded-[1.25rem]"
                            />
                        </div>
                    </div>
                </div>
            )}

        </section>
    )
}

export default Pricing
